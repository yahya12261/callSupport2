import { Status } from "../../models/entities/Statuses/Status";
import { IStatus } from "../../models/Status";
import BaseService from "../BaseService";

class StatusService extends BaseService<Status,IStatus> {
    protected getEntityClass(): typeof Status {
      return Status;
    }
  }
  export { StatusService };
    