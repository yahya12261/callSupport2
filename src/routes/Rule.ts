import { Router } from 'express';
import multer from 'multer';
import RuleController from '../app/controllers/RuleController';
import { RuleService } from '../app/services/RuleService';
import { Rule } from '../app/models/entities/Rule';
import { EndPoints } from '../app/extra/EndPoints';
import { EndPointsActions } from '../middlewares/EndPointsActions';
import { EndPointsActionsEnum } from '../app/enum/EndPointsActionsEnum';
import { authMiddleware } from '../middlewares/authMiddlewares';
const router = Router();
const upload = multer();
const Service: RuleService = new RuleService(Rule);
const Controller = new RuleController();
// Get all departments
router.get('/',EndPointsActions(EndPointsActionsEnum.SELECT), authMiddleware,Controller.getAll);

router.get('/scheme',EndPointsActions(EndPointsActionsEnum.SELECT), authMiddleware,Controller.getScheme);

router.patch('/',EndPointsActions(EndPointsActionsEnum.UPDATE),authMiddleware, upload.none(), Controller.update);

router.post('/',EndPointsActions(EndPointsActionsEnum.ADD),authMiddleware, upload.none(), Controller.add);

router.get('/getPagesApis/:id',EndPointsActions(EndPointsActionsEnum.SELECT),authMiddleware, Controller.getPagesApis);

router.post('/addPageApi',EndPointsActions(EndPointsActionsEnum.OTHER),authMiddleware,upload.none(), Controller.addPageApi);

router.post('/deletePageApi',EndPointsActions(EndPointsActionsEnum.OTHER),authMiddleware,upload.none(), Controller.deletePageApi);

export default router;