"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const Rule_1 = require("../app/models/entities/Rule");
const JWTService_1 = require("../app/extra/JWTService");
const apierror_1 = __importDefault(require("../app/global/response/apierror"));
const UserService_1 = require("../app/services/UserService");
const EndPointsActionsEnum_1 = require("../app/enum/EndPointsActionsEnum");
const User_1 = require("../app/models/entities/User");
const RuleService_1 = require("../app/services/RuleService");
const authMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const ruleService = new RuleService_1.RuleService(Rule_1.Rule);
    try {
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        // console.log(token);
        if (!token) {
            return res.status(401).json(new apierror_1.default("Unauthorized", 401));
        }
        const decoded = JWTService_1.JWTService.decryptJWT(token);
        const userUUID = decoded.userUUID;
        if (!userUUID) {
            return res.status(401).json(new apierror_1.default("Unauthorized", 401));
        }
        const userService = new UserService_1.UserService(User_1.User);
        const user = yield userService.getByUUID(userUUID);
        // console.log(user);
        if (!user) {
            return res.status(401).json(new apierror_1.default("Unauthorized", 401));
        }
        if (!user.isActive) {
            return res.status(401).json(new apierror_1.default("تم إغلاق هذا الحساب", 401));
        }
        if (user.isAdmin) {
            if (Object.is(req.Action, EndPointsActionsEnum_1.EndPointsActionsEnum.ADD)) {
                req.createdUser = user;
            }
            else if (Object.is(req.Action, EndPointsActionsEnum_1.EndPointsActionsEnum.UPDATE)) {
                req.updatedUser = user;
            }
            else if (Object.is(req.Action, EndPointsActionsEnum_1.EndPointsActionsEnum.DELETE)) {
                req.deletedUser = user;
            }
            else if (Object.is(req.Action, EndPointsActionsEnum_1.EndPointsActionsEnum.SELECT)) {
                req.selectedUser = user;
            }
            next();
        }
        else {
            var hasAccess = false;
            const defaultRules = yield ruleService.getDefaultRules();
            if (defaultRules)
                hasAccess = defaultRules.some((rule) => rule.type === "API" &&
                    `api${rule.name}`.replace(/\//g, "") ===
                        req.originalUrl.replace(/\//g, ""));
            console.log(hasAccess);
            if (!hasAccess) {
                user.rules.forEach((rule) => {
                    if (rule.type === "API") {
                        hasAccess =
                            `api${rule.name}`.replace(/\//g, "") ===
                                req.originalUrl.replace(/\//g, "");
                        if (hasAccess) {
                            return; // exit the loop if access is granted for an API rule
                        }
                    }
                    else {
                        // page, section, etc.
                        hasAccess = user.rules.some((r) => `api${r.name}`.replace(/\//g, "") ===
                            req.originalUrl.replace(/\//g, ""));
                        if (hasAccess) {
                            return; // exit the loop if access is granted for a non-API rule
                        }
                    }
                });
            }
            if (hasAccess) {
                if (Object.is(req.Action, EndPointsActionsEnum_1.EndPointsActionsEnum.ADD)) {
                    req.createdUser = user;
                }
                else if (Object.is(req.Action, EndPointsActionsEnum_1.EndPointsActionsEnum.UPDATE)) {
                    req.updatedUser = user;
                    // console.log(req.updatedUser);
                }
                else if (Object.is(req.Action, EndPointsActionsEnum_1.EndPointsActionsEnum.DELETE)) {
                    req.deletedUser = user;
                }
                else if (Object.is(req.Action, EndPointsActionsEnum_1.EndPointsActionsEnum.SELECT)) {
                    req.selectedUser = user;
                }
                next();
            }
            else {
                return res.status(403).json(new apierror_1.default("Forbidden", 403));
            }
        }
    }
    catch (err) {
        console.error("Error in authMiddleware:", err);
        return res.status(500).json(new apierror_1.default("Internal Server Error", 500));
    }
});
exports.authMiddleware = authMiddleware;
//# sourceMappingURL=authMiddlewares.js.map