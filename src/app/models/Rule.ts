import { IBaseEntity } from "./baseEntity"
import { Position } from "./entities/Position"
import { MethodTypes } from "../enum/MethodTypes"
import { Rule } from "./entities/Rule"

export interface IRule extends IBaseEntity {
    name:String,
    route:String,
    code:String,
    methodType:MethodTypes,
    methodName:String,
    position:Position[]
    rules:Rule[],
  }