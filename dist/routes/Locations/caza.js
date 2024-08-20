"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const EndPointsActions_1 = require("../../middlewares/EndPointsActions");
const EndPointsActionsEnum_1 = require("../../app/enum/EndPointsActionsEnum");
const authMiddlewares_1 = require("../../middlewares/authMiddlewares");
const CazaService_1 = require("../../app/services/Locations/CazaService");
const Caza_1 = require("../../app/models/entities/Location/Caza");
const CazaController_1 = __importDefault(require("../../app/controllers/Locations/CazaController"));
const router = (0, express_1.Router)();
const upload = (0, multer_1.default)();
const Service = new CazaService_1.CazaService(Caza_1.Caza);
const Controller = new CazaController_1.default();
router.get('/', (0, EndPointsActions_1.EndPointsActions)(EndPointsActionsEnum_1.EndPointsActionsEnum.SELECT), authMiddlewares_1.authMiddleware, Controller.getAll);
router.post('/', (0, EndPointsActions_1.EndPointsActions)(EndPointsActionsEnum_1.EndPointsActionsEnum.ADD), authMiddlewares_1.authMiddleware, upload.none(), Controller.add);
router.patch('/', (0, EndPointsActions_1.EndPointsActions)(EndPointsActionsEnum_1.EndPointsActionsEnum.UPDATE), authMiddlewares_1.authMiddleware, upload.none(), Controller.update);
router.get('/selectOption', (0, EndPointsActions_1.EndPointsActions)(EndPointsActionsEnum_1.EndPointsActionsEnum.SELECT), authMiddlewares_1.authMiddleware, Controller.getSelectOption);
exports.default = router;
//# sourceMappingURL=caza.js.map