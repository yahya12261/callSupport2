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
const EndPointsActionsEnum_1 = require("../enum/EndPointsActionsEnum");
const OrderByOperation_1 = require("../enum/OrderByOperation");
const FieldTypes_1 = require("../enum/FieldTypes");
const WhereOperations_1 = require("../enum/WhereOperations");
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
    constructor(service, searchFields) {
        this.reqElm = {};
        this.childSearchableFields = {};
        this.searchFields = this.getDefaultSearchableFields();
        this.update = (req, res, next) => {
            req.body.modifiedBy = User_1.User.getUserJson(req.updatedUser);
            this.service
                .update(req.body)
                .then((object) => {
                if (object) {
                    res.json(response_1.default.success(object, this.entity + " تم التعديل"));
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
        this.add = (req, res, next) => {
            console.log(req.body);
            if (Object.is(req.Action, EndPointsActionsEnum_1.EndPointsActionsEnum.ADD))
                req.body.createdBy = User_1.User.getUserJson(req.createdUser);
            else if (Object.is(req.Action, EndPointsActionsEnum_1.EndPointsActionsEnum.UPDATE))
                req.body.modifiedBy = User_1.User.getUserJson(req.updatedUser);
            else if (Object.is(req.Action, EndPointsActionsEnum_1.EndPointsActionsEnum.DELETE))
                req.body.deletedBy = User_1.User.getUserJson(req.deletedUser);
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
        this.getScheme = (req, res, next) => {
            res.json(response_1.default.success(this.getDefaultSearchableFields(), ""));
        };
        this.getAll = (req, res, next) => {
            this.reqElm.page = Number(req.query.page);
            this.reqElm.pageSize = Number(req.query.pageSize);
            this.reqElm.orderBy = req.query.orderBy ? String(req.query.orderBy) : "createdAt";
            this.reqElm.order = req.query.order ? (0, OrderByOperation_1.validateOrderOperation)(String(req.query.order)) : "DESC";
            this.reqElm.relations = this.option.relations;
            this.fillSearchableFieldFromRequest(req);
            this.reqElm.search = this.searchFields;
            this.service.getAll(this.reqElm).then(({ result }) => {
                if (result) {
                    this.serializeFields(result.data);
                    this.searchFields = this.getDefaultSearchableFields();
                    res.json(response_1.default.success(result, ""));
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
        if (searchFields) {
            this.searchFields = this.searchFields.concat(searchFields);
            this.childSearchableFields = searchFields;
        }
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
    fillSearchableFieldFromRequest(req) {
        // console.log(this.searchFields);
        this.searchFields.forEach((field) => {
            const fieldName = field.name;
            const operationName = `${fieldName}OP`;
            // Check if the field exists in the request query
            if (req.query[fieldName] !== undefined) {
                // Ensure the value is a string
                if (Array.isArray(req.query[fieldName])) {
                    field.value = req.query[fieldName][0];
                }
                else {
                    field.value = req.query[fieldName];
                }
                field.value = this.valueToType(field.value, field.type);
            }
            // Check if the operation exists in the request query
            if (req.query[operationName] !== undefined) {
                field.operation = (0, WhereOperations_1.getQueryOperatorFromString)(req.query[operationName]);
            }
        });
        // Remove fields that don't have a value
        this.searchFields = this.searchFields.filter((field) => field.value !== undefined);
        // console.log( this.searchFields)
    }
    valueToType(value, type) {
        if (Object.is(type, FieldTypes_1.FieldTypes.TEXT))
            return value + "";
        else if (Object.is(type, FieldTypes_1.FieldTypes.NUMBER))
            return Number(value);
        else if (Object.is(type, FieldTypes_1.FieldTypes.DATE))
            return value + "";
        else if (Object.is(type, FieldTypes_1.FieldTypes.BOOLEAN))
            return Boolean(value);
    }
    getDefaultSearchableFields() {
        return [
            {
                name: "id",
                type: FieldTypes_1.FieldTypes.NUMBER,
            },
            {
                name: "uuid",
                type: FieldTypes_1.FieldTypes.TEXT
            },
            {
                name: "createdAt",
                type: FieldTypes_1.FieldTypes.DATE
            },
            {
                name: "updatedAt",
                type: FieldTypes_1.FieldTypes.DATE
            },
            {
                name: "deletedAt",
                type: FieldTypes_1.FieldTypes.DATE
            },
            {
                name: "arabicLabel",
                type: FieldTypes_1.FieldTypes.TEXT
            },
            {
                name: "type",
                type: FieldTypes_1.FieldTypes.TEXT
            },
            {
                name: "isActive",
                type: FieldTypes_1.FieldTypes.TEXT
            },
            {
                name: "createdBy.id",
                type: FieldTypes_1.FieldTypes.NUMBER
            },
            {
                name: "modifiedBy.id",
                type: FieldTypes_1.FieldTypes.NUMBER
            },
            {
                name: "deletedBy.id",
                type: FieldTypes_1.FieldTypes.NUMBER
            }
        ].concat(this.childSearchableFields);
    }
}
exports.BaseController = BaseController;
//# sourceMappingURL=BaseController.js.map