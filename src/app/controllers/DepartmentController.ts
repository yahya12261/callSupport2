import { ServerException } from "../../lib/custom-errors";
import APIError from "../global/response/apierror";
import { TestyService } from "../services/TestyService";
import { UserService } from "../services/UserService";
import Template from "../global/response";
import { Request, Response } from "express";
import { DepartmentService } from "../services/DepartmentService";
const service = new DepartmentService();
class DepartmentController {


  public static add = (req: Request, res: Response, next: any) => {
    service
      .add(req.body)
      .then((user) => {
        if (user) {
          res.json(Template.success(user, "Department saved succesfully"));
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
    service.getAll().then((deps)=>{
      if(deps){
        res.json(Template.success(deps, ""));
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

export default DepartmentController;
