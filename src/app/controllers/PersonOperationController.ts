import { Request, Response } from "express";
import { EntityType } from "../enum/EntityType";
import { FieldTypes } from "../enum/FieldTypes";
import { TypeormOptions } from "../interface/TypeormOptions";
import { createKeys } from "../models/baseEntity";
import { PersonOperation } from "../models/entities/personOperation";
import { IPerson } from "../models/Person";
import { IPersonOperation } from "../models/PersonOperation";
import { PersonOperationService } from "../services/personOperationService";
import { BaseController } from "./BaseController";
import { validateOrderOperation } from "../enum/OrderByOperation";
import Template from "../global/response";
import APIError from "../global/response/apierror";
import { ServerException } from "../../lib/custom-errors";
import { CustomeRequest } from "../interface/CustomeRequest";
import { User } from "../models/entities/User";
import { QueryOperator } from "../enum/WhereOperations";


const service =  new PersonOperationService(PersonOperation);
class PersonOperationController extends BaseController<
  PersonOperation,
  IPersonOperation,
  PersonOperationService
> {
  option: TypeormOptions = {
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
  entity: EntityType = EntityType.PERSONOPERATION;
  constructor() {
    const IPersonOperationKeys = createKeys<IPersonOperation>();
    const IPersonKeys = createKeys<IPerson>();
    super(service, [
      {
        name: "service.id",
        type: FieldTypes.NUMBER,
      },
      {
        name: "person.firstAr",
        type: FieldTypes.TEXT,
      },
      {
        name: "person.middleAr",
        type: FieldTypes.TEXT,
      },
      {
        name: "person.lastAr",
        type: FieldTypes.TEXT,
      },
      {
        name: "person.dob",
        type: FieldTypes.DATE,
      },
      {
        name: "status.id",
        type: FieldTypes.NUMBER,
      },
      {
        name: "person.id",
        type: FieldTypes.NUMBER,
      },
      {
        name: "person.phoneNumber",
        type: FieldTypes.TEXT,
      },
      {
        name: "assignTo.id",
        type: FieldTypes.NUMBER,
      },
      {
        name: "operationReporter.id",
        type: FieldTypes.NUMBER,
      },
    ]);
  }
  public getAll = (req: Request, res: Response, next: any) => {
    this.createGridOptions(req);
    this.service
      .getAll(this.reqElm)
      .then(({ result }) => {
        if (result) {
          this.serializeFields(result.data);
          this.serializeFieldsCustom(result.data);
          this.searchFields = this.getDefaultSearchableFields();
          res.json(Template.success(result, ""));
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.ErrorID == 2110) {
          next(new APIError(err.message, err.ErrorID));
        }
        next(new ServerException("error occurred"));
      });
  };
  private serializeFieldsCustom(data: any[]) {
    for (const item of data) {
      this.serializeField(item, "assignTo");
      this.serializeField(item, "reporter");
    }
  }
  public changeAssign = (req: CustomeRequest, res: Response, next: any) => {
    req.body.modifiedBy = User.getUserJson(req.updatedUser as User);
    this.service
      .changeAssign(Number(req.body.operationId), Number(req.body.userId))
      .then(() => {
        res.json(Template.success("", this.entity + " تم التعديل"));
      })
      .catch((err) => {
        console.log(err);
        if (err.ErrorID == 2110) {
          next(new APIError(err.message, err.ErrorID));
        }
        next(new ServerException("error occurred"));
      });
  };
  public changeStatus = (req: CustomeRequest, res: Response, next: any) =>{
    const user = req.updatedUser;
    if(user&&user.position){
      const operationId  = req.body.operationId;
      const nextStatusId = req.body.nextStatusId;
      console.log("operationId",operationId);
      console.log("nextStatusId",nextStatusId);
      this.createGridOptions(req);
        this.reqElm.search?.push(
          {
          name:"id",
          operation : QueryOperator.EQUAL,
          type:FieldTypes.NUMBER,
          value:Number(operationId)
        },
      )
      this.service.getAll(this.reqElm).then(({result})=>{
        this.service.changeStatus(result.data[0] as IPersonOperation ,user.position,nextStatusId).then(()=>{
          res.json(Template.success(result, "تم تغير الحالة بنجاح"));
        }).catch((err) => {
          console.log(err);
          if (err.ErrorID == 2110) {
            next(new APIError(err.message, err.ErrorID));
          }
          next(new APIError(err.message, err.ErrorID));
        });
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

}

export default PersonOperationController;
