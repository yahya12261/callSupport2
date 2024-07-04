"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const custom_errors_1 = require("../../lib/custom-errors");
const apierror_1 = __importDefault(require("../global/response/apierror"));
const TestService_1 = require("../services/TestService");
const response_1 = __importDefault(require("../global/response"));
const service = new TestService_1.TestService();
class TestController {
}
TestController.addNew = (req, res, next) => {
    service.add(req.body).then(user => {
        if (user) {
            res.json(response_1.default.success(user, 'Users saved succesfully'));
        }
    }).catch(err => {
        if (err.ErrorID == 2110) {
            next(new apierror_1.default(err.message, err.ErrorID));
        }
        next(new custom_errors_1.ServerException('error occured'));
    });
};
exports.default = TestController;
//# sourceMappingURL=testController.js.map