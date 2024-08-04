import { Router } from 'express';
import multer from 'multer';
import { DepartmentService } from '../app/services/DepartmentService';
import { Department } from '../app/models/entities/Department';
import DepartmentController from '../app/controllers/DepartmentController';
import { EndPoints } from '../app/extra/EndPoints';
import { authMiddleware } from '../middlewares/authMiddlewares';
import { EndPointsActions } from '../middlewares/EndPointsActions';
import { EndPointsActionsEnum } from '../app/enum/EndPointsActionsEnum';
const router = Router();
const upload = multer();
const Service: DepartmentService = new DepartmentService(Department);
const Controller = new DepartmentController();

router.get('/',EndPointsActions(EndPointsActionsEnum.SELECT), authMiddleware, Controller.getAll);

router.post('/',EndPointsActions(EndPointsActionsEnum.ADD),authMiddleware, upload.none(), Controller.add);

router.patch('/',EndPointsActions(EndPointsActionsEnum.UPDATE),authMiddleware, upload.none(), Controller.update);

router.get('/selectOption',EndPointsActions(EndPointsActionsEnum.SELECT), authMiddleware, Controller.getSelectOption);

export default router;