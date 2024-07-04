import { IBaseEntity } from "./baseEntity";
import { Position } from "./entities/Position";

export interface IUser extends IBaseEntity {
    first: string;
    middle: string;
    last: string;
    email: string;
    username: string;
    password: string;
    OTP: string;
    isAdmin: boolean;
    Position:Position;
    phoneNumber:string;
}
