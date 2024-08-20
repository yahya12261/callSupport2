import { ICaza } from "../../models/Locations/Caza";
import { IDepartment } from "../../models/Department";
import { Caza } from "../../models/entities/Location/Caza";
import { Department } from "../../models/entities/Department";
import { Government } from "../../models/entities/Location/Government";
import { IGovernment } from "../../models/Locations/Government";
import BaseService from "../BaseService";

class CazaService extends BaseService<Caza,ICaza> {
  protected getEntityClass(): typeof Caza {
    return Caza;
  }
}
export { CazaService };
