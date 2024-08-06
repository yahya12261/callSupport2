"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const UserController_1 = __importDefault(require("../app/controllers/UserController"));
const EndPointsActionsEnum_1 = require("../app/enum/EndPointsActionsEnum");
const authMiddlewares_1 = require("../middlewares/authMiddlewares");
const EndPointsActions_1 = require("../middlewares/EndPointsActions");
const UserService_1 = require("../app/services/UserService");
const User_1 = require("../app/models/entities/User");
const router = (0, express_1.Router)();
const upload = (0, multer_1.default)();
const Service = new UserService_1.UserService(User_1.User);
const Controller = new UserController_1.default();
// Get all users
router.get('/', (0, EndPointsActions_1.EndPointsActions)(EndPointsActionsEnum_1.EndPointsActionsEnum.SELECT), authMiddlewares_1.authMiddleware, Controller.getAll);
router.post('/', (0, EndPointsActions_1.EndPointsActions)(EndPointsActionsEnum_1.EndPointsActionsEnum.ADD), authMiddlewares_1.authMiddleware, upload.none(), UserController_1.default.create);
router.patch('/', (0, EndPointsActions_1.EndPointsActions)(EndPointsActionsEnum_1.EndPointsActionsEnum.UPDATE), authMiddlewares_1.authMiddleware, upload.none(), Controller.update);
router.post('/login', upload.none(), UserController_1.default.login);
router.post('/loginByOTP', upload.none(), UserController_1.default.loginByOTP);
router.post('/resetRules', upload.none(), UserController_1.default.resetUserRules);
router.post('/addRule', upload.none(), UserController_1.default.addUserRule);
exports.default = router;
//# sourceMappingURL=user.js.map