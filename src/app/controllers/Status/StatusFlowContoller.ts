import { Request, Response } from "express";
import { EntityType } from "../../enum/EntityType";
import { FieldTypes } from "../../enum/FieldTypes";
import { TypeormOptions } from "../../interface/TypeormOptions";
import { Status } from "../../models/entities/Statuses/Status";
import { IStatus } from "../../models/Status";
import { StatusFlowService } from "../../services/Status/StatusFlowService";
import { StatusService } from "../../services/Status/StatusService";
import { BaseController } from "../BaseController";
import { StatusFlow } from "../../models/entities/Statuses/StatusFlow";
import { IStatusFlow } from "../../models/StatusFlow";
import { QueryOperator } from "../../enum/WhereOperations";
import Template from "../../global/response";
import APIError from "../../global/response/apierror";
const service =  new StatusFlowService(StatusFlow);
class StatusFlowController extends BaseController<StatusFlow,IStatusFlow,StatusFlowService>{
    option: TypeormOptions = {
        relations: {
        },
        join: {
          alias: 'statusFlow',
          innerJoinAndSelect: {
            createdBy:'statusFlow.createdBy',
            modifiedBy:'statusFlow.modifiedBy',
            deletedBy:'statusFlow.deletedBy',
            refStatus:'statusFlow.refStatus',
            position:'statusFlow.position',
            service:'statusFlow.service',
            nextStatuses:'statusFlow.nextStatuses'
          },
        },
      };
      entity: EntityType = EntityType.STAUTSFLOW;
      constructor() {
        super(service,
          [
            {
              name: 'service.id',
              type: FieldTypes.NUMBER
            },
            {
              name: 'position.id',
              type: FieldTypes.NUMBER
            },
            {
              name: 'refStatus.id',
              type: FieldTypes.NUMBER
            },
          ],
        );
      }

      public getNextStatusesByStatusId = (req: Request, res: Response, next: any) => {
        this.createGridOptions(req);
        const statusId = req.params.statusId;
        this.reqElm.search?.push({
          name:"refStatus.id",
          operation : QueryOperator.EQUAL,
          type:FieldTypes.NUMBER,
          value:Number(statusId)
        })
        this.service.getAll(this.reqElm).then(({result})=>{
          if(result){
        // const rulesRes = {currentPage:result.currentPage,data:result.data[0]. ,pageSize:result.pageSize,total:result.total } as ResponseElement<Rule> 
            this.serializeFields(result.data);
            this.searchFields = this.getDefaultSearchableFields();
            res.json(Template.success(result, ""));
          }
        })
        .catch((err) => {
          console.log(err);
          if (err.ErrorID == 2110) {
            next(new APIError(err.message, err.ErrorID));
          }
          next(new APIError(err.message, err.ErrorID));
        });
      }
    }
    
    export default StatusFlowController;
