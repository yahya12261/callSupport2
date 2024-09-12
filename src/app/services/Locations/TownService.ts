
import APIError from "../../global/response/apierror";
import Err from "../../global/response/errorcode";
import { Town } from "../../models/entities/Location/Town";
import { ITown } from "../../models/Locations/Town";
import BaseService from "../BaseService";

class TownService extends BaseService<Town,ITown> {
  protected getEntityClass(): typeof Town {
    return Town;
  }

  async getSelectOptionByCazaId(cazaId:number): Promise<Town[]> {
    try {
      const data = await this.getRepository().find({
        where: { isActive: true,caza:{id:cazaId} },
        select: ["id", "arabicLabel"],
      });
      return data;
    } catch (e) {
      console.error("Error fetching entities:", e);
      return Promise.reject(
        new APIError("cann't fetch data" + e, Err.UndefinedCode)
      );
    }
  }
}
export { TownService };
