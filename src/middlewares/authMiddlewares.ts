import { Request, Response, NextFunction } from 'express';
import { Rule } from '../app/models/entities/Rule';
import { JWTService } from '../app/extra/JWTService';
import APIError from '../app/global/response/apierror';
import { UserService } from '../app/services/UserService';
import { CustomeRequest } from '../app/interface/CustomeRequest';
import { EndPointsActionsEnum } from '../app/enum/EndPointsActionsEnum';
import { User } from '../app/models/entities/User';
import { RuleService } from '../app/services/RuleService';

export const authMiddleware = async (
  req: CustomeRequest,
  res: Response,
  next: NextFunction
) => {
  const ruleService: RuleService = new RuleService(Rule);
  try {
    const token = req.headers.authorization?.split(" ")[1];
    // console.log(token);
    if (!token) {
      return res.status(401).json(new APIError("Unauthorized", 401));
    }
    const decoded: any = JWTService.decryptJWT(token);
    const userUUID: string = decoded.userUUID;

    if (!userUUID) {
      return res.status(401).json(new APIError("Unauthorized", 401));
    }
    const userService = new UserService(User);
    const user = await userService.getByUUID(userUUID);
    // console.log(user);
    if (!user) {
      return res.status(401).json(new APIError("Unauthorized", 401));
    }
    if(!user.isActive){
      return res.status(401).json(new APIError("تم إغلاق هذا الحساب", 401));
    }
    if (user.isAdmin) {
      if (Object.is(req.Action, EndPointsActionsEnum.ADD)) {
        req.createdUser = user;
      } else if (Object.is(req.Action, EndPointsActionsEnum.UPDATE)) {
        req.updatedUser = user;
      } else if (Object.is(req.Action, EndPointsActionsEnum.DELETE)) {
        req.deletedUser = user;
      } else if(Object.is(req.Action, EndPointsActionsEnum.SELECT)) {
        req.selectedUser = user;
      }
      next();
    } else {
      var hasAccess = false;
      const defaultRules = await ruleService.getDefaultRules();
      if (defaultRules)
        hasAccess = defaultRules.some(
          (rule: Rule) =>
            rule.type === "API" &&
            `api${rule.name}`.replace(/\//g, "") ===
              req.originalUrl.replace(/\//g, "")
        );
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
          } else {
            // page, section, etc.
            hasAccess = user.rules.some(
              (r: Rule) =>
                `api${r.name}`.replace(/\//g, "") ===
                req.originalUrl.replace(/\//g, "")
            );

            if (hasAccess) {
              return; // exit the loop if access is granted for a non-API rule
            }
          }
        });
      }
      if (hasAccess) {
        if (Object.is(req.Action, EndPointsActionsEnum.ADD)) {
          req.createdUser = user;
        } else if (Object.is(req.Action, EndPointsActionsEnum.UPDATE)) {
          req.updatedUser = user;
          // console.log(req.updatedUser);
        } else if (Object.is(req.Action, EndPointsActionsEnum.DELETE)) {
          req.deletedUser = user;
        } else if(Object.is(req.Action, EndPointsActionsEnum.SELECT)) {
          req.selectedUser = user;
        }
        next();
      } else {
        return res.status(403).json(new APIError("Forbidden", 403));
      }
    }
  } catch (err) {
    console.error("Error in authMiddleware:", err);
    return res.status(500).json(new APIError("Internal Server Error", 500));
  }
};