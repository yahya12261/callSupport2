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
// public static listAll = (req: Request, res: Response, next: any) => {
//   service.get().then(users => {
//     if (users && users.length > 0) {
//       res.json(Template.success(users, 'Users Feated succesfully'));
//     } else {
//       res.json(Template.success(users, 'Users Feated succesfully'));
//     }
//   }).catch(err => {
//     next(new ServerException('error occured'));
//   })
// }
UserController.create = (req, res, next) => {
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
};
exports.default = UserController;
//# sourceMappingURL=UserController.js.map