
import { Position } from "../models/entities/Position";
import { IPosition } from "../models/Position";
import { Department } from "../models/entities/Department";
import BaseService from "./BaseService";
import APIError from "../global/response/apierror";
import Err from "../global/response/errorcode";
import { getRepository } from "typeorm";
import { Rule } from "../models/entities/Rule";
class PositionService extends BaseService<Position,IPosition> {
  protected getEntityClass(): typeof Position {
    return Position;
  }

  async addPositionRule(
    ruleId: number,
    positionId: number
  ): Promise<boolean | null> {
    try {
      const repository = getRepository(Rule);
      const positionRepository = this.getRepository();
      const position = await positionRepository.findOne({
        where: { id: positionId },
        relations: ["rules"],
      });
      const rule = await repository.findOne({ id: ruleId });
      if (position && rule) {

        console.log(position.rules);


        if (!Array.isArray(position.rules)) {
          position.rules = [];
        }

        position.addRules(rule);

        await positionRepository.save(position);
        return true;
      } else {
        return false;
      }
    } catch (err) {
      console.error("Error adding position-rule association:", err);
      return Promise.reject(
        new APIError(
          "Error adding position-rule association",
          Err.InternalServerError
        )
      );
    }
  }
}
export { PositionService };