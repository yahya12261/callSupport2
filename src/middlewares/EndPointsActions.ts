import { NextFunction, Response } from "express";
import { CustomeRequest } from "../app/models/CustomeRequest";
import { EndPointsActionsEnum } from "../app/models/type/EndPointsActionsEnum";

export function EndPointsActions(endPointsActions: EndPointsActionsEnum) {
    return (req: CustomeRequest, res: Response, next: NextFunction) => {
      req.Action = endPointsActions;
      next();
    };
  }