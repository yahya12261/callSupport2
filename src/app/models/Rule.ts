import { IBaseEntity } from "./baseEntity"
import { Position } from "./entities/Position"
import { MethodTypes } from "../enum/MethodTypes"

export interface IRule extends IBaseEntity {
    name:String,
    route:String,
    code:String,
    methodType:MethodTypes,
    methodName:String,
    position:Position[]
  }