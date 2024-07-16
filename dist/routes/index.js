"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = require("express");
const user_1 = __importDefault(require("./user"));
const test_1 = __importDefault(require("./test"));
const department_1 = __importDefault(require("./department"));
const position_1 = __importDefault(require("./position"));
const Rule_1 = __importDefault(require("./Rule"));
const routes = (0, express_1.Router)();
exports.routes = routes;
routes.use('/v1/user', user_1.default);
routes.use('/v1/test', test_1.default);
routes.use('/v1/department', department_1.default);
routes.use('/v1/position', position_1.default);
routes.use('/v1/rule', Rule_1.default);
//# sourceMappingURL=index.js.map