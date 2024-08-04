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
const OrderByOperation_1 = require("../enum/OrderByOperation");
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
        ]);
        this.option = {
            relations: ["createdBy"],
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
            this.reqElm.page = Number(req.query.page);
            this.reqElm.pageSize = Number(req.query.pageSize);
            this.reqElm.orderBy = req.query.orderBy ? String(req.query.orderBy) : "createdAt";
            this.reqElm.order = req.query.order ? (0, OrderByOperation_1.validateOrderOperation)(String(req.query.order)) : "DESC";
            this.reqElm.relations = this.option.relations;
            const ruleId = req.params.id;
            this.fillSearchableFieldFromRequest(req);
            this.reqElm.search = this.searchFields;
            this.service.getAllRulesByPageId(this.reqElm, Number(ruleId)).then(({ result }) => {
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
                next(new custom_errors_1.ServerException("error occurred"));
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
    }
}
exports.default = RuleController;
//# sourceMappingURL=RuleController.js.map