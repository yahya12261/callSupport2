"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const TestyController_1 = __importDefault(require("../app/controllers/TestyController"));
const EndPoints_1 = require("../middlewares/EndPoints");
const router = (0, express_1.Router)();
router.post('/', TestyController_1.default.addNew);
const allRoutes = EndPoints_1.EndPoints.getAllRoutes("v1/rule", router);
router.get('/sync', EndPoints_1.EndPoints.generateRule);
exports.default = router;
//# sourceMappingURL=test.js.map