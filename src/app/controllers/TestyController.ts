import { ServerException } from "../../lib/custom-errors";
import APIError from "../global/response/apierror";
import { TestyService } from "../services/TestyService";
import { UserService } from "../services/UserService";
import Template from '../global/response';
import { Request, Response } from "express";
const service = new TestyService();
class TestController {
    public static addNew = (req: Request, res: Response, next: any) => {
        service.add(req.body).then(user => {
          if (user) {
            res.json(Template.success(user, 'Users saved succesfully'));
          }
        }).catch(err => {
          if (err.ErrorID == 2110) {
            next(new APIError(err.message, err.ErrorID));
          }
          next(new ServerException('error occured'));
        })
      }
    }
    
    export default TestController;