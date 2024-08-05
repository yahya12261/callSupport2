
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
import { validateOrderOperation } from "../enum/OrderByOperation";
import { ResponseElement } from "../interface/ResponseElement";
import { Rule } from "../models/entities/Rule";
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
        {
          name: 'department.id',
          type: FieldTypes.NUMBER
        },
      ],
    );
  }
  entity: EntityType = EntityType.POSITION;
  public addPositionRule = (req: Request, res: Response, next: any) => {
    const positionId = req.body.positionId;
    const ruleId = req.body.ruleId;
    this.service.addPositionRule(Number(positionId),Number(ruleId)).then(() => {
        res.json(Template.success("", this.entity +  "  Page added succesfully"));
    })
    .catch((err) => {
      console.log(err);
      if (err.ErrorID == 2110) {
        next(new APIError(err.message, err.ErrorID));
      }
      next(new ServerException("error occurred"));
    });
  };
  public getPagesApis = (req: Request, res: Response, next: any) => {
    this.reqElm.page = Number(req.query.page);
    this.reqElm.pageSize = Number(req.query.pageSize);
    this.reqElm.orderBy = req.query.orderBy?String(req.query.orderBy):"createdAt";
    this.reqElm.order = req.query.order?validateOrderOperation(String(req.query.order)):"DESC";
    this.reqElm.relations = this.option.relations;
    const positionId = req.params.id;
    this.fillSearchableFieldFromRequest(req)
    this.reqElm.search = this.searchFields;
    this.service.getAllPositionRules(this.reqElm,Number(positionId)).then(({result})=>{
      if(result){
        const position = {currentPage:result.currentPage,pageSize:result.pageSize,total:result.total,data:result.data[0].rules } as ResponseElement<Rule> 
        this.serializeFields(result.data);
       this.searchFields = this.getDefaultSearchableFields();
        res.json(Template.success(position, ""));
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
  public deletePositionRule = (req: Request, res: Response, next: any) => {
    const positionId = req.body.positionId;
    const ruleId = req.body.ruleId;
    this.service.deletePositionRule(Number(positionId),Number(ruleId)).then(() => {
        res.json(Template.success("", this.entity +  " rule deleted from position successfully"));
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
