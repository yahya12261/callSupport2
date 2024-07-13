import { User } from "./entities/User";
import { EntityType } from "./type/EntityType";
export  interface IBaseEntity{
    id:number,
    uuid:string,
    createdAt:Date,
    updatedAt:Date,
    deletedAt:Date,
    version:number,
    dsc:string,
    type:EntityType,
    isActive:boolean,
    arabicLabel:string,
    note:string,
    createdBy:User,
    modifiedBy:User,
    deletedBy:User,
}