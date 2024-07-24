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
const EndPoints_1 = require("../middlewares/EndPoints");
const router = (0, express_1.Router)();
const upload = (0, multer_1.default)();
const Service = new PositionService_1.PositionService(Position_1.Position);
const Controller = new PositionController_1.default(Service);
router.get('/', Controller.getAll);
router.post('/', upload.none(), Controller.add);
router.post("/rule-position", Controller.addPostitonRule);
// // Get a department by ID
// router.get('/:id',cont.getById);
// // Update a department
// router.put('/:id', upload.none(), cont.update);
// // Delete a department
// router.delete('/:id',);
const allRoutes = EndPoints_1.EndPoints.getAllRoutes("v1/rule", router);
router.get('/sync', EndPoints_1.EndPoints.generateRule);
exports.default = router;
//# sourceMappingURL=position.js.map