"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const RuleController_1 = __importDefault(require("../app/controllers/RuleController"));
const RuleService_1 = require("../app/services/RuleService");
const Rule_1 = require("../app/models/entities/Rule");
const router = (0, express_1.Router)();
const upload = (0, multer_1.default)();
const ruleService = new RuleService_1.RuleService(Rule_1.Rule);
const ruleController = new RuleController_1.default(ruleService);
// Get all departments
router.get('/', ruleController.getAll);
router.post("/rule-position", ruleController.addPostitonRule);
// Create a new department
router.post('/', upload.none(), ruleController.add);
exports.default = router;
//# sourceMappingURL=Rule.js.map