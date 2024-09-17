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
exports.StatusFlowService = void 0;
const typeorm_1 = require("typeorm");
const StatusFlow_1 = require("../../models/entities/Statuses/StatusFlow");
const apierror_1 = __importDefault(require("../../global/response/apierror"));
const errorcode_1 = __importDefault(require("../../global/response/errorcode"));
const BaseService_1 = __importDefault(require("../BaseService"));
class StatusFlowService extends BaseService_1.default {
    getEntityClass() {
        return StatusFlow_1.StatusFlow;
    }
    static addNextStatus(statusId, nextStatusId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const existingRelation = yield (0, typeorm_1.getRepository)("next_status").findOne({
                    where: { statusId, nextStatusId },
                });
                if (!existingRelation) {
                    yield (0, typeorm_1.getRepository)("next_status").insert({ nextStatusId, statusId });
                }
            }
            catch (err) {
                return Promise.reject(new apierror_1.default("an error : " + err, errorcode_1.default.UndefinedCode));
            }
        });
    }
    static removeNextStatus(nextStatusId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield (0, typeorm_1.getRepository)("next_status").delete({ nextStatusId });
            }
            catch (err) {
                return Promise.reject(new apierror_1.default("an error : " + err, errorcode_1.default.UndefinedCode));
            }
        });
    }
}
exports.StatusFlowService = StatusFlowService;
//# sourceMappingURL=StatusFlowService.js.map