"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CazaService = void 0;
const Caza_1 = require("../../models/entities/Location/Caza");
const BaseService_1 = __importDefault(require("../BaseService"));
class CazaService extends BaseService_1.default {
    getEntityClass() {
        return Caza_1.Caza;
    }
}
exports.CazaService = CazaService;
//# sourceMappingURL=CazaService.js.map