
import { Entity, getRepository, Repository } from "typeorm";
import { Rule } from "../models/entities/Rule";
import { IRule } from "../models/Rule";
import BaseService from "./BaseService";
import { IPosition } from "../models/Position";
import { Position } from "../models/entities/Position";
import APIError from "../global/response/apierror";
import Err from "../global/response/errorcode";
import { User } from "../models/entities/User";
import { EntityType } from "../enum/EntityType";
import { IUser } from "../models/User";
import { MethodTypes } from "../enum/MethodTypes";
import { IEndPoints } from "../interface/IEndPoints";
import { RequestElement } from "../interface/RequestElement";
import { ResponseElement } from "../interface/ResponseElement";
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
      const existingRule = await ruleRepository.findOne({ name: endPoints.path,methodType:endPoints.methodType });
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

  // async addPageApiRule(pageId:number,apiId:number): Promise<void>{
  //   try {
  //     const page =await this.getRepository().findOne({
  //       where: { id: pageId },
  //       relations: ["rules"],
  //     });
  //     if(!page){
  //       return Promise.reject(new APIError("invalid page rule", Err.UndefinedCode));
  //     }
  //     if (!Array.isArray(page.rules)) {
  //       page.rules = [];
  //     }
  //     if(!(page.type===EntityType.PAGE)){
  //       return Promise.reject(new APIError("main rule not page", Err.UndefinedCode));
  //     }
  //     const api =await this.getRepository().findOne({
  //       where: { id: apiId },
  //     });
  //     if(!api){
  //       return Promise.reject(new APIError("api not exist", Err.UndefinedCode));
  //     }
  //     if(!(api.type===EntityType.API)){
  //       return Promise.reject(new APIError("Cannt set rule not api", Err.UndefinedCode));
  //     }

  //     if (!page.rules.some((rule) => rule.id === api.id)) {
  //       page.rules.push(api);
  //       await this.getRepository().save(page);
  //     }

  //   }
  //   catch(err){
  //      return Promise.reject(new APIError("an error : " + err, Err.UndefinedCode));
  //   }
  // }

  // async deleteApiFromPage(pageId: number, apiId: number): Promise<void> {
  //   try {
  //     const page = await this.getRepository().findOne({
  //       where: { id: pageId },
  //       relations: ['rules'],
  //     });
  
  //     if (!page) {
  //       return Promise.reject(new APIError('Invalid page rule', Err.UndefinedCode));
  //     }
  
  //     if (!Array.isArray(page.rules)) {
  //       page.rules = [];
  //     }
  
  //     if (!(page.type === EntityType.PAGE)) {
  //       return Promise.reject(new APIError('Main rule not page', Err.UndefinedCode));
  //     }
  
  //     const api = await this.getRepository().findOne({
  //       where: { id: apiId },
  //     });
  
  //     if (!api) {
  //       return Promise.reject(new APIError('API not exist', Err.UndefinedCode));
  //     }
  
  //     if (!(api.type === EntityType.API)) {
  //       return Promise.reject(new APIError('Cannot set rule not API', Err.UndefinedCode));
  //     }
  
  //     // Remove the rule from the page's rules array
  //     page.rules = page.rules.filter((rule) => rule.id !== api.id);
  
  //     await this.getRepository().save(page);
  //   } catch (err) {
  //     return Promise.reject(new APIError(`An error occurred: ${err}`, Err.UndefinedCode));
  //   }
  // }


  async deleteApiFromPage(pageId: number, apiId: number): Promise<void> {
    try {
        await getRepository("rule_rules").delete({ pageId, apiId });
    } catch (err) {
      return Promise.reject(new APIError("an error : " + err, Err.UndefinedCode));
    }
  }


  async addPageApiRule(pageId: number, apiId: number): Promise<void> {
    try {
      // Check if the (pageId, apiId) combination already exists in the rule_rules table
      const existingRelation = await getRepository("rule_rules").findOne({
        where: { pageId, apiId },
      });
  
      if (!existingRelation) {
        await getRepository("rule_rules").insert({ pageId, apiId });
      }
    } catch (err) {
      return Promise.reject(new APIError("an error : " + err, Err.UndefinedCode));
    }
  }

  // async getAllRulesByPageId(
  //   requestElement: RequestElement,
  //   pageId: number
  // ): Promise<{ result: ResponseElement<Rule> }> {
  //   try {
  //     const repository: Repository<Rule> = this.getRepository();
  //     requestElement.page = requestElement.page ? requestElement.page : 1;
  //     requestElement.pageSize = requestElement.pageSize ? requestElement.pageSize : 20;
  //     const order: Record<string, "ASC" | "DESC"> = this.buildOrder(requestElement);
  //     const whereConditions: Record<string, any> = {
  //       ...this.buildWhereConditions(requestElement),
  //       id: pageId,
  //     };
  
  //     const [data, total] = await repository.findAndCount({
  //       // relations: ["rules"],

  //       join:{alias:"rule_rules",leftJoinAndSelect:{

  //       }}
  //       where: whereConditions,
  //       skip: Math.abs((requestElement.page - 1) * requestElement.pageSize),
  //       take: requestElement.pageSize,
  //       order,
  //     });
  
  //     const result: ResponseElement<Rule> = {
  //       data: data,
  //       currentPage: requestElement.page,
  //       total: total,
  //       pageSize: requestElement.pageSize,
  //     };
  
  //     return {
  //       result,
  //     };
  //   } catch (e) {
  //     console.error("Error fetching rules:", e);
  //     const result: ResponseElement<Rule> = {
  //       data: [],
  //       currentPage: 0,
  //       total: 0,
  //       pageSize: requestElement.pageSize,
  //     };
  //     return {
  //       result,
  //     };
  //   }
  // }

  async makeUnMakeDefaultRule(uuid:string):Promise<void>{
    const repository = this.getRepository();
    try{
      const rule = await this.findByUUID(uuid);
      if(!rule){
        return Promise.reject(new APIError("الصلاحية غير موجودة", Err.UndefinedCode));
      }
      rule.isDefault = !rule.isDefault;
      await repository.save(rule as Rule); 
    }catch(err){
      return Promise.reject(new APIError("خطأ", Err.UndefinedCode));
    }
  }

  async getDefaultRules():Promise<Rule[]>{
    const repository = this.getRepository();
    try{
      var rules = await repository.find({
        where:{isDefault:true}
      });
      return rules;
    }catch(err){
      return Promise.reject(new APIError("خطأ", Err.UndefinedCode));
    }
  }



  async getRuleByType(type:EntityType):Promise<Rule[]>{
    try{
      if(!type||!(Object.is(EntityType.PAGE,type)||Object.is(EntityType.API,type)||Object.is(EntityType.COMPONENT,type))){
        return Promise.reject(new APIError("خطأ في الطلب", Err.UndefinedCode));
      }
       const rules = await this.getRepository().find({
        where:{type:type}
       });
      // console.log("service",rules)
       return rules;
    }catch(e){
      return Promise.reject(new APIError("an error : " + e, Err.UndefinedCode));
    }
  }


  
}
export { RuleService };