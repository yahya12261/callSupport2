import { User } from "./entities/User";
import { EntityType } from "../enum/EntityType";
import { InferencePriority } from "typescript";
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
export type PropertyNames<T> = {
    [K in keyof T]: K;
}; 

export const createKeys = <T extends object>(): PropertyNames<T> => {
    return Object.keys({} as T).reduce((acc, key) => {
        acc[key as keyof T] = key as keyof T;
        return acc;
    }, {} as PropertyNames<T>);
};


export const getNameFromPriority = (priority:InferencePriority):string=>{
    return priority.toString();
}