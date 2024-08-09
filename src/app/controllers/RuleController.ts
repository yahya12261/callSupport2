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
const service = new RuleService(Rule);
// const ruleService = new RuleService(Rule);
class RuleController extends BaseController<Rule, IRule, RuleService> {
  option: TypeormOptions = {
    // relations: ["createdBy"],
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
    this.reqElm.page = Number(req.query.page);
    this.reqElm.pageSize = Number(req.query.pageSize);
    this.reqElm.orderBy = req.query.orderBy?String(req.query.orderBy):"createdAt";
    this.reqElm.order = req.query.order?validateOrderOperation(String(req.query.order)):"DESC";
    this.reqElm.relations = this.option.relations;
    const ruleId = req.params.id;
    this.fillSearchableFieldFromRequest(req)
    this.reqElm.search = this.searchFields;
    this.service.getAllRulesByPageId(this.reqElm,Number(ruleId)).then(({result})=>{
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