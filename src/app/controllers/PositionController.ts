
import { PositionService } from "../services/PositionService";
import { BaseController } from "./BaseController";
import { Position } from "../models/entities/Position";
import { IPosition } from "../models/Position";
import { EntityType } from "../enum/EntityType";
import { TypeormOptions } from "../interface/TypeormOptions";
import { Request, Response } from "express";
import Template from "../global/response";
import APIError from "../global/response/apierror";
import { ServerException } from "../../lib/custom-errors";
import { SearchFields } from "../interface/SearchFields";
import { FieldTypes } from "../enum/FieldTypes";
const service = new PositionService(Position);
class PositionController extends BaseController<Position,IPosition,PositionService>{

  option: TypeormOptions = {
    relations:[EntityType.DEPARTMENT,"createdBy"]
  };
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
  entity: EntityType = EntityType.POSITION;
  public addPostitonRule = (req: Request, res: Response, next: any) => {
    this.service
      .addPositionRule(Number(req.body.rule.id), Number(req.body.position.id))
      .then((done) => {
        if (done) {
          res.json(Template.success(null, "Rule Position added succesfully"));
        } else {
          res.json(Template.error(null, "Rule Position added succesfully", ""));
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.ErrorID == 2110) {
          next(new APIError(err.message, err.ErrorID));
        }
        next(new ServerException("error occurred"));
      });
  };

}

export default PositionController;
