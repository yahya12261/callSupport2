"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const UserController_1 = __importDefault(require("../app/controllers/UserController"));
const router = (0, express_1.Router)();
const upload = (0, multer_1.default)();
// Get all users
// router.get('/', UserController.listAll);
router.post('/', upload.none(), UserController_1.default.create);
exports.default = router;
//# sourceMappingURL=user.js.map