
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
import bodyParser from 'body-parser';
import { error } from 'console';
import { QueryOperator } from '../enum/WhereOperations';
import { ResponseElement } from '../interface/ResponseElement';
const service = new UserService(User);
const ruleService = new RuleService(Rule);
const ruleController = new RuleController();

class UserController extends BaseController<User, IUser, UserService> {
  option: TypeormOptions = {
    relations: {
      // position: true,
      // "position.department":true
    },
    join: {
      alias: "user",
      innerJoinAndSelect: {
        position: "user.position",
        department: "position.department",
        createdBy: "user.createdBy",
        modifiedBy: "user.modifiedBy",
        deletedBy: "user.deletedBy",
      },
    },
  };
  entity: EntityType = EntityType.USER;
  constructor() {
    super(service, [
      {
        name: "first",
        type: FieldTypes.TEXT,
      },
      {
        name: "middle",
        type: FieldTypes.TEXT,
      },
      {
        name: "last",
        type: FieldTypes.TEXT,
      },
      {
        name: "email",
        type: FieldTypes.TEXT,
      },
      {
        name: "username",
        type: FieldTypes.TEXT,
      },
      {
        name: "lastLogin",
        type: FieldTypes.TEXT,
      },
      {
        name: "position.id",
        type: FieldTypes.NUMBER,
      },
      {
        name: "phoneNumber",
        type: FieldTypes.TEXT,
      },
      {
        name: "department.id",
        type: FieldTypes.NUMBER,
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
    ]);
  }
  public static create = (req: CustomeRequest, res: Response, next: any) => {
    if (Object.is(req.Action, EndPointsActionsEnum.ADD))
      req.body.createdBy = User.getUserJson(req.createdUser as User);
    else if (Object.is(req.Action, EndPointsActionsEnum.UPDATE))
      req.body.modifiedBy = User.getUserJson(req.updatedUser as User);
    else if (Object.is(req.Action, EndPointsActionsEnum.DELETE))
      req.body.deletedBy = User.getUserJson(req.deletedUser as User);
    this.buildUserNameAndPassword(req.body);
    service.checkUserExists(req.body).then((bol: boolean) => {
      if (bol === true) {
        res.json(Template.userAlreadyExist());
      }

      service
        .add(req.body)
        .then((user) => {
          // console.log(req.body)
          if (user) {
            // //create rules
            // ruleController.generateUserRulesByPosition(user.id);
            // console.log(user)
            res.json(
              Template.success(
                this.getVisibleUserData(user),
                "Users saved succesfully"
              )
            );
          }
        })
        .catch((err) => {
          console.log(err);
          if (err.ErrorID == 2110) {
            next(new APIError(err.message, err.ErrorID));
          }
          next(new ServerException("error occured"));
        });
    });
  };
  public static login = (req: Request, res: Response, next: any) => {
    service
      .login(req.body, true)
      .then((user) => {
        if (user) {
          res.json(
            Template.success(
              this.getVisibleUserData(user),
              " تم إرسال رمز للمرة الواحدة عبر البريد الألكتروني "
            )
          );
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.ErrorID == 2110) {
          next(new APIError(err.message, err.ErrorID));
        }
        if (err.ErrorID == 5200) {
          next(new APIError(err.message, err.ErrorID));
        }
        next(new APIError(err.message, err.ErrorID));
      });
  };
  public static loginByOTP = (req: Request, res: Response, next: any) => {
    service
      .loginByOTP(req.body)
      .then((data) => {
        if (data.JWT) {
          res.json(Template.success(data, "تم التسجيل بنجاح"));
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.ErrorID == 2110) {
          next(new APIError(err.message, err.ErrorID));
        }
        next(new ServerException("error occured"));
      });
  };
  private static getVisibleUserData(user: User) {
    return {
      uuid: user.uuid,
    };
  }
  public static resetUserRules = (req: Request, res: Response, next: any) => {
    const userId = req.body.id;
    service
      .resetUserRules(Number(userId))
      .then(() => {
        res.json(Template.success("", "rules reset done."));
      })
      .catch((err) => {
        console.log(err);
        if (err.ErrorID == 2110) {
          next(new APIError(err.message, err.ErrorID));
        }
        next(new ServerException("error occured"));
      });
  };
  //old method
  // public static addUserRule =  (req: Request, res: Response, next: any) => {

  //   const userId = req.body.userId ;
  //   const ruleId = req.body.ruleId ;
  //   service.addUserRule(Number(userId),Number(ruleId)).then(()=>{
  //     res.json(Template.success("", 'rule added.'));
  //   }).catch(err => {
  //       next(new APIError(err.message, err.ErrorID));

  //   })
  // }
  public getAll = (req: Request, res: Response, next: any) => {
    this.reqElm.page = Number(req.query.page);
    this.reqElm.pageSize = Number(req.query.pageSize);
    this.reqElm.orderBy = req.query.orderBy
      ? String(req.query.orderBy)
      : "createdAt";
    this.reqElm.order = req.query.order
      ? validateOrderOperation(String(req.query.order))
      : "DESC";
    this.reqElm.relations = this.option.relations;
    this.fillSearchableFieldFromRequest(req);
    this.reqElm.search = this.searchFields;
    this.reqElm.join = this.option.join;
    this.service
      .getAll(this.reqElm)
      .then(({ result }) => {
        if (result) {
          this.serializeFields(result.data);
          this.removeField(result.data, "password");
          this.removeField(result.data, "OTP");
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
  };
  private static buildUserNameAndPassword(user: IUser) {
    if (user && user.first && user.middle && user.last && user.phoneNumber) {
      user.username = `${(user.last + "").toLocaleUpperCase()}${
        user.first + ""
      }${(user.phoneNumber + "").substring(3, 5)}`;
      user.password = `${(user.last + "").toLocaleUpperCase()}${
        user.first + ""
      }${(user.phoneNumber + "").substring(3, 5)}${Math.floor(
        1000 + Math.random() * 9000
      ).toString()}`;
      console.log("user:", user.username);
      console.log("password:", user.password);
    }
  }
  public static changePassword = (
    req: CustomeRequest,
    res: Response,
    next: any
  ) => {
    const userChanged = req.body as IUser;
    if (req.updatedUser && userChanged.password === userChanged.password2) {
      userChanged.id = req.updatedUser.id;
      service.changePassword(userChanged).then(
        (bol) => {
          if (bol) {
            res.json(Template.success("", "تم تغيير كلمة السر بنجاح"));
          } else {
            next(new APIError("خطأ", 0));
          }
        },
        (error) => {
          next(new APIError(error, 0));
        }
      );
    } else {
      next(new APIError("كلمة السر غير متطابقة", 0));
    }
  };
  public static activeDeactivateChangePassword = (
    req: Request,
    res: Response,
    next: any
  ) => {
    const user = req.body as IUser;
    if (!user || !user.uuid) {
      next(new APIError("عنوان غير صحيح", 0));
    }
    //console.log(user.uuid);
    service.activeDeactivateChangePassword(user.uuid).then(
      () => {
        res.json(Template.success("تمت العملية بنجاح", ""));
      },
      (error) => {
        next(new APIError(error.message, 0));
      }
    );
  };
  public static activeDeactivate = (req: Request, res: Response, next: any) => {
    const user = req.body as IUser;
    if (!user || !user.uuid) {
      next(new APIError("عنوان غير صحيح", 0));
    }
    //console.log(user.uuid);
    service.activeDeactivate(user.uuid).then(
      () => {
        res.json(Template.success("تمت العملية بنجاح", ""));
      },
      (error) => {
        next(new APIError(error.message, 0));
      }
    );
  };

  public getUserRules = (req: Request, res: Response, next: any) => {
    this.createGridOptions(req);
    const userId = req.params.id;
    this.reqElm.search?.push({
      name: "id",
      operation: QueryOperator.EQUAL,
      type: FieldTypes.NUMBER,
      value: Number(userId),
    });
    if (this.reqElm.join) {
      this.reqElm.join.innerJoinAndSelect = {
        ...this.reqElm.join.innerJoinAndSelect,
        rules: "user.rules",
      };
    }
    this.service
      .getAll(this.reqElm)
      .then(({ result }) => {
        if (result) {
          const rulesRes = {
            currentPage: result.currentPage,
            data: result.data[0].rules,
            pageSize: result.pageSize,
            total: result.total,
          } as ResponseElement<Rule>;
          this.serializeFields(result.data);
          this.searchFields = this.getDefaultSearchableFields();
          res.json(Template.success(rulesRes, ""));
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

  public addUserRule = (req: Request, res: Response, next: any) => {
    const pageId = req.body.userId;
    const apiId = req.body.ruleId;
    this.service
      .addUserRule(Number(pageId), Number(apiId))
      .then(() => {
        res.json(
          Template.success(
            "",
            this.entity + "  Rule added to User successfully"
          )
        );
      })
      .catch((err) => {
        console.log(err);
        if (err.ErrorID == 2110) {
          next(new APIError(err.message, err.ErrorID));
        }
        next(new APIError(err.message, err.ErrorID));
      });
  };

  public deleteUserRule = (req: Request, res: Response, next: any) => {
    const userId = req.body.userId;
    const apiId = req.body.ruleId;
    this.service
      .deleteUserRule(Number(userId), Number(apiId))
      .then(() => {
        res.json(
          Template.success(
            "",
            this.entity + " api deleted from User successfully"
          )
        );
      })
      .catch((err) => {
        console.log(err);
        if (err.ErrorID == 2110) {
          next(new APIError(err.message, err.ErrorID));
        }
        next(new APIError(err.message, err.ErrorID));
      });
  };

  public getPermissions = (req: CustomeRequest, res: Response, next: any) => {
    var rules: Rule[] = [];
    var x;
    if (!req.selectedUser || !req.selectedUser.uuid) {
      next(new APIError("طلب خاطئ", Err.MissingAuthToken));
    }
    if (req.selectedUser) {
      if (req.selectedUser.isAdmin) {
        ruleService.getRuleByType(EntityType.PAGE).then((r) => {
          res.json(Template.success(r, ""));
        }).catch((err)=>{
          next(new APIError(err.message, Err.MissingAuthToken));
        });
        //console.log(rules)
        //res.json(Template.success(rules, ""));
      } else {
        if (req.selectedUser.rules) {
          rules = req.selectedUser.rules.filter(
            (rule) => rule.type === EntityType.PAGE
          );
          res.json(Template.success(rules, ""));
          //console.log("r",rules)
        } else if (!req.selectedUser.rules) {
          res.json(Template.success([], ""));
        } else {
          next(new APIError("طلب خاطئ", Err.MissingAuthToken));
        }
      }
    }
    // res.json(Template.success(rules, ""));
  };
}


export default UserController;
