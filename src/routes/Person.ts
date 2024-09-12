import { Router } from 'express';
import multer from 'multer';
import { authMiddleware } from '../middlewares/authMiddlewares';
import { EndPointsActions } from '../middlewares/EndPointsActions';
import { EndPointsActionsEnum } from '../app/enum/EndPointsActionsEnum';
import { PersonService } from '../app/services/personService';
import { Person } from '../app/models/entities/Person';
import PersonController from '../app/controllers/PersonController';
const router = Router();
const upload = multer();
const Service: PersonService = new PersonService(Person);
const Controller = new PersonController();

router.get('/',EndPointsActions(EndPointsActionsEnum.SELECT), authMiddleware, Controller.getAll);

router.post('/',EndPointsActions(EndPointsActionsEnum.ADD),authMiddleware, upload.none(), Controller.add);

router.patch('/',EndPointsActions(EndPointsActionsEnum.UPDATE),authMiddleware, upload.none(), Controller.update);

router.get('/selectOption',EndPointsActions(EndPointsActionsEnum.SELECT), authMiddleware, Controller.getSelectOption);

export default router;