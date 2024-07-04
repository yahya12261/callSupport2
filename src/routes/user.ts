import { Router } from 'express';
import multer from 'multer';
import UserController from '../app/controllers/UserController';

const router = Router();
const upload = multer();

// Get all users
// router.get('/', UserController.listAll);
router.post('/', upload.none(), UserController.create);

export default router;