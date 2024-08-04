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

router.patch('/',EndPointsActions(EndPointsActionsEnum.UPDATE),authMiddleware, upload.none(), Controller.update);

router.post('/',EndPointsActions(EndPointsActionsEnum.ADD),authMiddleware, upload.none(), Controller.add);

router.post("/rule-position",Controller.addPostitonRule);
// // Get a department by ID
// router.get('/:id',cont.getById);

// // Update a department
// router.put('/:id', upload.none(), cont.update);

// // Delete a department
// router.delete('/:id',);

export default router;