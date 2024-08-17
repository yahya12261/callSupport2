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
const EndPointsActions_1 = require("../middlewares/EndPointsActions");
const EndPointsActionsEnum_1 = require("../app/enum/EndPointsActionsEnum");
const authMiddlewares_1 = require("../middlewares/authMiddlewares");
const router = (0, express_1.Router)();
const upload = (0, multer_1.default)();
const Service = new RuleService_1.RuleService(Rule_1.Rule);
const Controller = new RuleController_1.default();
// Get all departments
router.get('/', (0, EndPointsActions_1.EndPointsActions)(EndPointsActionsEnum_1.EndPointsActionsEnum.SELECT), authMiddlewares_1.authMiddleware, Controller.getAll);
router.get('/scheme', (0, EndPointsActions_1.EndPointsActions)(EndPointsActionsEnum_1.EndPointsActionsEnum.SELECT), authMiddlewares_1.authMiddleware, Controller.getScheme);
router.patch('/', (0, EndPointsActions_1.EndPointsActions)(EndPointsActionsEnum_1.EndPointsActionsEnum.UPDATE), authMiddlewares_1.authMiddleware, upload.none(), Controller.update);
router.patch('/mk-unmk-default', (0, EndPointsActions_1.EndPointsActions)(EndPointsActionsEnum_1.EndPointsActionsEnum.UPDATE), authMiddlewares_1.authMiddleware, upload.none(), Controller.makeUnmakeDefault);
router.post('/', (0, EndPointsActions_1.EndPointsActions)(EndPointsActionsEnum_1.EndPointsActionsEnum.ADD), authMiddlewares_1.authMiddleware, upload.none(), Controller.add);
router.get('/getPagesApis/:id', (0, EndPointsActions_1.EndPointsActions)(EndPointsActionsEnum_1.EndPointsActionsEnum.SELECT), authMiddlewares_1.authMiddleware, Controller.getPagesApis);
router.post('/addPageApi', (0, EndPointsActions_1.EndPointsActions)(EndPointsActionsEnum_1.EndPointsActionsEnum.OTHER), authMiddlewares_1.authMiddleware, upload.none(), Controller.addPageApi);
router.post('/deletePageApi', (0, EndPointsActions_1.EndPointsActions)(EndPointsActionsEnum_1.EndPointsActionsEnum.OTHER), authMiddlewares_1.authMiddleware, upload.none(), Controller.deletePageApi);
exports.default = router;
//# sourceMappingURL=Rule.js.map