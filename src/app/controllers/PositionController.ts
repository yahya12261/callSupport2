
import { PositionService } from "../services/PositionService";
import { BaseController } from "./BaseController";
import { Position } from "../models/entities/Position";
import { IPosition } from "../models/Position";
import { EntityType } from "../models/type/EntityType";
import { TypeormOptions } from "../models/TypeormOptions";
class PositionController extends BaseController<Position,IPosition,PositionService>{
  option: TypeormOptions = {
    relations:[EntityType.DEPARTMENT,"createdBy"]
  } ;
  entity: EntityType = EntityType.POSITION;


}

export default PositionController;
