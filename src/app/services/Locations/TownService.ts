
import { Town } from "../../models/entities/Location/Town";
import { ITown } from "../../models/Locations/Town";
import BaseService from "../BaseService";

class TownService extends BaseService<Town,ITown> {
  protected getEntityClass(): typeof Town {
    return Town;
  }
}
export { TownService };
