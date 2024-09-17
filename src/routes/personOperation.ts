import { Router } from 'express';
import PersonController from '../app/controllers/PersonController';
import multer from 'multer';
import { PersonOperationService } from '../app/services/personOperationService';
import { PersonOperation } from '../app/models/entities/personOperation';
import PersonOperationController from '../app/controllers/PersonOperationController';
import { EndPointsActionsEnum } from '../app/enum/EndPointsActionsEnum';
import { authMiddleware } from '../middlewares/authMiddlewares';
import { EndPointsActions } from '../middlewares/EndPointsActions';
const router = Router();
const upload = multer();
const Service: PersonOperationService = new PersonOperationService(PersonOperation);
const Controller = new PersonOperationController();

router.get('/',EndPointsActions(EndPointsActionsEnum.SELECT), authMiddleware, Controller.getAll);

router.post('/',EndPointsActions(EndPointsActionsEnum.ADD),authMiddleware, upload.none(), Controller.add);

router.patch('/change-status',EndPointsActions(EndPointsActionsEnum.UPDATE),authMiddleware, upload.none(), Controller.changeStatus);

router.patch('/change-assign',EndPointsActions(EndPointsActionsEnum.UPDATE),authMiddleware, upload.none(), Controller.changeAssign);

router.get('/selectOption',EndPointsActions(EndPointsActionsEnum.SELECT), authMiddleware, Controller.getSelectOption);

export default router;