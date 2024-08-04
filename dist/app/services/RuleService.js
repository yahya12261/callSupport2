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
                const existingRule = yield ruleRepository.findOne({ name: endPoints.path });
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
    addPageApiRule(pageId, apiId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const page = yield this.getRepository().findOne({
                    where: { id: pageId },
                    relations: ["rules"],
                });
                if (!page) {
                    return Promise.reject(new apierror_1.default("invalid page rule", errorcode_1.default.UndefinedCode));
                }
                if (!Array.isArray(page.rules)) {
                    page.rules = [];
                }
                if (!(page.type === EntityType_1.EntityType.PAGE)) {
                    return Promise.reject(new apierror_1.default("main rule not page", errorcode_1.default.UndefinedCode));
                }
                const api = yield this.getRepository().findOne({
                    where: { id: apiId },
                });
                if (!api) {
                    return Promise.reject(new apierror_1.default("api not exist", errorcode_1.default.UndefinedCode));
                }
                if (!(api.type === EntityType_1.EntityType.API)) {
                    return Promise.reject(new apierror_1.default("Cannt set rule not api", errorcode_1.default.UndefinedCode));
                }
                page.addRules(api);
                this.getRepository().save(page);
            }
            catch (err) {
                return Promise.reject(new apierror_1.default("an error : " + err, errorcode_1.default.UndefinedCode));
            }
        });
    }
    deleteApiFromPage(pageId, apiId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const page = yield this.getRepository().findOne({
                    where: { id: pageId },
                    relations: ['rules'],
                });
                if (!page) {
                    return Promise.reject(new apierror_1.default('Invalid page rule', errorcode_1.default.UndefinedCode));
                }
                if (!Array.isArray(page.rules)) {
                    page.rules = [];
                }
                if (!(page.type === EntityType_1.EntityType.PAGE)) {
                    return Promise.reject(new apierror_1.default('Main rule not page', errorcode_1.default.UndefinedCode));
                }
                const api = yield this.getRepository().findOne({
                    where: { id: apiId },
                });
                if (!api) {
                    return Promise.reject(new apierror_1.default('API not exist', errorcode_1.default.UndefinedCode));
                }
                if (!(api.type === EntityType_1.EntityType.API)) {
                    return Promise.reject(new apierror_1.default('Cannot set rule not API', errorcode_1.default.UndefinedCode));
                }
                // Remove the rule from the page's rules array
                page.rules = page.rules.filter((rule) => rule.id !== api.id);
                yield this.getRepository().save(page);
            }
            catch (err) {
                return Promise.reject(new apierror_1.default(`An error occurred: ${err}`, errorcode_1.default.UndefinedCode));
            }
        });
    }
    getAllRulesByPageId(requestElement, pageId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const repository = this.getRepository();
                requestElement.page = requestElement.page ? requestElement.page : 1;
                requestElement.pageSize = requestElement.pageSize ? requestElement.pageSize : 20;
                const order = this.buildOrder(requestElement);
                const whereConditions = Object.assign(Object.assign({}, this.buildWhereConditions(requestElement)), { id: pageId });
                const [data, total] = yield repository.findAndCount({
                    relations: ["rules"],
                    where: whereConditions,
                    skip: Math.abs((requestElement.page - 1) * requestElement.pageSize),
                    take: requestElement.pageSize,
                    order,
                });
                const result = {
                    data: data,
                    currentPage: requestElement.page,
                    total: total,
                    pageSize: requestElement.pageSize,
                };
                return {
                    result,
                };
            }
            catch (e) {
                console.error("Error fetching rules:", e);
                const result = {
                    data: [],
                    currentPage: 0,
                    total: 0,
                    pageSize: requestElement.pageSize,
                };
                return {
                    result,
                };
            }
        });
    }
}
exports.RuleService = RuleService;
//# sourceMappingURL=RuleService.js.map