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
const Rule_1 = require("../models/entities/Rule");
class PositionService extends BaseService_1.default {
    getEntityClass() {
        return Position_1.Position;
    }
    addPositionRule(ruleId, positionId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const repository = (0, typeorm_1.getRepository)(Rule_1.Rule);
                const positionRepository = this.getRepository();
                const position = yield positionRepository.findOne({
                    where: { id: positionId },
                    relations: ["rules"],
                });
                const rule = yield repository.findOne({ id: ruleId });
                if (position && rule) {
                    console.log(position.rules);
                    if (!Array.isArray(position.rules)) {
                        position.rules = [];
                    }
                    position.addRules(rule);
                    yield positionRepository.save(position);
                    return true;
                }
                else {
                    return false;
                }
            }
            catch (err) {
                console.error("Error adding position-rule association:", err);
                return Promise.reject(new apierror_1.default("Error adding position-rule association", errorcode_1.default.InternalServerError));
            }
        });
    }
}
exports.PositionService = PositionService;
//# sourceMappingURL=PositionService.js.map