import { Router } from "express";
import multer from "multer";
import { EndPointsActions } from "../../middlewares/EndPointsActions";
import { EndPointsActionsEnum } from "../../app/enum/EndPointsActionsEnum";
import { authMiddleware } from "../../middlewares/authMiddlewares";
import { CazaService } from "../../app/services/Locations/CazaService";
import { Caza } from "../../app/models/entities/Location/Caza";
import CazaController from "../../app/controllers/Locations/CazaController";

const router = Router();
const upload = multer();
const Service: CazaService = new CazaService(Caza);
const Controller = new CazaController();

router.get('/',EndPointsActions(EndPointsActionsEnum.SELECT), authMiddleware, Controller.getAll);

router.get('/selectOption/:govId',EndPointsActions(EndPointsActionsEnum.SELECT), authMiddleware, Controller.getSelectOptionByGovernmentId);

router.post('/',EndPointsActions(EndPointsActionsEnum.ADD),authMiddleware, upload.none(), Controller.add);

router.patch('/',EndPointsActions(EndPointsActionsEnum.UPDATE),authMiddleware, upload.none(), Controller.update);

router.get('/selectOption',EndPointsActions(EndPointsActionsEnum.SELECT), authMiddleware, Controller.getSelectOption);

export default router;