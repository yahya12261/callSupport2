import { Request, Response, NextFunction } from 'express';
import { Rule } from '../app/models/entities/Rule';
import { JWTService } from '../app/services/JWTService';
import APIError from '../app/global/response/apierror';
import { UserService } from '../app/services/UserService';
import { CustomeRequest } from '../app/models/CustomeRequest';
import { EndPointsActionsEnum } from '../app/models/type/EndPointsActionsEnum';

export const authMiddleware = async (req: CustomeRequest, res: Response, next: NextFunction) => {
  try {

    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json(new APIError('Unauthorized', 401));
    }
    const decoded: any = JWTService.decryptJWT(token);
    const userUUID: string = decoded.userUUID;

    if (!userUUID) {
      return res.status(401).json(new APIError('Unauthorized', 401));
    }
    const userService = new UserService();
    const user = await userService.getByUUID(userUUID);
    if (!user) {
      return res.status(401).json(new APIError('Unauthorized', 401));
    }
    if (user.isAdmin) {
      if(Object.is(req.Action , EndPointsActionsEnum.ADD)){
        req.createdUser = user;
      }
      else if(Object.is(req.Action , EndPointsActionsEnum.UPDATE)){
        req.updatedUser = user;
      }
      else if(Object.is(req.Action , EndPointsActionsEnum.DELETE)){
        req.deletedUser = user;
      }
      next();
    } else {
      const hasAccess = user.rules.some((rule:Rule) => `api${rule.name}`.replace(/\//g, '') === req.originalUrl.replace(/\//g, ''));
      if (hasAccess) {
        if(Object.is(req.Action , EndPointsActionsEnum.ADD)){
          req.createdUser = user;
        }
        else if(Object.is(req.Action , EndPointsActionsEnum.UPDATE)){
          req.updatedUser = user;
        }
        else if(Object.is(req.Action , EndPointsActionsEnum.DELETE)){
          req.deletedUser = user;
        }
        next();
      } else {
        return res.status(403).json(new APIError('Forbidden', 403));
      }
    }
  } catch (err) {
    console.error('Error in authMiddleware:', err);
    return res.status(500).json(new APIError('Internal Server Error', 500));
  }
};