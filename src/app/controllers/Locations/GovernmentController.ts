import { EntityType } from "../../enum/EntityType";
import { FieldTypes } from "../../enum/FieldTypes";
import { TypeormOptions } from "../../interface/TypeormOptions";
import { Government } from "../../models/entities/Location/Government";
import { IGovernment } from "../../models/Locations/Government";
import { GovernmentService } from "../../services/Locations/GovernmentService";
import { BaseController } from "../BaseController";

const service =  new GovernmentService(Government);
class GovernmentController extends BaseController<Government,IGovernment,GovernmentService>{
  option: TypeormOptions = {
    relations: {
    },
    join: {
      alias: 'government',
      innerJoinAndSelect: {
        createdBy:'government.createdBy',
        modifiedBy:'government.modifiedBy',
        deletedBy:'government.deletedBy',
      },
    },
  };
  entity: EntityType = EntityType.GOVERNMENT;
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

export default GovernmentController;
