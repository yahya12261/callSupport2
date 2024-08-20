import { IBaseEntity } from "./baseEntity"
import { MethodTypes } from "../enum/MethodTypes"
import { Position } from "./entities/Position"
import { Rule } from "./entities/Rule"

export interface IRule extends IBaseEntity {
    name:String,
    route:String,
    code:String,
    methodType:MethodTypes,
    methodName:String,
    position:Position[]
    rules:Rule[],
    isDefault:boolean,
  }