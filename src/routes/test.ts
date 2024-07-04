import { Router } from 'express';
import UserController from '../app/controllers/UserController';
import TestController from '../app/controllers/TestyController';

const router = Router();
router.post('/', TestController.addNew);
export default router;