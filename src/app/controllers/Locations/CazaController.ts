import { Request, Response } from "express";
import { EntityType } from "../../enum/EntityType";
import { FieldTypes } from "../../enum/FieldTypes";
import { TypeormOptions } from "../../interface/TypeormOptions";
import { Caza } from "../../models/entities/Location/Caza";
import { ICaza } from "../../models/Locations/Caza";
import { CazaService } from "../../services/Locations/CazaService";
import { BaseController } from "../BaseController";
import APIError from "../../global/response/apierror";
import { ServerException } from "../../../lib/custom-errors";
import Template from "../../global/response";
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

  public getSelectOptionByGovernmentId = (req: Request, res: Response, next: any)=>{
    const governemntId = req.params.govId;
    this.service.getSelectOptionByGovernmentId(Number(governemntId)).then((result)=>{
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

export default CazaController;
