"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const DepartmentService_1 = require("../app/services/DepartmentService");
const Department_1 = require("../app/models/entities/Department");
const DepartmentController_1 = __importDefault(require("../app/controllers/DepartmentController"));
const router = (0, express_1.Router)();
const upload = (0, multer_1.default)();
const Service = new DepartmentService_1.DepartmentService(Department_1.Department);
const Controller = new DepartmentController_1.default(Service);
router.get('/', Controller.getAll);
router.post('/', upload.none(), Controller.add);
// // Get a department by ID
// router.get('/:id',cont.getById);
// // Update a department
// router.put('/:id', upload.none(), cont.update);
// // Delete a department
// router.delete('/:id',);
exports.default = router;
//# sourceMappingURL=department.js.map