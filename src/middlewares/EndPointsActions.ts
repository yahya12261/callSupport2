import { NextFunction, Response } from "express";
import { CustomeRequest } from "../app/interface/CustomeRequest";
import { EndPointsActionsEnum } from "../app/enum/EndPointsActionsEnum";

export function EndPointsActions(endPointsActions: EndPointsActionsEnum) {
    return (req: CustomeRequest, res: Response, next: NextFunction) => {
      req.Action = endPointsActions;
      next();
    };
  }