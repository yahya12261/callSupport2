"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RuleService = void 0;
const typeorm_1 = require("typeorm");
const Rule_1 = require("../models/entities/Rule");
const BaseService_1 = __importDefault(require("./BaseService"));
const apierror_1 = __importDefault(require("../global/response/apierror"));
const errorcode_1 = __importDefault(require("../global/response/errorcode"));
const EntityType_1 = require("../enum/EntityType");
class RuleService extends BaseService_1.default {
    getEntityClass() {
        return Rule_1.Rule;
    }
    addRule(endPoints) {
        return __awaiter(this, void 0, void 0, function* () {
            const ruleRepository = (0, typeorm_1.getRepository)(Rule_1.Rule);
            try {
                if (!endPoints || !endPoints.path || !endPoints.methodType) {
                    return Promise.reject(new apierror_1.default("err", errorcode_1.default.EmptyRequestBody));
                }
                // Check if a rule with the same name already exists
                const existingRule = yield ruleRepository.findOne({ name: endPoints.path, methodType: endPoints.methodType });
                if (existingRule) {
                    // If a rule with the same name exists, do nothing and return
                    return;
                }
                const rule = new Rule_1.Rule();
                rule.name = endPoints.path;
                rule.type = EntityType_1.EntityType.API;
                rule.isActive = true;
                rule.methodType = endPoints.methodType;
                yield ruleRepository.save(rule);
            }
            catch (err) {
                return Promise.reject(new apierror_1.default("an error : " + err, errorcode_1.default.UndefinedCode));
            }
        });
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
    deleteApiFromPage(pageId, apiId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield (0, typeorm_1.getRepository)("rule_rules").delete({ pageId, apiId });
            }
            catch (err) {
                return Promise.reject(new apierror_1.default("an error : " + err, errorcode_1.default.UndefinedCode));
            }
        });
    }
    addPageApiRule(pageId, apiId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Check if the (pageId, apiId) combination already exists in the rule_rules table
                const existingRelation = yield (0, typeorm_1.getRepository)("rule_rules").findOne({
                    where: { pageId, apiId },
                });
                if (!existingRelation) {
                    yield (0, typeorm_1.getRepository)("rule_rules").insert({ pageId, apiId });
                }
            }
            catch (err) {
                return Promise.reject(new apierror_1.default("an error : " + err, errorcode_1.default.UndefinedCode));
            }
        });
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
    makeUnMakeDefaultRule(uuid) {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = this.getRepository();
            try {
                const rule = yield this.findByUUID(uuid);
                if (!rule) {
                    return Promise.reject(new apierror_1.default("الصلاحية غير موجودة", errorcode_1.default.UndefinedCode));
                }
                rule.isDefault = !rule.isDefault;
                yield repository.save(rule);
            }
            catch (err) {
                return Promise.reject(new apierror_1.default("خطأ", errorcode_1.default.UndefinedCode));
            }
        });
    }
    getDefaultRules() {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = this.getRepository();
            try {
                var rules = yield repository.find({
                    where: { isDefault: true }
                });
                return rules;
            }
            catch (err) {
                return Promise.reject(new apierror_1.default("خطأ", errorcode_1.default.UndefinedCode));
            }
        });
    }
    getRuleByType(type) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!type || !(Object.is(EntityType_1.EntityType.PAGE, type) || Object.is(EntityType_1.EntityType.API, type) || Object.is(EntityType_1.EntityType.COMPONENT, type))) {
                    return Promise.reject(new apierror_1.default("خطأ في الطلب", errorcode_1.default.UndefinedCode));
                }
                const rules = yield this.getRepository().find({
                    where: { type: type }
                });
                // console.log("service",rules)
                return rules;
            }
            catch (e) {
                return Promise.reject(new apierror_1.default("an error : " + e, errorcode_1.default.UndefinedCode));
            }
        });
    }
}
exports.RuleService = RuleService;
//# sourceMappingURL=RuleService.js.map