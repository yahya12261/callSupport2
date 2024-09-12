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
exports.TownService = void 0;
const apierror_1 = __importDefault(require("../../global/response/apierror"));
const errorcode_1 = __importDefault(require("../../global/response/errorcode"));
const Town_1 = require("../../models/entities/Location/Town");
const BaseService_1 = __importDefault(require("../BaseService"));
class TownService extends BaseService_1.default {
    getEntityClass() {
        return Town_1.Town;
    }
    getSelectOptionByCazaId(cazaId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.getRepository().find({
                    where: { isActive: true, caza: { id: cazaId } },
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
exports.TownService = TownService;
//# sourceMappingURL=TownService.js.map