
import { Entity, getRepository, Repository } from "typeorm";
import { Rule } from "../models/entities/Rule";
import { IRule } from "../models/Rule";
import BaseService from "./BaseService";
import { IPosition } from "../models/Position";
import { Position } from "../models/entities/Position";
import APIError from "../global/response/apierror";
import Err from "../global/response/errorcode";
import { User } from "../models/entities/User";
import { EntityType } from "../models/type/EntityType";
import { IUser } from "../models/User";
import { MethodTypes } from "../models/type/MethodTypes";
import { IEndPoints } from "../models/type/IEndPoints";
class RuleService extends BaseService<Rule, IRule> {
  protected getEntityClass(): typeof Rule {
    return Rule;
  }
   async addRule(endPoints: IEndPoints): Promise<void> {
    const ruleRepository = getRepository(Rule);
  
    try {
      if (!endPoints || !endPoints.path || !endPoints.methodType) {
        return Promise.reject(new APIError("err", Err.EmptyRequestBody));
      }
  
      // Check if a rule with the same name already exists
      const existingRule = await ruleRepository.findOne({ name: endPoints.path });
      if (existingRule) {
        // If a rule with the same name exists, do nothing and return
        return;
      }
      const rule = new Rule();
      rule.name = endPoints.path;
      rule.type = EntityType.API;
      rule.isActive = true;
      rule.methodType = endPoints.methodType;
      await ruleRepository.save(rule);
    } catch (err) {
      return Promise.reject(new APIError("an error : " + err, Err.UndefinedCode));
    }
  }
 


  
}
export { RuleService };