import { Router } from 'express';
import multer from 'multer';
import UserController from '../app/controllers/UserController';
import {app} from '../app';
import { EndPoints } from '../middlewares/EndPoints';
const router = Router();
const upload = multer();

// Get all users
// router.get('/', UserController.listAll);
router.post('/', upload.none(), UserController.create);

router.post('/login', upload.none(), UserController.login);

router.post('/loginByOTP', upload.none(), UserController.loginByOTP);

router.post('/resetRules',upload.none(),UserController.resetUserRules);

router.post('/addRule',upload.none(),UserController.addUserRule);

export default router;