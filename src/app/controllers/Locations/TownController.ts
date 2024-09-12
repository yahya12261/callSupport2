import { Request, Response } from "express";
import { EntityType } from "../../enum/EntityType";
import { FieldTypes } from "../../enum/FieldTypes";
import { TypeormOptions } from "../../interface/TypeormOptions";
import { Town } from "../../models/entities/Location/Town";
import { ITown } from "../../models/Locations/Town";
import { TownService } from "../../services/Locations/TownService";
import { BaseController } from "../BaseController";
import Template from "../../global/response";
import APIError from "../../global/response/apierror";
import { ServerException } from "../../../lib/custom-errors";
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
            name: 'government.id',
            type: FieldTypes.NUMBER
        },
      ],
    );
  }
  public getSelectOptionByCazaId = (req: Request, res: Response, next: any)=>{
    const cazaId = req.params.cazaId;
    this.service.getSelectOptionByCazaId(Number(cazaId)).then((result)=>{
      if(result){
        res.json(Template.success(result, ""));
      }
    })
    .catch((err) => {
      console.log(err);
      if (err.ErrorID == 2110) {
        next(new APIError(err.message, err.ErrorID));
      }
      next(new ServerException("error occurred"));
    });
  }
}

export default TownController;
