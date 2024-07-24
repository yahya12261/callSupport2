"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const UserController_1 = __importDefault(require("../app/controllers/UserController"));
const EndPoints_1 = require("../middlewares/EndPoints");
const router = (0, express_1.Router)();
const upload = (0, multer_1.default)();
// Get all users
// router.get('/', UserController.listAll);
router.post('/', upload.none(), UserController_1.default.create);
router.post('/login', upload.none(), UserController_1.default.login);
router.post('/loginByOTP', upload.none(), UserController_1.default.loginByOTP);
router.post('/resetRules', upload.none(), UserController_1.default.resetUserRules);
router.post('/addRule', upload.none(), UserController_1.default.addUserRule);
const allRoutes = EndPoints_1.EndPoints.getAllRoutes("v1/rule", router);
router.get('/sync', EndPoints_1.EndPoints.generateRule);
exports.default = router;
//# sourceMappingURL=user.js.map