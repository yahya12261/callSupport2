"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const EntityType_1 = require("../../enum/EntityType");
const FieldTypes_1 = require("../../enum/FieldTypes");
const StatusFlowService_1 = require("../../services/Status/StatusFlowService");
const BaseController_1 = require("../BaseController");
const StatusFlow_1 = require("../../models/entities/Statuses/StatusFlow");
const WhereOperations_1 = require("../../enum/WhereOperations");
const response_1 = __importDefault(require("../../global/response"));
const apierror_1 = __importDefault(require("../../global/response/apierror"));
const service = new StatusFlowService_1.StatusFlowService(StatusFlow_1.StatusFlow);
class StatusFlowController extends BaseController_1.BaseController {
    constructor() {
        super(service, [
            {
                name: 'service.id',
                type: FieldTypes_1.FieldTypes.NUMBER
            },
            {
                name: 'position.id',
                type: FieldTypes_1.FieldTypes.NUMBER
            },
            {
                name: 'refStatus.id',
                type: FieldTypes_1.FieldTypes.NUMBER
            },
        ]);
        this.option = {
            relations: {},
            join: {
                alias: 'statusFlow',
                innerJoinAndSelect: {
                    createdBy: 'statusFlow.createdBy',
                    modifiedBy: 'statusFlow.modifiedBy',
                    deletedBy: 'statusFlow.deletedBy',
                    refStatus: 'statusFlow.refStatus',
                    position: 'statusFlow.position',
                    service: 'statusFlow.service',
                    nextStatuses: 'statusFlow.nextStatuses'
                },
            },
        };
        this.entity = EntityType_1.EntityType.STAUTSFLOW;
        this.getNextStatusesByStatusId = (req, res, next) => {
            var _a;
            this.createGridOptions(req);
            const statusId = req.params.statusId;
            (_a = this.reqElm.search) === null || _a === void 0 ? void 0 : _a.push({
                name: "refStatus.id",
                operation: WhereOperations_1.QueryOperator.EQUAL,
                type: FieldTypes_1.FieldTypes.NUMBER,
                value: Number(statusId)
            });
            this.service.getAll(this.reqElm).then(({ result }) => {
                if (result) {
                    // const rulesRes = {currentPage:result.currentPage,data:result.data[0]. ,pageSize:result.pageSize,total:result.total } as ResponseElement<Rule> 
                    this.serializeFields(result.data);
                    this.searchFields = this.getDefaultSearchableFields();
                    res.json(response_1.default.success(result.data, ""));
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
        //   async getFlowByStatusAndServiceAndPosition(statusId:number,serviceId:number,positionId:number):Promise<StatusFlow|null|undefined>{
        //  if(!statusId||!serviceId||!positionId){
        //   return Promise.reject(new APIError("an error : ", Err.UndefinedCode));
        //  }
        //     this.reqElm.search?.push(
        //       {
        //       name:"refStatus.id",
        //       operation : QueryOperator.EQUAL,
        //       type:FieldTypes.NUMBER,
        //       value:Number(statusId)
        //     },
        //     {
        //       name:"service.id",
        //       operation : QueryOperator.EQUAL,
        //       type:FieldTypes.NUMBER,
        //       value:Number(serviceId)
        //     },
        //     {
        //       name:"position.id",
        //       operation : QueryOperator.EQUAL,
        //       type:FieldTypes.NUMBER,
        //       value:Number(positionId)
        //     }
        //   )
        //   this.service.getAll(this.reqElm).then(({result})=>{
        //     if(result){
        //       return result.data;
        //       }else{
        //         return null;
        //       }
        //   })
        //   .catch((err) => {
        //     return Promise.reject(new APIError("an error : " + err, Err.UndefinedCode));
        //   })
        //   }
        this.getFlowByOperationAndSelectedUser = (req, res, next) => {
            var _a;
            if (req.selectedUser) {
                const position = req.selectedUser.position;
                const currentStatusId = req.params.currentStatus;
                const serviceId = req.params.serviceId;
                this.createGridOptions(req);
                (_a = this.reqElm.search) === null || _a === void 0 ? void 0 : _a.push({
                    name: "refStatus.id",
                    operation: WhereOperations_1.QueryOperator.EQUAL,
                    type: FieldTypes_1.FieldTypes.NUMBER,
                    value: Number(currentStatusId)
                }, {
                    name: "position.id",
                    operation: WhereOperations_1.QueryOperator.EQUAL,
                    type: FieldTypes_1.FieldTypes.NUMBER,
                    value: Number(position.id)
                }, {
                    name: "service.id",
                    operation: WhereOperations_1.QueryOperator.EQUAL,
                    type: FieldTypes_1.FieldTypes.NUMBER,
                    value: Number(serviceId)
                });
                this.service.getAll(this.reqElm).then(({ result }) => {
                    res.json(response_1.default.success(result.data, ""));
                })
                    .catch((err) => {
                    console.log(err);
                    if (err.ErrorID == 2110) {
                        next(new apierror_1.default(err.message, err.ErrorID));
                    }
                    next(new apierror_1.default(err.message, err.ErrorID));
                });
            }
            // if(!statusId||!serviceId||!positionId){
        };
    }
}
exports.default = StatusFlowController;
//# sourceMappingURL=StatusFlowContoller.js.map