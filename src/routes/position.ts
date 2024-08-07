import { Router } from 'express';
import multer from 'multer';
import PositionController from '../app/controllers/PositionController';
import { PositionService } from '../app/services/PositionService';
import { Position } from '../app/models/entities/Position';
import { EndPoints } from '../app/extra/EndPoints';
import { authMiddleware } from '../middlewares/authMiddlewares';
import { EndPointsActions } from '../middlewares/EndPointsActions';
import { EndPointsActionsEnum } from '../app/enum/EndPointsActionsEnum';

const router = Router();
const upload = multer();

const Service: PositionService = new PositionService(Position);
const Controller = new PositionController();


router.get('/',EndPointsActions(EndPointsActionsEnum.SELECT), authMiddleware,Controller.getAll);

router.get('/scheme',EndPointsActions(EndPointsActionsEnum.SELECT), authMiddleware,Controller.getScheme);

router.get('/positionRules/:id',EndPointsActions(EndPointsActionsEnum.SELECT), authMiddleware,Controller.getPagesApis);

router.patch('/',EndPointsActions(EndPointsActionsEnum.UPDATE),authMiddleware, upload.none(), Controller.update);

router.post('/',EndPointsActions(EndPointsActionsEnum.ADD),authMiddleware, upload.none(), Controller.add);

router.post("/rule-position",EndPointsActions(EndPointsActionsEnum.OTHER),authMiddleware, upload.none(),Controller.addPositionRule);

router.post('/delete_rule_position',EndPointsActions(EndPointsActionsEnum.OTHER),authMiddleware,upload.none(), Controller.deletePositionRule);

router.get('/selectOption',EndPointsActions(EndPointsActionsEnum.SELECT), authMiddleware, Controller.getSelectOption);

// // Get a department by ID
// router.get('/:id',cont.getById);

// // Update a department
// router.put('/:id', upload.none(), cont.update);

// // Delete a department
// router.delete('/:id',);

export default router;