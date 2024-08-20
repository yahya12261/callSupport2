import { Router } from "express";
import multer from "multer";
import { GovernmentService } from "../../app/services/Locations/GovernmentService";
import { Government } from "../../app/models/entities/Location/Government";
import GovernmentController from "../../app/controllers/Locations/GovernmentController";
import { EndPointsActions } from "../../middlewares/EndPointsActions";
import { EndPointsActionsEnum } from "../../app/enum/EndPointsActionsEnum";
import { authMiddleware } from "../../middlewares/authMiddlewares";

const router = Router();
const upload = multer();
const Service: GovernmentService = new GovernmentService(Government);
const Controller = new GovernmentController();

router.get('/',EndPointsActions(EndPointsActionsEnum.SELECT), authMiddleware, Controller.getAll);

router.post('/',EndPointsActions(EndPointsActionsEnum.ADD),authMiddleware, upload.none(), Controller.add);

router.patch('/',EndPointsActions(EndPointsActionsEnum.UPDATE),authMiddleware, upload.none(), Controller.update);

router.get('/selectOption',EndPointsActions(EndPointsActionsEnum.SELECT), authMiddleware, Controller.getSelectOption);

export default router;