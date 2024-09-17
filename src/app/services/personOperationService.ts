import { getRepository } from "typeorm";
import { PersonOperation } from "../models/entities/personOperation";
import { User } from "../models/entities/User";
import { IPersonOperation } from "../models/PersonOperation";
import BaseService from "./BaseService";
import APIError from "../global/response/apierror";
import Err from "../global/response/errorcode";
import { StatusService } from "./Status/StatusService";
import { Status } from "../models/entities/Statuses/Status";
import StatusController from "../controllers/Status/StatusController";
import { PositionService } from "./PositionService";
import { Position } from "../models/entities/Position";
import { UserService } from "./UserService";
import StatusFlowController from "../controllers/Status/StatusFlowContoller";
import { StatusFlow } from "../models/entities/Statuses/StatusFlow";

class PersonOperationService extends BaseService<
  PersonOperation,
  IPersonOperation
> {
  protected getEntityClass(): typeof PersonOperation {
    return PersonOperation;
  }
  async changeAssign(OperationId:number,userId:number):Promise<void> {
    const userRepository = getRepository(User);
    const repository = this.getRepository();
    try {
      const operation = await repository.findOne(OperationId);
      const user = await userRepository.findOne(userId);
      if (!operation || !user) {
        return Promise.reject(new APIError("خطأ في الطلب", Err.UndefinedCode));
      }
      if (operation.assignTo.id === user.id) {
        return Promise.reject(
          new APIError("هو متابع هذه الحالة بالفعل", Err.UndefinedCode)
        );
      }
      operation.assignTo = user;
      await repository.save(operation);  
    } catch (err) {
      return Promise.reject(
        new APIError("خطأ" + err, Err.UndefinedCode)
      );
    }
    


  }
  
  async changeStatus(operation: IPersonOperation, position: Position, statusId: number): Promise<void> {
    const repository = this.getRepository(); 
    const flowRepository = getRepository(StatusFlow);

    try {
        if (operation && statusId) {
            // Fetch the flow along with its next statuses
            const flow = await flowRepository.createQueryBuilder('flow')
                .leftJoinAndSelect('flow.service', 'service')
                .leftJoinAndSelect('flow.refStatus', 'refStatus')
                .leftJoinAndSelect('flow.position', 'position')
                .leftJoinAndSelect('flow.nextStatuses', 'nextStatuses') // Join next statuses
                .where('service.id = :serviceId', { serviceId: operation.service.id })
                .andWhere('refStatus.id = :refStatusId', { refStatusId: operation.status.id })
                .andWhere('position.id = :positionId', { positionId: position.id })
                .getOne();

            // Check if flow exists
            if (!flow) {
                return Promise.reject(
                    new APIError("ليس لديك صلاحية", Err.UndefinedCode)
                );
            }
            console.log(flow.nextStatuses);
            console.log(`Checking next status with nextStatusId: ${flow.id} and statusId: ${statusId}`);

            // Check if the next status exists in the flow's next statuses
            const nextStatusExists = flow.nextStatuses.some(nextStatus => nextStatus.id === Number(statusId));

            if (!nextStatusExists) {
                return Promise.reject(
                    new APIError("ليس لديك صلاحية", Err.UndefinedCode)
                );
            }

            // Update the operation's status
            operation.status.id = statusId;
            await repository.save(operation);
        }
    } catch (err) {
        console.error("Error fetching next status:", err); // Enhanced logging
        return Promise.reject(
            new APIError("خطأ: ", Err.UndefinedCode)
        );
    }
}

}

export { PersonOperationService };
