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
class UserService {
    checkUserExists(email, username) {
        return __awaiter(this, void 0, void 0, function* () {
            const userRepository = (0, typeorm_1.getRepository)(User_1.User);
            try {
                let exists = false;
                if (email !== undefined) {
                    const count = yield userRepository.count({ email: email + "" });
                    exists = count > 0;
                }
                if (username !== undefined && !exists) {
                    const count = yield userRepository.count({ username: username + "" });
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
    //   async getOneByUserAndPassword
    // async get(): Promise<User[] | null> {
    //     // Get users from database
    //     try {
    //         const userRepository = getRepository(User);
    //         const users = await userRepository.find({});
    //         return users;
    //     }
    //     catch (error) {
    //         return null
    //     }
    // }
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
}
exports.UserService = UserService;
UserService.logger = new logger_1.Logger();
//# sourceMappingURL=UserService.js.map