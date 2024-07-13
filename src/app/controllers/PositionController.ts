import { ServerException } from "../../lib/custom-errors";
import APIError from "../global/response/apierror";
import { TestyService } from "../services/TestyService";
import { UserService } from "../services/UserService";
import Template from "../global/response";
import { Request, Response } from "express";
import { DepartmentService } from "../services/DepartmentService";
import { PositionService } from "../services/PositionService";
const service = new PositionService();
class PositionController {

  public static add = (req: Request, res: Response, next: any) => {
    service
      .add(req.body)
      .then((object) => {
        if (object) {
          res.json(Template.success(object, "Department saved succesfully"));
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

  public static getAll = (req: Request, res: Response, next: any) => {
    service.getAll().then((object)=>{
      if(object){
        res.json(Template.success(object, ""));
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

export default PositionController;
