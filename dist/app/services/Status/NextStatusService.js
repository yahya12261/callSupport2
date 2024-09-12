"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NextStatusService = void 0;
const NextStatus_1 = require("../../models/entities/Statuses/NextStatus");
const BaseService_1 = __importDefault(require("../BaseService"));
class NextStatusService extends BaseService_1.default {
    getEntityClass() {
        return NextStatus_1.NextStatus;
    }
}
exports.NextStatusService = NextStatusService;
//# sourceMappingURL=NextStatusService.js.map