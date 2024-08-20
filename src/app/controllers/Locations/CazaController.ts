import { EntityType } from "../../enum/EntityType";
import { FieldTypes } from "../../enum/FieldTypes";
import { TypeormOptions } from "../../interface/TypeormOptions";
import { Caza } from "../../models/entities/Location/Caza";
import { ICaza } from "../../models/Locations/Caza";
import { CazaService } from "../../services/Locations/CazaService";
import { BaseController } from "../BaseController";

const service = new CazaService(Caza);
class CazaController extends BaseController<Caza,ICaza,CazaService>{
  option: TypeormOptions = {
    relations: {
    },
    join: {
      alias: 'caza',
      innerJoinAndSelect: {
        createdBy:'caza.createdBy',
        modifiedBy:'caza.modifiedBy',
        deletedBy:'caza.deletedBy',
        government:'caza.government'
      },
    },
  };
  entity: EntityType = EntityType.CAZA;
  constructor() {
    super(service,
      [
        {
          name: 'name',
          type: FieldTypes.TEXT
        },
        {
            name: 'government.id',
            type: FieldTypes.NUMBER
          },
      ],
    );
  }
}

export default CazaController;
