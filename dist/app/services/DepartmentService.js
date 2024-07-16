"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DepartmentService = void 0;
const Department_1 = require("../models/entities/Department");
const BaseService_1 = __importDefault(require("./BaseService"));
class DepartmentService extends BaseService_1.default {
    getEntityClass() {
        return Department_1.Department;
    }
}
exports.DepartmentService = DepartmentService;
//# sourceMappingURL=DepartmentService.js.map