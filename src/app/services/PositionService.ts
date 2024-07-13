import { getRepository } from "typeorm";
import APIError from "../global/response/apierror";
import Err from "../global/response/errorcode";
import { Position } from "../models/entities/Position";
import { IPosition } from "../models/Position";
import { IPositionRepository } from "../repository/PositionRepository";
import { Department } from "../models/entities/Department";
class PositionService implements IPositionRepository {
    async getAll(): Promise<Position[] | null> {
        const repository = getRepository(Position);
    try{
      const departments : [Position[], number] = await repository.findAndCount({relations: ['department'],});
      return departments[0];
    }catch (e) {
      console.log(e);
      return Promise.reject(new APIError('Department Already exists', Err.DuplicateRequest));
    }
    
      }
      async add(model: IPosition): Promise<Position | null> {
        const repository = getRepository(Position);
        try {
          const entity = new Position();
          entity.fillPositionFromModel(model);
          const saveEntity = await repository.save(entity);
          return saveEntity;
        } catch (e) {
          console.log(e);
          return Promise.reject(new APIError('Department Already exists', Err.DuplicateRequest));
        }
      }
    update(position: IPosition): Promise<Position | null> {
        throw new Error("Method not implemented.");
    }
    getById(id: number): Promise<Position | null> {
        throw new Error("Method not implemented.");
    }

}
export { PositionService };