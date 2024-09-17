import { IBaseEntity } from "./baseEntity";
import { User } from "./entities/User";

export interface IService extends IBaseEntity {
    name:String,
    reporter:User
  }