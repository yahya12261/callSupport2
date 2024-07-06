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
const JWTService_1 = require("./JWTService");
class UserService {
    //  userRepository = getRepository(User);
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
            catch (err) {
                UserService.logger.error("Error checking user existence:", err);
                throw err;
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
            const { first, middle, last, username, password, email, createdBy, Position, dsc, note, phoneNumber } = model;
            const user = new User_1.User();
            user.username = username;
            user.first = first;
            user.password = password;
            user.middle = middle;
            user.last = last;
            user.isAdmin = false;
            user.isActive = true;
            user.position = Position;
            user.email = email;
            user.phoneNumber = phoneNumber;
            user.hashPassword();
            user.makeUsernameAndEmailLowerCase();
            const userRepository = (0, typeorm_1.getRepository)(User_1.User);
            try {
                const savedUser = yield userRepository.save(user);
                return savedUser;
            }
            catch (e) {
                console.log(e);
                return Promise.reject(new apierror_1.default("User Already exists", errorcode_1.default.EmailAlreadyExists));
            }
        });
    }
    login(model) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, password, email } = model;
            const userRepository = (0, typeorm_1.getRepository)(User_1.User);
            try {
                const user = yield userRepository.findOne({
                    where: {
                        Or: [
                            { username: username },
                            { email: username }
                        ]
                    },
                });
                if (user) {
                    if (!user.isActive) {
                        return Promise.reject(new apierror_1.default("Account is locked", errorcode_1.default.InactiveUser));
                    }
                    if (user.checkIfUnencryptedPasswordIsValid(password)) {
                        user.invalidLoginAttempts = 0;
                        user.lastLogin = new Date();
                        yield userRepository.save(user);
                        this.sendOTP(user);
                        return user;
                    }
                    else {
                        user.invalidLoginAttempts++;
                        yield userRepository.save(user);
                        // Check if the user has reached the maximum allowed invalid login attempts
                        if (user.invalidLoginAttempts >= 3) {
                            // Lock the user's account
                            user.isActive = false;
                            yield userRepository.save(user);
                            return Promise.reject(new apierror_1.default("Account is locked", errorcode_1.default.InactiveUser));
                        }
                        else {
                            return Promise.reject(new apierror_1.default("Invalid password", errorcode_1.default.InvalidLoginPassword));
                        }
                    }
                }
                else {
                    return Promise.reject(new apierror_1.default("User not found", errorcode_1.default.UserNotFound));
                }
            }
            catch (err) {
                console.log(err);
                return Promise.reject(new apierror_1.default("An error occurred", errorcode_1.default.DatabaseError));
            }
        });
    }
    loginByOTP(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const { OTP, uuid } = user;
            const userRepository = (0, typeorm_1.getRepository)(User_1.User);
            try {
                if (OTP && uuid) {
                    const user = yield userRepository.findOne({
                        where: [
                            { uuid: uuid },
                            { OTP: OTP }
                        ]
                    });
                    if (user) {
                        //Generate JWE and send it 
                        const token = JWTService_1.JWTService.generateJWT(user.uuid);
                        return token;
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
            // const E_mail = new EmailService();
            // E_mail.sendEmail(user.email,"2nd Factor Auth",`your OTP : ${OTP}`)
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