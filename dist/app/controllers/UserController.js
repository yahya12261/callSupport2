"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const UserService_1 = require("../services/UserService");
const response_1 = __importDefault(require("../global/response"));
const custom_errors_1 = require("../../lib/custom-errors");
const apierror_1 = __importDefault(require("../global/response/apierror"));
const User_1 = require("../models/entities/User");
const RuleService_1 = require("../services/RuleService");
const RuleController_1 = __importDefault(require("./RuleController"));
const Rule_1 = require("../models/entities/Rule");
const EndPointsActionsEnum_1 = require("../enum/EndPointsActionsEnum");
const BaseController_1 = require("./BaseController");
const EntityType_1 = require("../enum/EntityType");
const FieldTypes_1 = require("../enum/FieldTypes");
const OrderByOperation_1 = require("../enum/OrderByOperation");
const service = new UserService_1.UserService(User_1.User);
const ruleService = new RuleService_1.RuleService(Rule_1.Rule);
const ruleController = new RuleController_1.default();
class UserController extends BaseController_1.BaseController {
    constructor() {
        super(service, [
            {
                name: 'first',
                type: FieldTypes_1.FieldTypes.TEXT
            },
            {
                name: 'middle',
                type: FieldTypes_1.FieldTypes.TEXT
            },
            {
                name: 'last',
                type: FieldTypes_1.FieldTypes.TEXT
            },
            {
                name: 'email',
                type: FieldTypes_1.FieldTypes.TEXT
            },
            {
                name: 'username',
                type: FieldTypes_1.FieldTypes.TEXT
            },
            {
                name: 'lastLogin',
                type: FieldTypes_1.FieldTypes.TEXT
            },
            {
                name: 'position.id',
                type: FieldTypes_1.FieldTypes.NUMBER
            },
            {
                name: 'phoneNumber',
                type: FieldTypes_1.FieldTypes.TEXT
            },
            {
                name: 'department.id',
                type: FieldTypes_1.FieldTypes.NUMBER
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
        this.option = {
            relations: {
            // position: true,
            // "position.department":true
            },
            join: {
                alias: 'user',
                innerJoinAndSelect: {
                    position: 'user.position',
                    department: 'position.department',
                    createdBy: 'user.createdBy',
                    modifiedBy: 'user.modifiedBy',
                    deletedBy: 'user.deletedBy',
                },
            },
        };
        this.entity = EntityType_1.EntityType.USER;
        this.getAll = (req, res, next) => {
            this.reqElm.page = Number(req.query.page);
            this.reqElm.pageSize = Number(req.query.pageSize);
            this.reqElm.orderBy = req.query.orderBy ? String(req.query.orderBy) : "createdAt";
            this.reqElm.order = req.query.order ? (0, OrderByOperation_1.validateOrderOperation)(String(req.query.order)) : "DESC";
            this.reqElm.relations = this.option.relations;
            this.fillSearchableFieldFromRequest(req);
            this.reqElm.search = this.searchFields;
            this.reqElm.join = this.option.join;
            this.service.getAll(this.reqElm).then(({ result }) => {
                if (result) {
                    this.serializeFields(result.data);
                    this.removeField(result.data, "password");
                    this.removeField(result.data, "OTP");
                    this.searchFields = this.getDefaultSearchableFields();
                    res.json(response_1.default.success(result, ""));
                }
            })
                .catch((err) => {
                console.log(err);
                if (err.ErrorID == 2110) {
                    next(new apierror_1.default(err.message, err.ErrorID));
                }
                next(new custom_errors_1.ServerException("error occurred"));
            });
        };
    }
    static getVisibleUserData(user) {
        return {
            uuid: user.uuid
        };
    }
    static buildUserName(user) {
        if (user && user.first && user.middle && user.last && user.phoneNumber) {
            user.username = `${user.last + ('' === null || '' === void 0 ? void 0 : ''.toLocaleUpperCase())}${user.first + ''.substring(0, 2).toLocaleUpperCase()}${user.middle + ''.substring(0, 1).toLocaleUpperCase()}${user.phoneNumber + ''.substring(3, 5)}`;
        }
    }
}
_a = UserController;
UserController.create = (req, res, next) => {
    if (Object.is(req.Action, EndPointsActionsEnum_1.EndPointsActionsEnum.ADD))
        req.body.createdBy = User_1.User.getUserJson(req.createdUser);
    else if (Object.is(req.Action, EndPointsActionsEnum_1.EndPointsActionsEnum.UPDATE))
        req.body.modifiedBy = User_1.User.getUserJson(req.updatedUser);
    else if (Object.is(req.Action, EndPointsActionsEnum_1.EndPointsActionsEnum.DELETE))
        req.body.deletedBy = User_1.User.getUserJson(req.deletedUser);
    _a.buildUserName(req.body);
    service.checkUserExists(req.body).then((bol) => {
        if (bol === true) {
            res.json(response_1.default.userAlreadyExist());
        }
        service.add(req.body).then(user => {
            // console.log(req.body)
            if (user) {
                // //create rules 
                // ruleController.generateUserRulesByPosition(user.id);
                // console.log(user)
                res.json(response_1.default.success(_a.getVisibleUserData(user), 'Users saved succesfully'));
            }
        }).catch(err => {
            console.log(err);
            if (err.ErrorID == 2110) {
                next(new apierror_1.default(err.message, err.ErrorID));
            }
            next(new custom_errors_1.ServerException('error occured'));
        });
    });
};
UserController.login = (req, res, next) => {
    service.login(req.body, true).then(user => {
        if (user) {
            res.json(response_1.default.success(_a.getVisibleUserData(user), ' تم إرسال رمز للمرة الواحدة عبر البريد الألكتروني '));
        }
    }).catch(err => {
        console.log(err);
        if (err.ErrorID == 2110) {
            next(new apierror_1.default(err.message, err.ErrorID));
        }
        if (err.ErrorID == 5200) {
            next(new apierror_1.default("اسم المستخدم أو كلمة المرور غير صحيحة", err.ErrorID));
        }
        next(new custom_errors_1.ServerException('خطأ'));
    });
};
UserController.loginByOTP = (req, res, next) => {
    service.loginByOTP(req.body).then(JWT => {
        if (JWT) {
            res.json(response_1.default.success(JWT, 'تم التسجيل بنجاح'));
        }
    }).catch(err => {
        console.log(err);
        if (err.ErrorID == 2110) {
            next(new apierror_1.default(err.message, err.ErrorID));
        }
        next(new custom_errors_1.ServerException('error occured'));
    });
};
UserController.resetUserRules = (req, res, next) => {
    const userId = req.body.id;
    service.resetUserRules(Number(userId)).then(() => {
        res.json(response_1.default.success("", 'rules reset done.'));
    }).catch(err => {
        console.log(err);
        if (err.ErrorID == 2110) {
            next(new apierror_1.default(err.message, err.ErrorID));
        }
        next(new custom_errors_1.ServerException('error occured'));
    });
};
UserController.addUserRule = (req, res, next) => {
    const userId = req.body.userId;
    const ruleId = req.body.ruleId;
    service.addUserRule(Number(userId), Number(ruleId)).then(() => {
        res.json(response_1.default.success("", 'rule added.'));
    }).catch(err => {
        next(new apierror_1.default(err.message, err.ErrorID));
    });
};
exports.default = UserController;
//# sourceMappingURL=UserController.js.map