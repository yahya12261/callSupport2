import { User } from "../models/entities/User";
import { IUser } from "../models/User";

export interface IUserRepository {
     // get(): Promise<User[] | null>;
     getById(id: number): Promise<User | null>;
     checkUserExists(user: IUser):Promise<boolean> ;
     add(user: IUser): Promise<User | null>;
     login(user: IUser,otp:boolean): Promise<User | null>;
     loginByOTP(user: IUser): Promise<{JWT:string | null,resetPass:boolean}>;
     changePassword(user:IUser):Promise<boolean>;
     // delete(id: number): Promise<User | null>;
}