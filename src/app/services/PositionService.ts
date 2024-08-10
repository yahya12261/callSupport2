
import { Position } from "../models/entities/Position";
import { IPosition } from "../models/Position";
import { Department } from "../models/entities/Department";
import BaseService from "./BaseService";
import APIError from "../global/response/apierror";
import Err from "../global/response/errorcode";
import { getRepository, Repository } from "typeorm";
import { Rule } from "../models/entities/Rule";
import { RequestElement } from "../interface/RequestElement";
import { ResponseElement } from "../interface/ResponseElement";
class PositionService extends BaseService<Position,IPosition> {
  protected getEntityClass(): typeof Position {
    return Position;
  }

  // async addPositionRule(
  //   ruleId: number,
  //   positionId: number
  // ): Promise<boolean | null> {
  //   try {
  //     const repository = getRepository(Rule);
  //     const positionRepository = this.getRepository();
  //     const position = await positionRepository.findOne({
  //       where: { id: positionId },
  //       relations: ["rules"],
  //     });
  //     const rule = await repository.findOne({ id: ruleId });
  //     if (position && rule) {

  //       console.log(position.rules);


  //       if (!Array.isArray(position.rules)) {
  //         position.rules = [];
  //       }

  //       position.addRules(rule);

  //       await positionRepository.save(position);
  //       return true;
  //     } else {
  //       return false;
  //     }
  //   } catch (err) {
  //     console.error("Error adding position-rule association:", err);
  //     return Promise.reject(
  //       new APIError(
  //         "Error adding position-rule association",
  //         Err.InternalServerError
  //       )
  //     );
  //   }
  // }
  async addPositionRule(positionId: number, ruleId: number): Promise<void> {
    try {
      // Check if the (pageId, apiId) combination already exists in the rule_rules table
      const existingRelation = await getRepository("position_rule").findOne({
        where: { positionId, ruleId },
      });
  
      if (!existingRelation) {
        await getRepository("position_rule").insert({ positionId, ruleId });
      }
    } catch (err) {
      return Promise.reject(new APIError("an error : " + err, Err.UndefinedCode));
    }
  }
  async getAllPositionRules(
    requestElement: RequestElement,
    positionId: number
  ): Promise<{ result: ResponseElement<Position> }> {
    try {
      const repository: Repository<Position> = this.getRepository();
      requestElement.page = requestElement.page ? requestElement.page : 1;
      requestElement.pageSize = requestElement.pageSize ? requestElement.pageSize : 20;
      const order: Record<string, "ASC" | "DESC"> = this.buildOrder(requestElement);
      const whereConditions: Record<string, any> = {
        ...this.buildWhereConditions(requestElement),
        id: positionId,
      };
  
      const [data, total] = await repository.findAndCount({
        relations: ["rules"],
        where: whereConditions,
        skip: Math.abs((requestElement.page - 1) * requestElement.pageSize),
        take: requestElement.pageSize,
        order,
      });
  
      const result: ResponseElement<Position> = {
        data: data,
        currentPage: requestElement.page,
        total: total,
        pageSize: requestElement.pageSize,
      };
  
      return {
        result,
      };
    } catch (e) {
      console.error("Error fetching rules:", e);
      const result: ResponseElement<Position> = {
        data: [],
        currentPage: 0,
        total: 0,
        pageSize: requestElement.pageSize,
      };
      return {
        result,
      };
    }
  }
  async deletePositionRule(positionId: number, ruleId: number): Promise<void> {
    try {
        await getRepository("position_rule").delete({ positionId, ruleId });
    } catch (err) {
      return Promise.reject(new APIError("an error : " + err, Err.UndefinedCode));
    }
  }

}
export { PositionService };