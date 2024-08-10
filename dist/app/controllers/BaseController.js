"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
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
        //getSelectOption
        this.getSelectOption = (req, res, next) => {
            this.service.getSelectOption().then((result) => {
                if (result) {
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
        this.getScheme = (req, res, next) => {
            res.json(response_1.default.success(this.getDefaultSearchableFields(), ""));
        };
        this.getAll = (req, res, next) => {
            this.createGridOptions(req);
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
        console.log(this.searchFields);
        this.searchFields = this.getDefaultSearchableFields();
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
                // Check if the operation exists in the request query
                if (req.query[operationName] !== undefined) {
                    field.operation = (0, WhereOperations_1.getQueryOperatorFromString)(req.query[operationName]);
                }
                if (field.value && field.type === FieldTypes_1.FieldTypes.DATE && field.operation === WhereOperations_1.QueryOperator.EQUAL) {
                    field.operation = WhereOperations_1.QueryOperator.BETWEEN;
                    field.value = this.updateFieldValue(field.value);
                }
            }
        });
        // Remove fields that don't have a value
        this.searchFields = this.searchFields.filter((field) => field.value !== undefined || field.value !== "undefined,Invalid Date");
        console.log(this.searchFields);
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
        const defaultFields = [
            {
                name: "id",
                type: FieldTypes_1.FieldTypes.NUMBER,
            },
            {
                name: "uuid",
                type: FieldTypes_1.FieldTypes.TEXT,
            },
            {
                name: "createdAt",
                type: FieldTypes_1.FieldTypes.DATE,
            },
            {
                name: "updatedAt",
                type: FieldTypes_1.FieldTypes.DATE,
            },
            {
                name: "deletedAt",
                type: FieldTypes_1.FieldTypes.DATE,
            },
            {
                name: "arabicLabel",
                type: FieldTypes_1.FieldTypes.TEXT,
            },
            {
                name: "type",
                type: FieldTypes_1.FieldTypes.TEXT,
            },
            {
                name: "isActive",
                type: FieldTypes_1.FieldTypes.TEXT,
            },
            {
                name: "createdBy.id",
                type: FieldTypes_1.FieldTypes.NUMBER,
            },
            {
                name: "modifiedBy.id",
                type: FieldTypes_1.FieldTypes.NUMBER,
            },
            {
                name: "deletedBy.id",
                type: FieldTypes_1.FieldTypes.NUMBER,
            },
        ];
        const filteredChildSearchableFields = Array.isArray(this.childSearchableFields) ? this.childSearchableFields.map((_a) => {
            var { value, operation } = _a, rest = __rest(_a, ["value", "operation"]);
            return rest;
        }) : [];
        return defaultFields.concat(filteredChildSearchableFields);
    }
    createGridOptions(req) {
        this.reqElm.page = Number(req.query.page);
        this.reqElm.pageSize = Number(req.query.pageSize);
        this.reqElm.orderBy = req.query.orderBy ? String(req.query.orderBy) : "createdAt";
        this.reqElm.order = req.query.order ? (0, OrderByOperation_1.validateOrderOperation)(String(req.query.order)) : "DESC";
        this.reqElm.relations = this.option.relations;
        this.fillSearchableFieldFromRequest(req);
        this.reqElm.search = this.searchFields;
        this.reqElm.join = this.option.join;
    }
    updateFieldValue(value) {
        // Split the field.value by the comma
        // Convert the startDay string to a Date object
        const startDate = new Date(value);
        startDate.setHours(0, 0, 0, 0);
        // Set the start time to 00:00:00
        // Set the end time to 23:59:59
        const endDate = new Date(startDate.getTime() + 86399999);
        endDate.setHours(23, 59, 59, 0);
        // Format the startDate and endDate in the desired format
        const startDateTime = startDate.toISOString().replace('T', ' ').slice(0, 24);
        const endDateTime = endDate.toISOString().replace('T', ' ').slice(0, 24);
        console.log("startDateTime", startDateTime);
        console.log("endDateTime", endDateTime);
        // Return the new value in the desired format
        return `${startDateTime},${endDateTime}`;
    }
    removeField(data, fieldName) {
        data.forEach((item, index) => {
            const itemWithIndex = item;
            const _a = itemWithIndex, _b = fieldName, _ = _a[_b], rest = __rest(_a, [typeof _b === "symbol" ? _b : _b + ""]);
            data[index] = rest;
        });
    }
}
exports.BaseController = BaseController;
//# sourceMappingURL=BaseController.js.map