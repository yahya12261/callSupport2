"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const EntityType_1 = require("../enum/EntityType");
const FieldTypes_1 = require("../enum/FieldTypes");
const baseEntity_1 = require("../models/baseEntity");
const personOperation_1 = require("../models/entities/personOperation");
const personOperationService_1 = require("../services/personOperationService");
const BaseController_1 = require("./BaseController");
const response_1 = __importDefault(require("../global/response"));
const apierror_1 = __importDefault(require("../global/response/apierror"));
const custom_errors_1 = require("../../lib/custom-errors");
const User_1 = require("../models/entities/User");
const WhereOperations_1 = require("../enum/WhereOperations");
const service = new personOperationService_1.PersonOperationService(personOperation_1.PersonOperation);
class PersonOperationController extends BaseController_1.BaseController {
    constructor() {
        const IPersonOperationKeys = (0, baseEntity_1.createKeys)();
        const IPersonKeys = (0, baseEntity_1.createKeys)();
        super(service, [
            {
                name: "service.id",
                type: FieldTypes_1.FieldTypes.NUMBER,
            },
            {
                name: "person.firstAr",
                type: FieldTypes_1.FieldTypes.TEXT,
            },
            {
                name: "person.middleAr",
                type: FieldTypes_1.FieldTypes.TEXT,
            },
            {
                name: "person.lastAr",
                type: FieldTypes_1.FieldTypes.TEXT,
            },
            {
                name: "person.dob",
                type: FieldTypes_1.FieldTypes.DATE,
            },
            {
                name: "status.id",
                type: FieldTypes_1.FieldTypes.NUMBER,
            },
            {
                name: "person.id",
                type: FieldTypes_1.FieldTypes.NUMBER,
            },
            {
                name: "person.phoneNumber",
                type: FieldTypes_1.FieldTypes.TEXT,
            },
            {
                name: "assignTo.id",
                type: FieldTypes_1.FieldTypes.NUMBER,
            },
            {
                name: "operationReporter.id",
                type: FieldTypes_1.FieldTypes.NUMBER,
            },
        ]);
        this.option = {
            relations: {},
            join: {
                alias: "personOperation",
                innerJoinAndSelect: {
                    createdBy: "personOperation.createdBy",
                    modifiedBy: "personOperation.modifiedBy",
                    deletedBy: "personOperation.deletedBy",
                    status: "personOperation.status",
                    // next: "status.next",
                    // refStatus: "next.refStatus",
                    // nextStatusesPosition: "next.position",
                    // nextStatusesService: "next.service",
                    // nextStatusesNext: "next.nextStatuses",
                    person: "personOperation.person",
                    government: "person.governmentAddress",
                    caza: "person.cazaAddress",
                    service: "personOperation.service",
                    assignTo: "personOperation.assignTo",
                    operationReporter: "personOperation.reporter",
                    reporter: "service.reporter",
                },
            },
        };
        this.entity = EntityType_1.EntityType.PERSONOPERATION;
        this.getAll = (req, res, next) => {
            this.createGridOptions(req);
            this.service
                .getAll(this.reqElm)
                .then(({ result }) => {
                if (result) {
                    this.serializeFields(result.data);
                    this.serializeFieldsCustom(result.data);
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
        this.changeAssign = (req, res, next) => {
            req.body.modifiedBy = User_1.User.getUserJson(req.updatedUser);
            this.service
                .changeAssign(Number(req.body.operationId), Number(req.body.userId))
                .then(() => {
                res.json(response_1.default.success("", this.entity + " تم التعديل"));
            })
                .catch((err) => {
                console.log(err);
                if (err.ErrorID == 2110) {
                    next(new apierror_1.default(err.message, err.ErrorID));
                }
                next(new custom_errors_1.ServerException("error occurred"));
            });
        };
        this.changeStatus = (req, res, next) => {
            var _a;
            const user = req.updatedUser;
            if (user && user.position) {
                const operationId = req.body.operationId;
                const nextStatusId = req.body.nextStatusId;
                console.log("operationId", operationId);
                console.log("nextStatusId", nextStatusId);
                this.createGridOptions(req);
                (_a = this.reqElm.search) === null || _a === void 0 ? void 0 : _a.push({
                    name: "id",
                    operation: WhereOperations_1.QueryOperator.EQUAL,
                    type: FieldTypes_1.FieldTypes.NUMBER,
                    value: Number(operationId)
                });
                this.service.getAll(this.reqElm).then(({ result }) => {
                    this.service.changeStatus(result.data[0], user.position, nextStatusId).then(() => {
                        res.json(response_1.default.success(result, "تم تغير الحالة بنجاح"));
                    }).catch((err) => {
                        console.log(err);
                        if (err.ErrorID == 2110) {
                            next(new apierror_1.default(err.message, err.ErrorID));
                        }
                        next(new apierror_1.default(err.message, err.ErrorID));
                    });
                })
                    .catch((err) => {
                    console.log(err);
                    if (err.ErrorID == 2110) {
                        next(new apierror_1.default(err.message, err.ErrorID));
                    }
                    next(new apierror_1.default(err.message, err.ErrorID));
                });
            }
        };
    }
    serializeFieldsCustom(data) {
        for (const item of data) {
            this.serializeField(item, "assignTo");
            this.serializeField(item, "reporter");
        }
    }
}
exports.default = PersonOperationController;
//# sourceMappingURL=PersonOperationController.js.map