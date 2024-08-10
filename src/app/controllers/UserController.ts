
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { UserService } from '../services/UserService';
import Template from '../global/response';
import { ServerException } from '../../lib/custom-errors';
import APIError from '../global/response/apierror';
import Err from '../global/response/errorcode';
import { User } from '../models/entities/User';
import { RuleService } from '../services/RuleService';
import RuleController from './RuleController';
import { Rule } from '../models/entities/Rule';
import { EndPointsActionsEnum } from '../enum/EndPointsActionsEnum';
import { CustomeRequest } from '../interface/CustomeRequest';
import { IUser } from '../models/User';
import { BaseController } from './BaseController';
import { EntityType } from '../enum/EntityType';
import { TypeormOptions } from '../interface/TypeormOptions';
import { FieldTypes } from '../enum/FieldTypes';
import { override } from 'core-decorators';
import { validateOrderOperation } from '../enum/OrderByOperation';
const service = new UserService(User);
const ruleService = new RuleService(Rule);
const ruleController = new RuleController();

class UserController extends BaseController<User, IUser, UserService>{
  option: TypeormOptions = {
    relations: {
      // position: true,
      // "position.department":true
    },
    join: {
      alias: 'user',
      innerJoinAndSelect: {
        position: 'user.position',
        department: 'position.department',
        createdBy:'user.createdBy',
        modifiedBy:'user.modifiedBy',
        deletedBy:'user.deletedBy',
      },
    },
  };
  entity: EntityType = EntityType.USER;

  constructor() {
      super(service,
        [
          {
            name: 'first',
            type: FieldTypes.TEXT
          },
          {
            name: 'middle',
            type: FieldTypes.TEXT
          },
          {
            name: 'last',
            type: FieldTypes.TEXT
          },
          {
            name: 'email',
            type: FieldTypes.TEXT
          },
          {
            name: 'username',
            type: FieldTypes.TEXT
          },
          {
            name: 'lastLogin',
            type: FieldTypes.TEXT
          },
          {
            name: 'position.id',
            type: FieldTypes.NUMBER
          },
          {
            name: 'phoneNumber',
            type: FieldTypes.TEXT
          },      
          {
            name: 'department.id',
            type: FieldTypes.NUMBER
          },
          // {
          //   queryConfig:{
          //     alias:"u",
          //     relations: ['position', 'department'],
          //     whereClause: 'department.id IN (:...whereValue)',
          //     whereValues: [],
          //     selectColumns: ['u.id']
          //   },
          //   name:"dep",
          //   type:FieldTypes.NUMBER
          // }
        ],
      );
    }

  public static create = (req: CustomeRequest, res: Response, next: any) => {

    
    if(Object.is(req.Action,EndPointsActionsEnum.ADD))
    req.body.createdBy = User.getUserJson(req.createdUser as User);
    else if(Object.is(req.Action,EndPointsActionsEnum.UPDATE))
      req.body.modifiedBy = User.getUserJson(req.updatedUser as User);
    else if(Object.is(req.Action,EndPointsActionsEnum.DELETE))
      req.body.deletedBy = User.getUserJson(req.deletedUser as User);
      this.buildUserName(req.body);
    service.checkUserExists(req.body).then((bol:boolean)=>{
      if(bol===true){
        res.json(Template.userAlreadyExist()); 
      }
  

    service.add(req.body).then(user => {
      // console.log(req.body)
      if (user) {
        // //create rules 
        // ruleController.generateUserRulesByPosition(user.id);
       // console.log(user)
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
         res.json(Template.success(this.getVisibleUserData(user), ' تم إرسال رمز للمرة الواحدة عبر البريد الألكتروني '));
        }
    }).catch(err => {
      console.log(err)
      if (err.ErrorID == 2110) {
        next(new APIError(err.message, err.ErrorID));
      }
      if(err.ErrorID ==5200){
        next(new APIError("اسم المستخدم أو كلمة المرور غير صحيحة", err.ErrorID));
      }
      next(new ServerException('خطأ'));
    })
}
public static loginByOTP = (req: Request, res: Response, next: any) => {
  service.loginByOTP(req.body).then(JWT=>{
      if(JWT){
       res.json(Template.success(JWT, 'تم التسجيل بنجاح'));
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

public static resetUserRules = (req: Request, res: Response, next: any) => {

  const userId =req.body.id; 
  service.resetUserRules(Number(userId)).then(()=>{
       res.json(Template.success("", 'rules reset done.'));      
  }).catch(err => {
    console.log(err)
    if (err.ErrorID == 2110) {
      next(new APIError(err.message, err.ErrorID));
    }
    next(new ServerException('error occured'));
  })
}

public static addUserRule =  (req: Request, res: Response, next: any) => {

  const userId = req.body.userId ;
  const ruleId = req.body.ruleId ;
  service.addUserRule(Number(userId),Number(ruleId)).then(()=>{
    res.json(Template.success("", 'rule added.')); 
  }).catch(err => {
      next(new APIError(err.message, err.ErrorID));

  })
}

  public getAll = (req: Request, res: Response, next: any) => {
  this.reqElm.page = Number(req.query.page);
  this.reqElm.pageSize = Number(req.query.pageSize);
  this.reqElm.orderBy = req.query.orderBy?String(req.query.orderBy):"createdAt";
  this.reqElm.order = req.query.order?validateOrderOperation(String(req.query.order)):"DESC";
  this.reqElm.relations = this.option.relations;
  this.fillSearchableFieldFromRequest(req)
  this.reqElm.search = this.searchFields;
  this.reqElm.join = this.option.join;
    this.service.getAll(this.reqElm).then(({result})=>{
      if(result){
        this.serializeFields(result.data);
        this.removeField(result.data,"password");
        this.removeField(result.data,"OTP");
        this.searchFields = this.getDefaultSearchableFields();
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
  private static buildUserName(user : IUser){
      if(user&&user.first&&user.middle&&user.last&&user.phoneNumber){
        user.username  = `${user.last+''?.toLocaleUpperCase()}${user.first+''.substring(0,2).toLocaleUpperCase()}${user.middle+''.substring(0,1).toLocaleUpperCase()}${user.phoneNumber+''.substring(3,5)}`
      }      
  }
}


export default UserController;
