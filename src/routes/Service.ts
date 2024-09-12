import { Router } from "express";

import { ServiceService } from "../app/services/ServiceService";
import multer from "multer";
import ServiceController from "../app/controllers/ServiceController";
import { Service } from "../app/models/entities/Service";
import { EndPointsActions } from "../middlewares/EndPointsActions";
import { EndPointsActionsEnum } from "../app/enum/EndPointsActionsEnum";
import { authMiddleware } from "../middlewares/authMiddlewares";

const router = Router();
const upload = multer();
const service: ServiceService = new ServiceService(Service);
const Controller = new ServiceController();

router.get('/',EndPointsActions(EndPointsActionsEnum.SELECT), authMiddleware, Controller.getAll);

router.post('/',EndPointsActions(EndPointsActionsEnum.ADD),authMiddleware, upload.none(), Controller.add);

router.patch('/',EndPointsActions(EndPointsActionsEnum.UPDATE),authMiddleware, upload.none(), Controller.update);

router.get('/selectOption',EndPointsActions(EndPointsActionsEnum.SELECT), authMiddleware, Controller.getSelectOption);

export default router;