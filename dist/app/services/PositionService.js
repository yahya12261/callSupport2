"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PositionService = void 0;
const Position_1 = require("../models/entities/Position");
const BaseService_1 = __importDefault(require("./BaseService"));
class PositionService extends BaseService_1.default {
    getEntityClass() {
        return Position_1.Position;
    }
}
exports.PositionService = PositionService;
//# sourceMappingURL=PositionService.js.map