import { IBaseEntity } from "./baseEntity"
import { Status } from "./entities/Statuses/Status";
import { StatusFlow } from "./entities/Statuses/StatusFlow";

export interface IStatus extends IBaseEntity {
    name:String;
    next:StatusFlow[];
    color:String;
  }