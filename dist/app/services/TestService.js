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
exports.TestService = void 0;
const typeorm_1 = require("typeorm");
const test_1 = require("../models/entities/test");
const apierror_1 = __importDefault(require("../global/response/apierror"));
const errorcode_1 = __importDefault(require("../global/response/errorcode"));
class TestService {
    add(model) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name } = model;
            const user = new test_1.Test();
            user.name = name;
            const userRepository = (0, typeorm_1.getRepository)(test_1.Test);
            try {
                const savedUser = yield userRepository.save(user);
                return savedUser;
            }
            catch (e) {
                console.log(e);
                return Promise.reject(new apierror_1.default('User Already exists', errorcode_1.default.EmailAlreadyExists));
            }
        });
    }
}
exports.TestService = TestService;
//# sourceMappingURL=TestService.js.map