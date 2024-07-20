"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const UserService_1 = require("../services/UserService");
const response_1 = __importDefault(require("../global/response"));
const custom_errors_1 = require("../../lib/custom-errors");
const apierror_1 = __importDefault(require("../global/response/apierror"));
const RuleService_1 = require("../services/RuleService");
const RuleController_1 = __importDefault(require("./RuleController"));
const Rule_1 = require("../models/entities/Rule");
const service = new UserService_1.UserService();
const ruleService = new RuleService_1.RuleService(Rule_1.Rule);
const ruleController = new RuleController_1.default(ruleService);
class UserController {
    static getVisibleUserData(user) {
        return {
            uuid: user.uuid
        };
    }
}
_a = UserController;
UserController.create = (req, res, next) => {
    service.checkUserExists(req.body).then((bol) => {
        if (bol === true) {
            res.json(response_1.default.userAlreadyExist());
        }
        service.add(req.body).then(user => {
            // console.log(req.body)
            if (user) {
                // //create rules 
                // ruleController.generateUserRulesByPosition(user.id);
                // console.log(user)
                res.json(response_1.default.success(_a.getVisibleUserData(user), 'Users saved succesfully'));
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
    service.login(req.body, true).then(user => {
        if (user) {
            res.json(response_1.default.success(_a.getVisibleUserData(user), 'OTP Sent please check your email'));
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
    service.loginByOTP(req.body).then(JWT => {
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