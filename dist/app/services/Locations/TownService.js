"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TownService = void 0;
const Town_1 = require("../../models/entities/Location/Town");
const BaseService_1 = __importDefault(require("../BaseService"));
class TownService extends BaseService_1.default {
    getEntityClass() {
        return Town_1.Town;
    }
}
exports.TownService = TownService;
//# sourceMappingURL=TownService.js.map