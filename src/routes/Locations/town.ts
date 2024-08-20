import { Router } from "express";
import multer from "multer";
import { EndPointsActions } from "../../middlewares/EndPointsActions";
import { EndPointsActionsEnum } from "../../app/enum/EndPointsActionsEnum";
import { authMiddleware } from "../../middlewares/authMiddlewares";
import { TownService } from "../../app/services/Locations/TownService";
import { Town } from "../../app/models/entities/Location/Town";
import TownController from "../../app/controllers/Locations/TownController";

const router = Router();
const upload = multer();
const Service: TownService = new TownService(Town);
const Controller = new TownController();

router.get('/',EndPointsActions(EndPointsActionsEnum.SELECT), authMiddleware, Controller.getAll);

router.post('/',EndPointsActions(EndPointsActionsEnum.ADD),authMiddleware, upload.none(), Controller.add);

router.patch('/',EndPointsActions(EndPointsActionsEnum.UPDATE),authMiddleware, upload.none(), Controller.update);

router.get('/selectOption',EndPointsActions(EndPointsActionsEnum.SELECT), authMiddleware, Controller.getSelectOption);

export default router;