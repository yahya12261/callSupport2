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
exports.CazaService = void 0;
const Caza_1 = require("../../models/entities/Location/Caza");
const BaseService_1 = __importDefault(require("../BaseService"));
const apierror_1 = __importDefault(require("../../global/response/apierror"));
const errorcode_1 = __importDefault(require("../../global/response/errorcode"));
class CazaService extends BaseService_1.default {
    getEntityClass() {
        return Caza_1.Caza;
    }
    getSelectOptionByGovernmentId(governmentId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.getRepository().find({
                    where: { isActive: true, government: { id: governmentId } },
                    select: ["id", "arabicLabel"],
                });
                return data;
            }
            catch (e) {
                console.error("Error fetching entities:", e);
                return Promise.reject(new apierror_1.default("cann't fetch data" + e, errorcode_1.default.UndefinedCode));
            }
        });
    }
}
exports.CazaService = CazaService;
//# sourceMappingURL=CazaService.js.map