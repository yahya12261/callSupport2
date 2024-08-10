import { NextFunction, Request, Response } from "express";
import { Rule } from "../models/entities/Rule";
import { RuleService } from "../services/RuleService";
import Template from "../global/response";
import APIError from "../global/response/apierror";
import { ServerException } from "../../lib/custom-errors";
import { IRule } from "../models/Rule";
import { BaseController } from "./BaseController";
import BaseService from "../services/BaseService";
import { EntityType } from "../enum/EntityType";
import { TypeormOptions } from "../interface/TypeormOptions";
import { User } from "../models/entities/User";
import { EndPoints } from "../extra/EndPoints";
import { IEndPoints } from "../interface/IEndPoints";
import { FieldTypes } from "../enum/FieldTypes";
import { validateOrderOperation } from "../enum/OrderByOperation";
import { ResponseElement } from "../interface/ResponseElement";
import { JoinOptions } from "../interface/JoinOptions";
import { QueryOperator } from "../enum/WhereOperations";
const service = new RuleService(Rule);
// const ruleService = new RuleService(Rule);
class RuleController extends BaseController<Rule, IRule, RuleService> {
  option: TypeormOptions = {
    relations: {
      // rules:true
      // "position.department":true
    },
    join: {
      alias: 'rule',
      innerJoinAndSelect: {
        rules:"rules",
        createdBy:'rule.createdBy',
        modifiedBy:'rule.modifiedBy',
        deletedBy:'rule.deletedBy',
      },
    },
  };
  entity: EntityType = EntityType.PAGE;
  
  constructor() {
      super(service,
        [
          {
            name: 'name',
            type: FieldTypes.TEXT
          },
          {
            name: 'route',
            type: FieldTypes.TEXT
          },
          {
            name: 'code',
            type: FieldTypes.TEXT
          },
          {
            name: 'methodType',
            type: FieldTypes.TEXT
          },
          {
            name: 'methodName',
            type: FieldTypes.TEXT
          },
        ],
      );
    }
  public addEndPointsRule = (endPoint:IEndPoints)=>{
    this.entity = EntityType.API;
    this.service.addRule(endPoint).then(()=>{
    }).catch(err => {
     console.log(err);
  })
  }
  public getPagesApis = (req: Request, res: Response, next: any) => {
    this.createGridOptions(req);
    const ruleId = req.params.id;
    this.reqElm.search?.push({
      name:"rules.pageId",
      operation : QueryOperator.EQUAL,
      type:FieldTypes.NUMBER,
      value:Number(ruleId)
    })
    this.service.getAll(this.reqElm).then(({result})=>{
      if(result){
        const rulesRes = {currentPage:result.currentPage,data:result.data[0].rules ,pageSize:result.pageSize,total:result.total } as ResponseElement<Rule> 
        this.serializeFields(result.data);
        this.searchFields = this.getDefaultSearchableFields();
        res.json(Template.success(rulesRes, ""));
      }
    })
    .catch((err) => {
      console.log(err);
      if (err.ErrorID == 2110) {
        next(new APIError(err.message, err.ErrorID));
      }
      next(new ServerException("error occurred"));
    });
  }
  public addPageApi = (req: Request, res: Response, next: any) => {
    const pageId = req.body.pageId;
    const apiId = req.body.apiId;
    this.service.addPageApiRule(Number(pageId),Number(apiId)).then(() => {
        res.json(Template.success("", this.entity +  " api added to Page succesfully"));
    })
    .catch((err) => {
      console.log(err);
      if (err.ErrorID == 2110) {
        next(new APIError(err.message, err.ErrorID));
      }
      next(new ServerException("error occurred"));
    });
};
  public deletePageApi = (req: Request, res: Response, next: any) => {
    const pageId = req.body.pageId;
    const apiId = req.body.apiId;
    this.service.deleteApiFromPage(Number(pageId),Number(apiId)).then(() => {
        res.json(Template.success("", this.entity +  " api deleted from Page successfully"));
    })
    .catch((err) => {
      console.log(err);
      if (err.ErrorID == 2110) {
        next(new APIError(err.message, err.ErrorID));
      }
      next(new ServerException("error occurred"));
    });
};

}

export default RuleController;