import { Router } from "express";
import multer from "multer";
import { EndPointsActionsEnum } from "../../app/enum/EndPointsActionsEnum";
import { EndPointsActions } from "../../middlewares/EndPointsActions";
import { authMiddleware } from "../../middlewares/authMiddlewares";
import NextStatusController from "../../app/controllers/Status/StatusFlowContoller";
import { StatusFlow } from "../../app/models/entities/Statuses/StatusFlow";
import { StatusFlowService } from "../../app/services/Status/StatusFlowService";

const router = Router();
const upload = multer();
const Service: StatusFlowService = new StatusFlowService(StatusFlow);
const Controller = new NextStatusController();

router.get('/',EndPointsActions(EndPointsActionsEnum.SELECT), authMiddleware, Controller.getAll);

router.get('/status/:statusId',EndPointsActions(EndPointsActionsEnum.SELECT), authMiddleware, Controller.getNextStatusesByStatusId);

router.post('/',EndPointsActions(EndPointsActionsEnum.ADD),authMiddleware, upload.none(), Controller.add);

router.patch('/',EndPointsActions(EndPointsActionsEnum.UPDATE),authMiddleware, upload.none(), Controller.update);

router.get('/selectOption',EndPointsActions(EndPointsActionsEnum.SELECT), authMiddleware, Controller.getSelectOption);

export default router;