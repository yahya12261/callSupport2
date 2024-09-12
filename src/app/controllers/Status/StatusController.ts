import { EntityType } from "../../enum/EntityType";
import { FieldTypes } from "../../enum/FieldTypes";
import { TypeormOptions } from "../../interface/TypeormOptions";
import { Status } from "../../models/entities/Statuses/Status";
import { IStatus } from "../../models/Status";
import { StatusService } from "../../services/Status/StatusService";
import { BaseController } from "../BaseController";

const service =  new StatusService(Status);
class StatusController extends BaseController<Status,IStatus,StatusService>{
  option: TypeormOptions = {
    relations: {
    },
    join: {
      alias: 'status',
      innerJoinAndSelect: {
        createdBy:'status.createdBy',
        modifiedBy:'status.modifiedBy',
        deletedBy:'status.deletedBy',
        next:'status.next',
        refStatus:'next.refStatus'
      }, 
    },
  };
  entity: EntityType = EntityType.STATUS;
  constructor() {
    super(service,
      [
        {
          name: 'name',
          type: FieldTypes.TEXT
        },
      ],
    );
  }
}

export default StatusController;