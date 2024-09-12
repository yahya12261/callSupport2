"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const EndPointsActionsEnum_1 = require("../../app/enum/EndPointsActionsEnum");
const EndPointsActions_1 = require("../../middlewares/EndPointsActions");
const authMiddlewares_1 = require("../../middlewares/authMiddlewares");
const StatusFlowContoller_1 = __importDefault(require("../../app/controllers/Status/StatusFlowContoller"));
const StatusFlow_1 = require("../../app/models/entities/Statuses/StatusFlow");
const StatusFlowService_1 = require("../../app/services/Status/StatusFlowService");
const router = (0, express_1.Router)();
const upload = (0, multer_1.default)();
const Service = new StatusFlowService_1.StatusFlowService(StatusFlow_1.StatusFlow);
const Controller = new StatusFlowContoller_1.default();
router.get('/', (0, EndPointsActions_1.EndPointsActions)(EndPointsActionsEnum_1.EndPointsActionsEnum.SELECT), authMiddlewares_1.authMiddleware, Controller.getAll);
router.get('/status/:statusId', (0, EndPointsActions_1.EndPointsActions)(EndPointsActionsEnum_1.EndPointsActionsEnum.SELECT), authMiddlewares_1.authMiddleware, Controller.getNextStatusesByStatusId);
router.post('/', (0, EndPointsActions_1.EndPointsActions)(EndPointsActionsEnum_1.EndPointsActionsEnum.ADD), authMiddlewares_1.authMiddleware, upload.none(), Controller.add);
router.patch('/', (0, EndPointsActions_1.EndPointsActions)(EndPointsActionsEnum_1.EndPointsActionsEnum.UPDATE), authMiddlewares_1.authMiddleware, upload.none(), Controller.update);
router.get('/selectOption', (0, EndPointsActions_1.EndPointsActions)(EndPointsActionsEnum_1.EndPointsActionsEnum.SELECT), authMiddlewares_1.authMiddleware, Controller.getSelectOption);
exports.default = router;
//# sourceMappingURL=StatusFlow.js.map