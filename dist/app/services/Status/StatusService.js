"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusService = void 0;
const Status_1 = require("../../models/entities/Statuses/Status");
const BaseService_1 = __importDefault(require("../BaseService"));
class StatusService extends BaseService_1.default {
    getEntityClass() {
        return Status_1.Status;
    }
}
exports.StatusService = StatusService;
//# sourceMappingURL=StatusService.js.map