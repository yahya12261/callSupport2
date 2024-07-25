import { Request } from "express";
import { User } from "./entities/User";
import { EndPointsActionsEnum } from "./type/EndPointsActionsEnum";

export interface CustomeRequest extends Request {
    createdUser?: User;
    updatedUser?: User;
    deletedUser?: User;
    Action?:EndPointsActionsEnum;


  }