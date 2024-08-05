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
exports.PositionService = void 0;
const Position_1 = require("../models/entities/Position");
const BaseService_1 = __importDefault(require("./BaseService"));
const apierror_1 = __importDefault(require("../global/response/apierror"));
const errorcode_1 = __importDefault(require("../global/response/errorcode"));
const typeorm_1 = require("typeorm");
class PositionService extends BaseService_1.default {
    getEntityClass() {
        return Position_1.Position;
    }
    // async addPositionRule(
    //   ruleId: number,
    //   positionId: number
    // ): Promise<boolean | null> {
    //   try {
    //     const repository = getRepository(Rule);
    //     const positionRepository = this.getRepository();
    //     const position = await positionRepository.findOne({
    //       where: { id: positionId },
    //       relations: ["rules"],
    //     });
    //     const rule = await repository.findOne({ id: ruleId });
    //     if (position && rule) {
    //       console.log(position.rules);
    //       if (!Array.isArray(position.rules)) {
    //         position.rules = [];
    //       }
    //       position.addRules(rule);
    //       await positionRepository.save(position);
    //       return true;
    //     } else {
    //       return false;
    //     }
    //   } catch (err) {
    //     console.error("Error adding position-rule association:", err);
    //     return Promise.reject(
    //       new APIError(
    //         "Error adding position-rule association",
    //         Err.InternalServerError
    //       )
    //     );
    //   }
    // }
    addPositionRule(positionId, ruleId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Check if the (pageId, apiId) combination already exists in the api_page table
                const existingRelation = yield (0, typeorm_1.getRepository)("position_rule").findOne({
                    where: { positionId, ruleId },
                });
                if (!existingRelation) {
                    yield (0, typeorm_1.getRepository)("position_rule").insert({ positionId, ruleId });
                }
            }
            catch (err) {
                return Promise.reject(new apierror_1.default("an error : " + err, errorcode_1.default.UndefinedCode));
            }
        });
    }
    getAllPositionRules(requestElement, positionId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const repository = this.getRepository();
                requestElement.page = requestElement.page ? requestElement.page : 1;
                requestElement.pageSize = requestElement.pageSize ? requestElement.pageSize : 20;
                const order = this.buildOrder(requestElement);
                const whereConditions = Object.assign(Object.assign({}, this.buildWhereConditions(requestElement)), { id: positionId });
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
    deletePositionRule(positionId, ruleId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield (0, typeorm_1.getRepository)("position_rule").delete({ positionId, ruleId });
            }
            catch (err) {
                return Promise.reject(new apierror_1.default("an error : " + err, errorcode_1.default.UndefinedCode));
            }
        });
    }
}
exports.PositionService = PositionService;
//# sourceMappingURL=PositionService.js.map