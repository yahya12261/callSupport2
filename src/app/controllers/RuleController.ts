import { Request, Response } from "express";
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
// const service = new RuleService(Rule);


class RuleController extends BaseController<Rule, IRule, RuleService> {
  option: TypeormOptions = {
    relations: ["createdBy"],
  };
  entity: EntityType = EntityType.API;

  public addPostitonRule = (req: Request, res: Response, next: any) => {
    this.service
      .addPositionRule(Number(req.body.rule.id), Number(req.body.position.id))
      .then((done) => {
        if (done) {
          res.json(Template.success(null, "Rule Position added succesfully"));
        } else {
          res.json(Template.error(null, "Rule Position added succesfully", ""));
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

  public generateUserRulesByPosition = (user:User) => {

    this.service
      .addUserRulesByPosition(user)
      .then((res) => {
        
        if (res) return res;
      })
      .catch((err) => {
        return false;
      });
  };
}

export default RuleController;