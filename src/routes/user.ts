import { Router } from 'express';
import multer from 'multer';
import UserController from '../app/controllers/UserController';
import {app} from '../app';
import { EndPoints } from '../app/extra/EndPoints';
import { EndPointsActionsEnum } from '../app/enum/EndPointsActionsEnum';
import { authMiddleware } from '../middlewares/authMiddlewares';
import { EndPointsActions } from '../middlewares/EndPointsActions';
import { UserService } from '../app/services/UserService';
import { User } from '../app/models/entities/User';
const router = Router();
const upload = multer();
const Service: UserService = new UserService(User);
const Controller = new UserController();
// Get all users
router.get('/',EndPointsActions(EndPointsActionsEnum.SELECT), authMiddleware,Controller.getAll);

router.post('/', EndPointsActions(EndPointsActionsEnum.ADD),authMiddleware,upload.none(), UserController.create);

router.patch('/',EndPointsActions(EndPointsActionsEnum.UPDATE),authMiddleware, upload.none(), Controller.update);

router.post('/login', upload.none(), UserController.login);

router.post('/loginByOTP', upload.none(), UserController.loginByOTP);

router.post('/resetRules',upload.none(),UserController.resetUserRules);

router.post('/addRule',upload.none(),UserController.addUserRule);

export default router;