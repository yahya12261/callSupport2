import { Request } from "express";
import { User } from "../models/entities/User";
import { EndPointsActionsEnum } from "../enum/EndPointsActionsEnum";

export interface CustomeRequest extends Request {
    createdUser?: User;
    updatedUser?: User;
    deletedUser?: User;
    Action?:EndPointsActionsEnum;


  }