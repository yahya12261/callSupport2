import { User } from "../models/entities/User";
import { IUser } from "../models/User";

export interface IUserRepository {
     // get(): Promise<User[] | null>;
     getById(id: number): Promise<User | null>;
     checkUserExists(user: IUser):Promise<boolean> ;
     add(user: IUser): Promise<User | null>;
     login(user: IUser): Promise<User | null>;
     loginByOTP(user: IUser): Promise<String | null>;
     // delete(id: number): Promise<User | null>;
}