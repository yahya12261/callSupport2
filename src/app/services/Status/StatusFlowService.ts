import { getRepository } from "typeorm";
import {  IStatusFlow } from "../../models/StatusFlow";
import {  StatusFlow } from "../../models/entities/Statuses/StatusFlow";
import { Status } from "../../models/entities/Statuses/Status";
import APIError from "../../global/response/apierror";
import Err from "../../global/response/errorcode";
import BaseService from "../BaseService";

class StatusFlowService extends BaseService<StatusFlow,IStatusFlow> {
  protected getEntityClass(): typeof StatusFlow {
    return StatusFlow;
  }

 static async addNextStatus(statusId: number, nextStatusId: number): Promise<void> {
    try {
      const existingRelation = await getRepository("next-status").findOne({
        where: { statusId, nextStatusId },
      });
      if (!existingRelation) {
        await getRepository("next-status").insert({nextStatusId ,statusId});
      }
    } catch (err) {
      return Promise.reject(new APIError("an error : " + err, Err.UndefinedCode));
    }
  }

  static async removeNextStatus( nextStatusId: number): Promise<void> {
    try {
        await getRepository("next-status").delete({nextStatusId});
 
    } catch (err) {
      return Promise.reject(new APIError("an error : " + err, Err.UndefinedCode));
    }
  }
}

export { StatusFlowService };