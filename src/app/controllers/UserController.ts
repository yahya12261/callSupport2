
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { UserService } from '../services/UserService';
import Template from '../global/response';
import { ServerException } from '../../lib/custom-errors';
import APIError from '../global/response/apierror';
import Err from '../global/response/errorcode';
import { User } from '../models/entities/User';
const service = new UserService();
class UserController {

  public static create = (req: Request, res: Response, next: any) => {
    service.checkUserExists(req.body).then((bol:boolean)=>{
      if(bol===true){
        res.json(Template.userAlreadyExist()); 
      }
  

    service.add(req.body).then(user => {
      console.log(req.body)
      if (user) {
        console.log(user)
        res.json(Template.success(this.getVisibleUserData(user), 'Users saved succesfully'));
      }
    }).catch(err => {
      console.log(err)
      if (err.ErrorID == 2110) {
        next(new APIError(err.message, err.ErrorID));
      }
      next(new ServerException('error occured'));
    })
  
})}


  public static login = (req: Request, res: Response, next: any) => {
    service.login(req.body,true).then(user=>{
        if(user){
         res.json(Template.success(this.getVisibleUserData(user), 'OTP Sent please check your email'));
        }
    }).catch(err => {
      console.log(err)
      if (err.ErrorID == 2110) {
        next(new APIError(err.message, err.ErrorID));
      }
      next(new ServerException('error occured'));
    })
}

public static loginByOTP = (req: Request, res: Response, next: any) => {
  service.loginByOTP(req.body).then(JWT=>{
      if(JWT){
       res.json(Template.success(JWT, 'login success'));
      }
  }).catch(err => {
    console.log(err)
    if (err.ErrorID == 2110) {
      next(new APIError(err.message, err.ErrorID));
    }
    next(new ServerException('error occured'));
  })
}
private static getVisibleUserData(user:User){
  return {
    uuid:user.uuid
  };
}
}


export default UserController;
