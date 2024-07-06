import { Router } from 'express';
import multer from 'multer';
import UserController from '../app/controllers/UserController';

const router = Router();
const upload = multer();

// Get all users
// router.get('/', UserController.listAll);
router.post('/', upload.none(), UserController.create);

router.post('/login', upload.none(), UserController.login);

router.post('/loginByOTP', upload.none(), UserController.loginByOTP);

export default router;