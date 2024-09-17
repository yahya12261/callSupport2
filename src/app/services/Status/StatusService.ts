import APIError from "../../global/response/apierror";
import Err from "../../global/response/errorcode";
import { Status } from "../../models/entities/Statuses/Status";
import { IStatus } from "../../models/Status";
import BaseService from "../BaseService";

class StatusService extends BaseService<Status,IStatus> {
    protected getEntityClass(): typeof Status {
      return Status;
    }
    async getOrCreateOpenStatusByName(): Promise<Status | null>{
      try {
        const status = await this.getRepository().findOne({
          where: {name:"NEW"}, 
        });
        if (status) {
          return status;
        } else {
          const newStatusObject =new Status();
          newStatusObject.name = "NEW"
          newStatusObject.arabicLabel = "جديد" 
          const newService = await this.getRepository().save(newStatusObject);
          return newService;
        }
      } catch (err) {
        console.log(err);
        return Promise.reject(
          new APIError("Failed to get Or Create New Service " + err, Err.UndefinedCode)
        );
      }
    }
  }
  export { StatusService };
    