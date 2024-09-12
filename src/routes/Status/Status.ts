import { Router } from "express";
import multer from "multer";
import { StatusService } from "../../app/services/Status/StatusService";
import { Status } from "../../app/models/entities/Statuses/Status";
import StatusController from "../../app/controllers/Status/StatusController";
import { EndPointsActionsEnum } from "../../app/enum/EndPointsActionsEnum";
import { EndPointsActions } from "../../middlewares/EndPointsActions";
import { authMiddleware } from "../../middlewares/authMiddlewares";

const router = Router();
const upload = multer();
const Service: StatusService = new StatusService(Status);
const Controller = new StatusController();

router.get('/',EndPointsActions(EndPointsActionsEnum.SELECT), authMiddleware, Controller.getAll);

router.post('/',EndPointsActions(EndPointsActionsEnum.ADD),authMiddleware, upload.none(), Controller.add);

router.patch('/',EndPointsActions(EndPointsActionsEnum.UPDATE),authMiddleware, upload.none(), Controller.update);

router.get('/selectOption',EndPointsActions(EndPointsActionsEnum.SELECT), authMiddleware, Controller.getSelectOption);

export default router;