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
const errorcode_1 = __importDefault(require("../global/response/errorcode"));
const User_1 = require("../models/entities/User");
const RuleService_1 = require("../services/RuleService");
const RuleController_1 = __importDefault(require("./RuleController"));
const Rule_1 = require("../models/entities/Rule");
const EndPointsActionsEnum_1 = require("../enum/EndPointsActionsEnum");
const BaseController_1 = require("./BaseController");
const EntityType_1 = require("../enum/EntityType");
const FieldTypes_1 = require("../enum/FieldTypes");
const OrderByOperation_1 = require("../enum/OrderByOperation");
const WhereOperations_1 = require("../enum/WhereOperations");
const service = new UserService_1.UserService(User_1.User);
const ruleService = new RuleService_1.RuleService(Rule_1.Rule);
const ruleController = new RuleController_1.default();
class UserController extends BaseController_1.BaseController {
    constructor() {
        super(service, [
            {
                name: "first",
                type: FieldTypes_1.FieldTypes.TEXT,
            },
            {
                name: "middle",
                type: FieldTypes_1.FieldTypes.TEXT,
            },
            {
                name: "last",
                type: FieldTypes_1.FieldTypes.TEXT,
            },
            {
                name: "email",
                type: FieldTypes_1.FieldTypes.TEXT,
            },
            {
                name: "username",
                type: FieldTypes_1.FieldTypes.TEXT,
            },
            {
                name: "lastLogin",
                type: FieldTypes_1.FieldTypes.TEXT,
            },
            {
                name: "position.id",
                type: FieldTypes_1.FieldTypes.NUMBER,
            },
            {
                name: "phoneNumber",
                type: FieldTypes_1.FieldTypes.TEXT,
            },
            {
                name: "department.id",
                type: FieldTypes_1.FieldTypes.NUMBER,
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
        this.entity = EntityType_1.EntityType.USER;
        this.getAll = (req, res, next) => {
            this.reqElm.page = Number(req.query.page);
            this.reqElm.pageSize = Number(req.query.pageSize);
            this.reqElm.orderBy = req.query.orderBy
                ? String(req.query.orderBy)
                : "createdAt";
            this.reqElm.order = req.query.order
                ? (0, OrderByOperation_1.validateOrderOperation)(String(req.query.order))
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
        this.getUserRules = (req, res, next) => {
            var _b;
            this.createGridOptions(req);
            const userId = req.params.id;
            (_b = this.reqElm.search) === null || _b === void 0 ? void 0 : _b.push({
                name: "id",
                operation: WhereOperations_1.QueryOperator.EQUAL,
                type: FieldTypes_1.FieldTypes.NUMBER,
                value: Number(userId),
            });
            if (this.reqElm.join) {
                this.reqElm.join.innerJoinAndSelect = Object.assign(Object.assign({}, this.reqElm.join.innerJoinAndSelect), { rules: "user.rules" });
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
                    };
                    this.serializeFields(result.data);
                    this.searchFields = this.getDefaultSearchableFields();
                    res.json(response_1.default.success(rulesRes, ""));
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
        this.addUserRule = (req, res, next) => {
            const pageId = req.body.userId;
            const apiId = req.body.ruleId;
            this.service
                .addUserRule(Number(pageId), Number(apiId))
                .then(() => {
                res.json(response_1.default.success("", this.entity + "  Rule added to User successfully"));
            })
                .catch((err) => {
                console.log(err);
                if (err.ErrorID == 2110) {
                    next(new apierror_1.default(err.message, err.ErrorID));
                }
                next(new apierror_1.default(err.message, err.ErrorID));
            });
        };
        this.deleteUserRule = (req, res, next) => {
            const userId = req.body.userId;
            const apiId = req.body.ruleId;
            this.service
                .deleteUserRule(Number(userId), Number(apiId))
                .then(() => {
                res.json(response_1.default.success("", this.entity + " api deleted from User successfully"));
            })
                .catch((err) => {
                console.log(err);
                if (err.ErrorID == 2110) {
                    next(new apierror_1.default(err.message, err.ErrorID));
                }
                next(new apierror_1.default(err.message, err.ErrorID));
            });
        };
        this.getPermissions = (req, res, next) => {
            var rules = [];
            var x;
            if (!req.selectedUser || !req.selectedUser.uuid) {
                next(new apierror_1.default("طلب خاطئ", errorcode_1.default.MissingAuthToken));
            }
            if (req.selectedUser) {
                if (req.selectedUser.isAdmin) {
                    ruleService.getRuleByType(EntityType_1.EntityType.PAGE).then((r) => {
                        res.json(response_1.default.success(r, ""));
                    }).catch((err) => {
                        next(new apierror_1.default(err.message, errorcode_1.default.MissingAuthToken));
                    });
                    //console.log(rules)
                    //res.json(Template.success(rules, ""));
                }
                else {
                    if (req.selectedUser.rules) {
                        rules = req.selectedUser.rules.filter((rule) => rule.type === EntityType_1.EntityType.PAGE);
                        res.json(response_1.default.success(rules, ""));
                        //console.log("r",rules)
                    }
                    else if (!req.selectedUser.rules) {
                        res.json(response_1.default.success([], ""));
                    }
                    else {
                        next(new apierror_1.default("طلب خاطئ", errorcode_1.default.MissingAuthToken));
                    }
                }
            }
            // res.json(Template.success(rules, ""));
        };
    }
    static getVisibleUserData(user) {
        return {
            uuid: user.uuid,
        };
    }
    static buildUserNameAndPassword(user) {
        if (user && user.first && user.middle && user.last && user.phoneNumber) {
            user.username = `${(user.last + "").toLocaleUpperCase()}${user.first + ""}${(user.phoneNumber + "").substring(3, 5)}`;
            user.password = `${(user.last + "").toLocaleUpperCase()}${user.first + ""}${(user.phoneNumber + "").substring(3, 5)}${Math.floor(1000 + Math.random() * 9000).toString()}`;
            console.log("user:", user.username);
            console.log("password:", user.password);
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
    _a.buildUserNameAndPassword(req.body);
    service.checkUserExists(req.body).then((bol) => {
        if (bol === true) {
            res.json(response_1.default.userAlreadyExist());
        }
        service
            .add(req.body)
            .then((user) => {
            // console.log(req.body)
            if (user) {
                // //create rules
                // ruleController.generateUserRulesByPosition(user.id);
                // console.log(user)
                res.json(response_1.default.success(_a.getVisibleUserData(user), "Users saved succesfully"));
            }
        })
            .catch((err) => {
            console.log(err);
            if (err.ErrorID == 2110) {
                next(new apierror_1.default(err.message, err.ErrorID));
            }
            next(new custom_errors_1.ServerException("error occured"));
        });
    });
};
UserController.login = (req, res, next) => {
    service
        .login(req.body, true)
        .then((user) => {
        if (user) {
            res.json(response_1.default.success(_a.getVisibleUserData(user), " تم إرسال رمز للمرة الواحدة عبر البريد الألكتروني "));
        }
    })
        .catch((err) => {
        console.log(err);
        if (err.ErrorID == 2110) {
            next(new apierror_1.default(err.message, err.ErrorID));
        }
        if (err.ErrorID == 5200) {
            next(new apierror_1.default(err.message, err.ErrorID));
        }
        next(new apierror_1.default(err.message, err.ErrorID));
    });
};
UserController.getUserByUUID = (req, res, next) => {
    const uuid = req.params.uuid;
    service.getUserByUUID(uuid + "").then(result => {
        if (result) {
            res.json(response_1.default.success(result, ""));
        }
        else {
            next(new apierror_1.default("خطأ", 0));
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
UserController.loginByOTP = (req, res, next) => {
    service
        .loginByOTP(req.body)
        .then((data) => {
        if (data.JWT) {
            res.json(response_1.default.success(data, "تم التسجيل بنجاح"));
        }
        res.json(response_1.default.error(data, "خطأ", 0));
    })
        .catch((err) => {
        console.log(err);
        if (err.ErrorID == 2110) {
            next(new apierror_1.default(err.message, err.ErrorID));
        }
        next(new custom_errors_1.ServerException("error occured"));
    });
};
UserController.resetUserRules = (req, res, next) => {
    const userId = req.body.id;
    service
        .resetUserRules(Number(userId))
        .then(() => {
        res.json(response_1.default.success("", "rules reset done."));
    })
        .catch((err) => {
        console.log(err);
        if (err.ErrorID == 2110) {
            next(new apierror_1.default(err.message, err.ErrorID));
        }
        next(new custom_errors_1.ServerException("error occured"));
    });
};
UserController.changePassword = (req, res, next) => {
    const userChanged = req.body;
    if (req.updatedUser && userChanged.password === userChanged.password2) {
        userChanged.id = req.updatedUser.id;
        service.changePassword(userChanged).then((bol) => {
            if (bol) {
                res.json(response_1.default.success("", "تم تغيير كلمة السر بنجاح"));
            }
            else {
                next(new apierror_1.default("خطأ", 0));
            }
        }, (error) => {
            next(new apierror_1.default(error, 0));
        });
    }
    else {
        next(new apierror_1.default("كلمة السر غير متطابقة", 0));
    }
};
UserController.activeDeactivateChangePassword = (req, res, next) => {
    const user = req.body;
    if (!user || !user.uuid) {
        next(new apierror_1.default("عنوان غير صحيح", 0));
    }
    //console.log(user.uuid);
    service.activeDeactivateChangePassword(user.uuid).then(() => {
        res.json(response_1.default.success("تمت العملية بنجاح", ""));
    }, (error) => {
        next(new apierror_1.default(error.message, 0));
    });
};
UserController.activeDeactivate = (req, res, next) => {
    const user = req.body;
    if (!user || !user.uuid) {
        next(new apierror_1.default("عنوان غير صحيح", 0));
    }
    //console.log(user.uuid);
    service.activeDeactivate(user.uuid).then(() => {
        res.json(response_1.default.success("تمت العملية بنجاح", ""));
    }, (error) => {
        next(new apierror_1.default(error.message, 0));
    });
};
exports.default = UserController;
//# sourceMappingURL=UserController.js.map