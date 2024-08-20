"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GovernmentService = void 0;
const Government_1 = require("../../models/entities/Location/Government");
const BaseService_1 = __importDefault(require("../BaseService"));
class GovernmentService extends BaseService_1.default {
    getEntityClass() {
        return Government_1.Government;
    }
}
exports.GovernmentService = GovernmentService;
//# sourceMappingURL=GovernmentService.js.map