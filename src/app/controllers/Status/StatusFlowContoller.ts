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
import Err from "../../global/response/errorcode";
import { CustomeRequest } from "../../interface/CustomeRequest";
import { UserService } from "../../services/UserService";
import { User } from "../../models/entities/User";
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
            res.json(Template.success(result.data, ""));
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
      public getFlowByOperationAndSelectedUser =(req: CustomeRequest, res: Response, next: any)=>{

       if(req.selectedUser){
        const position = req.selectedUser.position
        const currentStatusId = req.params.currentStatus;
        const serviceId = req.params.serviceId;
        this.createGridOptions(req);
        this.reqElm.search?.push(
          {
          name:"refStatus.id",
          operation : QueryOperator.EQUAL,
          type:FieldTypes.NUMBER,
          value:Number(currentStatusId)
        },
        {
          name:"position.id",
          operation : QueryOperator.EQUAL,
          type:FieldTypes.NUMBER,
          value:Number(position.id)
        },
        {
          name:"service.id",
          operation : QueryOperator.EQUAL,
          type:FieldTypes.NUMBER,
          value:Number(serviceId)
        },)
        this.service.getAll(this.reqElm).then(({result})=>{
          res.json(Template.success(result.data, ""));
        })
        .catch((err) => {
          console.log(err);
          if (err.ErrorID == 2110) {
            next(new APIError(err.message, err.ErrorID));
          }
          next(new APIError(err.message, err.ErrorID));
        });

       }


       
        // if(!statusId||!serviceId||!positionId){
      }
    }
    
    export default StatusFlowController;
