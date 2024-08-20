
import { Government } from "../../models/entities/Location/Government";
import { IGovernment } from "../../models/Locations/Government";
import BaseService from "../BaseService";
class GovernmentService extends BaseService<Government, IGovernment> {
  protected getEntityClass(): typeof Government {
    return Government;
  }
}
export { GovernmentService };
