"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseController = void 0;
const response_1 = __importDefault(require("../global/response"));
const apierror_1 = __importDefault(require("../global/response/apierror"));
const custom_errors_1 = require("../../lib/custom-errors");
const User_1 = require("../models/entities/User");
const EndPointsActionsEnum_1 = require("../models/type/EndPointsActionsEnum");
class UserSerializer {
    serialize(user) {
        return {
            id: user.id,
            name: user.first,
            email: user.email,
            createdAt: user.createdAt.toISOString(),
            updatedAt: user.updatedAt.toISOString(),
            position: user.position,
        };
    }
}
class BaseController {
    constructor(service) {
        this.add = (req, res, next) => {
            if (Object.is(req.Action, EndPointsActionsEnum_1.EndPointsActionsEnum.ADD))
                req.body.createdBy = User_1.User.getUserJson(req.createdUser);
            else if (Object.is(req.Action, EndPointsActionsEnum_1.EndPointsActionsEnum.UPDATE))
                req.body.createdBy = User_1.User.getUserJson(req.updatedUser);
            else if (Object.is(req.Action, EndPointsActionsEnum_1.EndPointsActionsEnum.DELETE))
                req.body.createdBy = User_1.User.getUserJson(req.deletedUser);
            this.service
                .add(req.body)
                .then((object) => {
                if (object) {
                    res.json(response_1.default.success(object, this.entity + " saved succesfully"));
                }
            })
                .catch((err) => {
                console.log(err);
                if (err.ErrorID == 2110) {
                    next(new apierror_1.default(err.message, err.ErrorID));
                }
                next(new custom_errors_1.ServerException("error occurred"));
            });
        };
        this.getAll = (req, res, next) => {
            this.service.getAll(this.option.relations).then((data) => {
                if (data) {
                    this.serializeFields(data);
                    res.json(response_1.default.success(data, ""));
                }
            })
                .catch((err) => {
                console.log(err);
                if (err.ErrorID == 2110) {
                    next(new apierror_1.default(err.message, err.ErrorID));
                }
                next(new custom_errors_1.ServerException("error occurred"));
            });
        };
        this.service = service;
        this.userSerializer = new UserSerializer();
    }
    serializeFields(data) {
        for (const item of data) {
            this.serializeField(item, 'createdBy');
            this.serializeField(item, 'modifiedBy');
            this.serializeField(item, 'deletedBy');
        }
    }
    serializeField(item, fieldName) {
        if (item[fieldName]) {
            item[fieldName] = this.userSerializer.serialize(item[fieldName]);
        }
    }
}
exports.BaseController = BaseController;
//# sourceMappingURL=BaseController.js.map