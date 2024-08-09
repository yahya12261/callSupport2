"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PositionService_1 = require("../services/PositionService");
const BaseController_1 = require("./BaseController");
const Position_1 = require("../models/entities/Position");
const EntityType_1 = require("../enum/EntityType");
const response_1 = __importDefault(require("../global/response"));
const apierror_1 = __importDefault(require("../global/response/apierror"));
const custom_errors_1 = require("../../lib/custom-errors");
const FieldTypes_1 = require("../enum/FieldTypes");
const OrderByOperation_1 = require("../enum/OrderByOperation");
const service = new PositionService_1.PositionService(Position_1.Position);
class PositionController extends BaseController_1.BaseController {
    constructor() {
        super(service, [
            {
                name: 'name',
                type: FieldTypes_1.FieldTypes.TEXT
            },
            {
                name: 'department.id',
                type: FieldTypes_1.FieldTypes.NUMBER
            },
        ]);
        this.option = {
        // relations:[EntityType.DEPARTMENT,"createdBy"]
        };
        this.entity = EntityType_1.EntityType.POSITION;
        this.addPositionRule = (req, res, next) => {
            const positionId = req.body.positionId;
            const ruleId = req.body.ruleId;
            this.service.addPositionRule(Number(positionId), Number(ruleId)).then(() => {
                res.json(response_1.default.success("", this.entity + "  Page added succesfully"));
            })
                .catch((err) => {
                console.log(err);
                if (err.ErrorID == 2110) {
                    next(new apierror_1.default(err.message, err.ErrorID));
                }
                next(new custom_errors_1.ServerException("error occurred"));
            });
        };
        this.getPagesApis = (req, res, next) => {
            this.reqElm.page = Number(req.query.page);
            this.reqElm.pageSize = Number(req.query.pageSize);
            this.reqElm.orderBy = req.query.orderBy ? String(req.query.orderBy) : "createdAt";
            this.reqElm.order = req.query.order ? (0, OrderByOperation_1.validateOrderOperation)(String(req.query.order)) : "DESC";
            this.reqElm.relations = this.option.relations;
            const positionId = req.params.id;
            this.fillSearchableFieldFromRequest(req);
            this.reqElm.search = this.searchFields;
            this.service.getAllPositionRules(this.reqElm, Number(positionId)).then(({ result }) => {
                if (result) {
                    const position = { currentPage: result.currentPage, pageSize: result.pageSize, total: result.total, data: result.data[0].rules };
                    this.serializeFields(result.data);
                    this.searchFields = this.getDefaultSearchableFields();
                    res.json(response_1.default.success(position, ""));
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
        this.deletePositionRule = (req, res, next) => {
            const positionId = req.body.positionId;
            const ruleId = req.body.ruleId;
            this.service.deletePositionRule(Number(positionId), Number(ruleId)).then(() => {
                res.json(response_1.default.success("", this.entity + " rule deleted from position successfully"));
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
exports.default = PositionController;
//# sourceMappingURL=PositionController.js.map