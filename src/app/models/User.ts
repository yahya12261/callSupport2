import { IBaseEntity } from "./baseEntity";
import { Position } from "./entities/Position";

export interface IUser extends IBaseEntity {
    first: string;
    middle: string;
    last: string;
    email: string;
    username: string;
    password: string;
    OTP: number;
    isAdmin: boolean;
    position:Position;
    phoneNumber:string;
    invalidLoginAttempts:number;
    lastLogin:Date;
}
