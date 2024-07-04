import { IBaseEntity } from "./baseEntity";
import { Department } from "./entities/Department";

export interface IPosition extends IBaseEntity {
    name:String
    department:Department
  }