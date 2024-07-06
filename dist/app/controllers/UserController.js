"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserService_1 = require("../services/UserService");
const response_1 = __importDefault(require("../global/response"));
const custom_errors_1 = require("../../lib/custom-errors");
const apierror_1 = __importDefault(require("../global/response/apierror"));
const service = new UserService_1.UserService();
class UserController {
}
UserController.create = (req, res, next) => {
    service.checkUserExists(req.body).then((bol) => {
        if (bol === true) {
            res.json(response_1.default.userAlreadyExist());
        }
        service.add(req.body).then(user => {
            console.log(req.body);
            if (user) {
                console.log(user);
                res.json(response_1.default.success(user, 'Users saved succesfully'));
            }
        }).catch(err => {
            console.log(err);
            if (err.ErrorID == 2110) {
                next(new apierror_1.default(err.message, err.ErrorID));
            }
            next(new custom_errors_1.ServerException('error occured'));
        });
    });
};
UserController.login = (req, res, next) => {
    service.login(req.body).then(user => {
        if (user) {
            res.json(response_1.default.success(user, 'OTP Sent please check your email'));
        }
    }).catch(err => {
        console.log(err);
        if (err.ErrorID == 2110) {
            next(new apierror_1.default(err.message, err.ErrorID));
        }
        next(new custom_errors_1.ServerException('error occured'));
    });
};
UserController.loginByOTP = (req, res, next) => {
    service.login(req.body).then(JWT => {
        if (JWT) {
            res.json(response_1.default.success(JWT, 'login success'));
        }
    }).catch(err => {
        console.log(err);
        if (err.ErrorID == 2110) {
            next(new apierror_1.default(err.message, err.ErrorID));
        }
        next(new custom_errors_1.ServerException('error occured'));
    });
};
exports.default = UserController;
//# sourceMappingURL=UserController.js.map