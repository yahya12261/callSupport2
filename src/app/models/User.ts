import { IBaseEntity } from "./baseEntity";

export interface IUser extends IBaseEntity {
    first: string;
    middle: string;
    last: string;
    email: string;
    username: string;
    password: string;
    OTP: string;
    isAdmin: boolean;
}
