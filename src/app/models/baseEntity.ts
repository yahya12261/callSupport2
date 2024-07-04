import { User } from "./entities/User";
import { EntityType } from "./type/EntityType";
export  interface IBaseEntity{
    id:number,
    createdAt:Date,
    updatedAt:Date,
    deletedAt:Date,
    version:number,
    dsc:String,
    type:EntityType,
    isActive:boolean,
    note:String,
    createdBy:User,
    modifiedBy:User,
    deletedBy:User,
}