"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const EntityType_1 = require("../../enum/EntityType");
const FieldTypes_1 = require("../../enum/FieldTypes");
const NextStatusService_1 = require("../../services/Status/NextStatusService");
const BaseController_1 = require("../BaseController");
const NextStatus_1 = require("../../models/entities/Statuses/NextStatus");
const WhereOperations_1 = require("../../enum/WhereOperations");
const response_1 = __importDefault(require("../../global/response"));
const apierror_1 = __importDefault(require("../../global/response/apierror"));
const service = new NextStatusService_1.NextStatusService(NextStatus_1.NextStatus);
class NextStatusController extends BaseController_1.BaseController {
    constructor() {
        super(service, [
            {
                name: 'status.id',
                type: FieldTypes_1.FieldTypes.NUMBER
            },
        ]);
        this.option = {
            relations: {},
            join: {
                alias: 'nextStatus',
                innerJoinAndSelect: {
                    createdBy: 'nextStatus.createdBy',
                    modifiedBy: 'nextStatus.modifiedBy',
                    deletedBy: 'nextStatus.deletedBy',
                    status: 'nextStatus.status',
                    positions: 'nextStatus.positions',
                    refStatus: 'nextStatus.refStatus'
                },
            },
        };
        this.entity = EntityType_1.EntityType.NEXTSTATUS;
        this.getNextStatusesByStatusId = (req, res, next) => {
            var _a;
            this.createGridOptions(req);
            const statusId = req.params.statusId;
            (_a = this.reqElm.search) === null || _a === void 0 ? void 0 : _a.push({
                name: "status.id",
                operation: WhereOperations_1.QueryOperator.EQUAL,
                type: FieldTypes_1.FieldTypes.NUMBER,
                value: Number(statusId)
            });
            this.service.getAll(this.reqElm).then(({ result }) => {
                if (result) {
                    // const rulesRes = {currentPage:result.currentPage,data:result.data[0]. ,pageSize:result.pageSize,total:result.total } as ResponseElement<Rule> 
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
                next(new apierror_1.default(err.message, err.ErrorID));
            });
        };
    }
}
exports.default = NextStatusController;
//# sourceMappingURL=NextStatusContoller.js.map