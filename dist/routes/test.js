"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const TestyController_1 = __importDefault(require("../app/controllers/TestyController"));
const authMiddlewares_1 = require("../middlewares/authMiddlewares");
const router = (0, express_1.Router)();
router.post('/', authMiddlewares_1.authMiddleware, TestyController_1.default.addNew);
exports.default = router;
//# sourceMappingURL=test.js.map