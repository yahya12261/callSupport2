import { Router } from 'express';
import UserController from '../app/controllers/UserController';
import TestController from '../app/controllers/TestyController';
import { EndPoints } from '../middlewares/EndPoints';
import { authMiddleware } from '../middlewares/authMiddlewares';

const router = Router();
router.post('/',authMiddleware, TestController.addNew);

export default router;