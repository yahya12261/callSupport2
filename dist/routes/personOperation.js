"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const personOperationService_1 = require("../app/services/personOperationService");
const personOperation_1 = require("../app/models/entities/personOperation");
const PersonOperationController_1 = __importDefault(require("../app/controllers/PersonOperationController"));
const EndPointsActionsEnum_1 = require("../app/enum/EndPointsActionsEnum");
const authMiddlewares_1 = require("../middlewares/authMiddlewares");
const EndPointsActions_1 = require("../middlewares/EndPointsActions");
const router = (0, express_1.Router)();
const upload = (0, multer_1.default)();
const Service = new personOperationService_1.PersonOperationService(personOperation_1.PersonOperation);
const Controller = new PersonOperationController_1.default();
router.get('/', (0, EndPointsActions_1.EndPointsActions)(EndPointsActionsEnum_1.EndPointsActionsEnum.SELECT), authMiddlewares_1.authMiddleware, Controller.getAll);
router.post('/', (0, EndPointsActions_1.EndPointsActions)(EndPointsActionsEnum_1.EndPointsActionsEnum.ADD), authMiddlewares_1.authMiddleware, upload.none(), Controller.add);
router.patch('/change-status', (0, EndPointsActions_1.EndPointsActions)(EndPointsActionsEnum_1.EndPointsActionsEnum.UPDATE), authMiddlewares_1.authMiddleware, upload.none(), Controller.changeStatus);
router.patch('/change-assign', (0, EndPointsActions_1.EndPointsActions)(EndPointsActionsEnum_1.EndPointsActionsEnum.UPDATE), authMiddlewares_1.authMiddleware, upload.none(), Controller.changeAssign);
router.get('/selectOption', (0, EndPointsActions_1.EndPointsActions)(EndPointsActionsEnum_1.EndPointsActionsEnum.SELECT), authMiddlewares_1.authMiddleware, Controller.getSelectOption);
exports.default = router;
//# sourceMappingURL=personOperation.js.map