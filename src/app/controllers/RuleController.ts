import { NextFunction, Request, Response } from "express";
import { Rule } from "../models/entities/Rule";
import { RuleService } from "../services/RuleService";
import Template from "../global/response";
import APIError from "../global/response/apierror";
import { ServerException } from "../../lib/custom-errors";
import { IRule } from "../models/Rule";
import { BaseController } from "./BaseController";
import BaseService from "../services/BaseService";
import { EntityType } from "../models/type/EntityType";
import { TypeormOptions } from "../models/TypeormOptions";
import { User } from "../models/entities/User";
import { EndPoints } from "../../middlewares/EndPoints";
import { IEndPoints } from "../models/type/IEndPoints";
// const service = new RuleService(Rule);

// const ruleService = new RuleService(Rule);
class RuleController extends BaseController<Rule, IRule, RuleService> {
  option: TypeormOptions = {
    relations: ["createdBy"],
  };
  entity: EntityType = EntityType.API;


  public addEndPointsRule = (endPoint:IEndPoints)=>{
    this.service.addRule(endPoint).then(()=>{
    }).catch(err => {
     console.log(err);
  })
  }
}

export default RuleController;