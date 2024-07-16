
import { Position } from "../models/entities/Position";
import { IPosition } from "../models/Position";
import { Department } from "../models/entities/Department";
import BaseService from "./BaseService";
class PositionService extends BaseService<Position,IPosition> {
  protected getEntityClass(): typeof Position {
    return Position;
  }
}
export { PositionService };