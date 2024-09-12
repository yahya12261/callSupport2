"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceService = void 0;
const Service_1 = require("../models/entities/Service");
const BaseService_1 = __importDefault(require("./BaseService"));
class ServiceService extends BaseService_1.default {
    getEntityClass() {
        return Service_1.Service;
    }
}
exports.ServiceService = ServiceService;
//# sourceMappingURL=ServiceService.js.map