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
import { CustomeRequest } from "../interface/CustomeRequest";
import Err from "../global/response/errorcode";
const service = new RuleService(Rule);
// const ruleService = new RuleService(Rule);
class RuleController extends BaseController<Rule, IRule, RuleService> {
  option: TypeormOptions = {
    relations: {
      // "rule_rules":true
      // "position.department":true
    },
    join: {
      alias: 'rule',
      innerJoinAndSelect: {
        // rules:"rule.rules",
        // apis:"rules.apiId",
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
          {
            name: 'isDefault',
            type: FieldTypes.NUMBER
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
      name:"id",
      operation : QueryOperator.EQUAL,
      type:FieldTypes.NUMBER,
      value:Number(ruleId)
    })
    if (this.reqElm.join) {
      this.reqElm.join.innerJoinAndSelect = {
        ...this.reqElm.join.innerJoinAndSelect,
        rules: "rule.rules"
      };
    }
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
      next(new APIError(err.message, err.ErrorID));
    });
  }
  addNewProperty() {
    
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
        next(new APIError(err.message, err.ErrorID));
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
  public  makeUnmakeDefault = (req:Request , res: Response,next:any)=>{
    const rule = req.body as IRule;
    if(!rule||!rule.uuid){
      next(new APIError("خطأ في الطلب", 0));
    }
    service.makeUnMakeDefaultRule(rule.uuid).then(()=>{
      res.json(Template.success("تمت العملية بنجاح", ''))
    },error=>{
      next(new APIError(error.message, 0));
    }
  )
  }
  public getRulesByType(type:EntityType):Promise<Rule[]>{
    
    if(!type){
      return Promise.reject(new APIError("خطأ في الطلب", Err.UndefinedCode));
    }
    console.log("rule cntrl" , type)
   service.getRuleByType(type).then((rules)=>{
    return rules as Rule[];
   }).catch((err)=>{
    return Promise.reject(new APIError(err.message, Err.UndefinedCode));
   })
   return Promise.resolve([]);
  } 
}

export default RuleController;