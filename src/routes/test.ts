import { Router } from 'express';
import UserController from '../app/controllers/UserController';
import TestController from '../app/controllers/TestyController';
import { EndPoints } from '../middlewares/EndPoints';

const router = Router();
router.post('/', TestController.addNew);

const allRoutes = EndPoints.getAllRoutes("v1/test",router);
router.get('/sync',EndPoints.generateRule);
export default router;