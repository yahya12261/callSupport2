"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const User_1 = require("../models/entities/User");
const typeorm_1 = require("typeorm");
const apierror_1 = __importDefault(require("../global/response/apierror"));
const errorcode_1 = __importDefault(require("../global/response/errorcode"));
const logger_1 = require("../../lib/logger");
const EmailService_1 = require("./EmailService");
const JWTService_1 = require("./JWTService");
class UserService {
    changePassword(user, newPass) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const existingUser = yield this.login(user, false);
                if (existingUser) {
                    existingUser.password = newPass;
                    existingUser.hashPassword();
                    yield (0, typeorm_1.getRepository)(User_1.User).save(existingUser);
                    return existingUser;
                }
                else {
                    throw new apierror_1.default("User not found", errorcode_1.default.UserNotFound);
                }
            }
            catch (err) {
                throw new apierror_1.default("Error changing password", errorcode_1.default.UserNotFound);
            }
        });
    }
    checkUserExists(model) {
        return __awaiter(this, void 0, void 0, function* () {
            const userRepository = (0, typeorm_1.getRepository)(User_1.User);
            const { email, username } = model;
            try {
                let exists = false;
                let emailLowerCase = email === null || email === void 0 ? void 0 : email.toLocaleLowerCase();
                let userLoweCase = username === null || username === void 0 ? void 0 : username.toLocaleLowerCase();
                if (email !== undefined) {
                    const count = yield userRepository.count({ email: emailLowerCase });
                    exists = count > 0;
                }
                if (username !== undefined && !exists) {
                    const count = yield userRepository.count({ username: userLoweCase });
                    exists = count > 0;
                }
                return exists;
            }
            catch (e) {
                console.log(e);
                return Promise.reject(new apierror_1.default("User Already exists", errorcode_1.default.EmailAlreadyExists));
            }
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const userRepository = (0, typeorm_1.getRepository)(User_1.User);
            try {
                const user = yield userRepository.findOneOrFail(id);
                return user;
            }
            catch (error) {
                return null;
            }
        });
    }
    add(model) {
        return __awaiter(this, void 0, void 0, function* () {
            const { first, middle, last, username, password, email, createdBy, position, dsc, note, phoneNumber, } = model;
            const user = new User_1.User();
            user.username = username;
            user.first = first;
            user.password = password;
            user.middle = middle;
            user.last = last;
            user.isAdmin = false;
            user.isActive = true;
            console.log(position);
            user.position = position;
            user.email = email;
            user.phoneNumber = phoneNumber;
            user.hashPassword();
            user.makeUsernameAndEmailLowerCase();
            const userRepository = (0, typeorm_1.getRepository)(User_1.User);
            try {
                const savedUser = yield userRepository.save(user);
                // generate rules
                return savedUser;
            }
            catch (e) {
                console.log(e);
                return Promise.reject(new apierror_1.default("User Already exists", errorcode_1.default.EmailAlreadyExists));
            }
        });
    }
    login(model, otp) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, password } = model;
            const user = yield this.findUser(username);
            if (!user) {
                return Promise.reject(new apierror_1.default("user not found", errorcode_1.default.UserNotFound));
            }
            yield this.validateUser(user, password);
            yield this.updateUserLastLogin(user);
            if (otp) {
                yield this.sendOTP(user);
            }
            return user;
        });
    }
    findUser(username) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userRepository = (0, typeorm_1.getRepository)(User_1.User);
                const user = yield userRepository.findOne({
                    where: {
                        username,
                    },
                });
                if (user) {
                    return user;
                }
                else {
                    throw new apierror_1.default("user not found", errorcode_1.default.UserNotFound);
                }
            }
            catch (err) {
                console.log(err);
                throw new apierror_1.default("An error occurred", errorcode_1.default.DatabaseError);
            }
        });
    }
    validateUser(user, password) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!user.isActive) {
                throw new apierror_1.default("Account is locked", errorcode_1.default.InactiveUser);
            }
            if (user.checkIfUnencryptedPasswordIsValid(password)) {
                user.invalidLoginAttempts = 0;
            }
            else {
                user.invalidLoginAttempts++;
                if (user.invalidLoginAttempts >= 3) {
                    user.isActive = false;
                    yield (0, typeorm_1.getRepository)(User_1.User).save(user);
                    throw new apierror_1.default("Account is locked", errorcode_1.default.InactiveUser);
                }
                else {
                    throw new apierror_1.default("Invalid password", errorcode_1.default.InvalidLoginPassword);
                }
            }
        });
    }
    updateUserLastLogin(user) {
        return __awaiter(this, void 0, void 0, function* () {
            user.lastLogin = new Date();
            yield (0, typeorm_1.getRepository)(User_1.User).save(user);
        });
    }
    loginByOTP(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const { OTP, uuid } = user;
            const userRepository = (0, typeorm_1.getRepository)(User_1.User);
            try {
                if (OTP && uuid) {
                    const user = yield userRepository.findOne({
                        where: { uuid: uuid },
                        // { OTP:OTP }
                    });
                    if (user) {
                        if (OTP == user.OTP) {
                            //Generate JWE and send it
                            const token = JWTService_1.JWTService.generateJWT(user.uuid);
                            return token;
                        }
                        else {
                            this.sendOTP(user);
                            return Promise.reject(new apierror_1.default("check your email with new OTP", errorcode_1.default.IncorrectCurrPassword));
                        }
                    }
                    else {
                        return Promise.reject(new apierror_1.default("User not found", errorcode_1.default.UserNotFound));
                    }
                }
                else {
                    return Promise.reject(new apierror_1.default("An error occurred", errorcode_1.default.EmptyRequestBody));
                }
            }
            catch (err) {
                console.log(err);
                return Promise.reject(new apierror_1.default("An error occurred", errorcode_1.default.DatabaseError));
            }
        });
    }
    sendOTP(user) {
        const userRepository = (0, typeorm_1.getRepository)(User_1.User);
        try {
            let OTP = this.generateOTP();
            user.OTP = Number(OTP);
            userRepository.save(user);
            const E_mail = new EmailService_1.EmailService();
            E_mail.sendEmail(user.email, "2nd Factor Auth", `your OTP : ${OTP}`);
        }
        catch (err) {
            console.log(err);
            return Promise.reject(new apierror_1.default("An error occurred", errorcode_1.default.DatabaseError));
        }
    }
    generateOTP() {
        // Generate a random 4-digit number
        const otp = Math.floor(1000 + Math.random() * 9000).toString();
        return otp;
    }
}
exports.UserService = UserService;
UserService.logger = new logger_1.Logger();
//# sourceMappingURL=UserService.js.map