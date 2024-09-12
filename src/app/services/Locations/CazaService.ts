import { ICaza } from "../../models/Locations/Caza";
import { IDepartment } from "../../models/Department";
import { Caza } from "../../models/entities/Location/Caza";
import { Department } from "../../models/entities/Department";
import { Government } from "../../models/entities/Location/Government";
import { IGovernment } from "../../models/Locations/Government";
import BaseService from "../BaseService";
import APIError from "../../global/response/apierror";
import Err from "../../global/response/errorcode";

class CazaService extends BaseService<Caza,ICaza> {
  protected getEntityClass(): typeof Caza {
    return Caza;
  }

  async getSelectOptionByGovernmentId(governmentId:number): Promise<Caza[]> {
    try {
      const data = await this.getRepository().find({
        where: { isActive: true,government:{id:governmentId} },
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
export { CazaService };
