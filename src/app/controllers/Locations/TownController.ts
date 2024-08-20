import { EntityType } from "../../enum/EntityType";
import { FieldTypes } from "../../enum/FieldTypes";
import { TypeormOptions } from "../../interface/TypeormOptions";
import { Town } from "../../models/entities/Location/Town";
import { ITown } from "../../models/Locations/Town";
import { TownService } from "../../services/Locations/TownService";
import { BaseController } from "../BaseController";

const service = new TownService(Town);
class TownController extends BaseController<Town,ITown,TownService>{
  option: TypeormOptions = {
    relations: {
    },
    join: {
      alias: 'town',
      innerJoinAndSelect: {
        createdBy:'town.createdBy',
        modifiedBy:'town.modifiedBy',
        deletedBy:'town.deletedBy',
        caza:'town.caza',
        government:'caza.government'
      },
    },
  };
  entity: EntityType = EntityType.TOWN;
  constructor() {
    super(service,
      [
        {
          name: 'name',
          type: FieldTypes.TEXT
        },
        {
            name: 'caza.id',
            type: FieldTypes.NUMBER
        },
        {
            name: 'caza.government.id',
            type: FieldTypes.NUMBER
        },
      ],
    );
  }
}

export default TownController;
