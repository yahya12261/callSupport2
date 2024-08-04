"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const PositionController_1 = __importDefault(require("../app/controllers/PositionController"));
const PositionService_1 = require("../app/services/PositionService");
const Position_1 = require("../app/models/entities/Position");
const authMiddlewares_1 = require("../middlewares/authMiddlewares");
const EndPointsActions_1 = require("../middlewares/EndPointsActions");
const EndPointsActionsEnum_1 = require("../app/enum/EndPointsActionsEnum");
const router = (0, express_1.Router)();
const upload = (0, multer_1.default)();
const Service = new PositionService_1.PositionService(Position_1.Position);
const Controller = new PositionController_1.default();
router.get('/', (0, EndPointsActions_1.EndPointsActions)(EndPointsActionsEnum_1.EndPointsActionsEnum.SELECT), authMiddlewares_1.authMiddleware, Controller.getAll);
router.get('/scheme', (0, EndPointsActions_1.EndPointsActions)(EndPointsActionsEnum_1.EndPointsActionsEnum.SELECT), authMiddlewares_1.authMiddleware, Controller.getScheme);
router.patch('/', (0, EndPointsActions_1.EndPointsActions)(EndPointsActionsEnum_1.EndPointsActionsEnum.UPDATE), authMiddlewares_1.authMiddleware, upload.none(), Controller.update);
router.post('/', (0, EndPointsActions_1.EndPointsActions)(EndPointsActionsEnum_1.EndPointsActionsEnum.ADD), authMiddlewares_1.authMiddleware, upload.none(), Controller.add);
router.post("/rule-position", Controller.addPostitonRule);
// // Get a department by ID
// router.get('/:id',cont.getById);
// // Update a department
// router.put('/:id', upload.none(), cont.update);
// // Delete a department
// router.delete('/:id',);
exports.default = router;
//# sourceMappingURL=position.js.map