"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Rule_1 = require("../models/entities/Rule");
const RuleService_1 = require("../services/RuleService");
const response_1 = __importDefault(require("../global/response"));
const apierror_1 = __importDefault(require("../global/response/apierror"));
const custom_errors_1 = require("../../lib/custom-errors");
const BaseController_1 = require("./BaseController");
const EntityType_1 = require("../enum/EntityType");
const FieldTypes_1 = require("../enum/FieldTypes");
const WhereOperations_1 = require("../enum/WhereOperations");
const errorcode_1 = __importDefault(require("../global/response/errorcode"));
const service = new RuleService_1.RuleService(Rule_1.Rule);
// const ruleService = new RuleService(Rule);
class RuleController extends BaseController_1.BaseController {
    constructor() {
        super(service, [
            {
                name: 'name',
                type: FieldTypes_1.FieldTypes.TEXT
            },
            {
                name: 'route',
                type: FieldTypes_1.FieldTypes.TEXT
            },
            {
                name: 'code',
                type: FieldTypes_1.FieldTypes.TEXT
            },
            {
                name: 'methodType',
                type: FieldTypes_1.FieldTypes.TEXT
            },
            {
                name: 'methodName',
                type: FieldTypes_1.FieldTypes.TEXT
            },
            {
                name: 'isDefault',
                type: FieldTypes_1.FieldTypes.NUMBER
            },
        ]);
        this.option = {
            relations: {
            // "rule_rules":true
            // "position.department":true
            },
            join: {
                alias: 'rule',
                innerJoinAndSelect: {
                    // rules:"rule.rules",
                    // apis:"rules.apiId",
                    createdBy: 'rule.createdBy',
                    modifiedBy: 'rule.modifiedBy',
                    deletedBy: 'rule.deletedBy',
                },
            },
        };
        this.entity = EntityType_1.EntityType.PAGE;
        this.addEndPointsRule = (endPoint) => {
            this.entity = EntityType_1.EntityType.API;
            this.service.addRule(endPoint).then(() => {
            }).catch(err => {
                console.log(err);
            });
        };
        this.getPagesApis = (req, res, next) => {
            var _a;
            this.createGridOptions(req);
            const ruleId = req.params.id;
            (_a = this.reqElm.search) === null || _a === void 0 ? void 0 : _a.push({
                name: "id",
                operation: WhereOperations_1.QueryOperator.EQUAL,
                type: FieldTypes_1.FieldTypes.NUMBER,
                value: Number(ruleId)
            });
            if (this.reqElm.join) {
                this.reqElm.join.innerJoinAndSelect = Object.assign(Object.assign({}, this.reqElm.join.innerJoinAndSelect), { rules: "rule.rules" });
            }
            this.service.getAll(this.reqElm).then(({ result }) => {
                if (result) {
                    const rulesRes = { currentPage: result.currentPage, data: result.data[0].rules, pageSize: result.pageSize, total: result.total };
                    this.serializeFields(result.data);
                    this.searchFields = this.getDefaultSearchableFields();
                    res.json(response_1.default.success(rulesRes, ""));
                }
            })
                .catch((err) => {
                console.log(err);
                if (err.ErrorID == 2110) {
                    next(new apierror_1.default(err.message, err.ErrorID));
                }
                next(new apierror_1.default(err.message, err.ErrorID));
            });
        };
        this.addPageApi = (req, res, next) => {
            const pageId = req.body.pageId;
            const apiId = req.body.apiId;
            this.service.addPageApiRule(Number(pageId), Number(apiId)).then(() => {
                res.json(response_1.default.success("", this.entity + " api added to Page succesfully"));
            })
                .catch((err) => {
                console.log(err);
                if (err.ErrorID == 2110) {
                    next(new apierror_1.default(err.message, err.ErrorID));
                }
                next(new apierror_1.default(err.message, err.ErrorID));
            });
        };
        this.deletePageApi = (req, res, next) => {
            const pageId = req.body.pageId;
            const apiId = req.body.apiId;
            this.service.deleteApiFromPage(Number(pageId), Number(apiId)).then(() => {
                res.json(response_1.default.success("", this.entity + " api deleted from Page successfully"));
            })
                .catch((err) => {
                console.log(err);
                if (err.ErrorID == 2110) {
                    next(new apierror_1.default(err.message, err.ErrorID));
                }
                next(new custom_errors_1.ServerException("error occurred"));
            });
        };
        this.makeUnmakeDefault = (req, res, next) => {
            const rule = req.body;
            if (!rule || !rule.uuid) {
                next(new apierror_1.default("خطأ في الطلب", 0));
            }
            service.makeUnMakeDefaultRule(rule.uuid).then(() => {
                res.json(response_1.default.success("تمت العملية بنجاح", ''));
            }, error => {
                next(new apierror_1.default(error.message, 0));
            });
        };
    }
    addNewProperty() {
    }
    getRulesByType(type) {
        if (!type) {
            return Promise.reject(new apierror_1.default("خطأ في الطلب", errorcode_1.default.UndefinedCode));
        }
        console.log("rule cntrl", type);
        service.getRuleByType(type).then((rules) => {
            return rules;
        }).catch((err) => {
            return Promise.reject(new apierror_1.default(err.message, errorcode_1.default.UndefinedCode));
        });
        return Promise.resolve([]);
    }
}
exports.default = RuleController;
//# sourceMappingURL=RuleController.js.map