import { IUserRepository } from "../repository/UserRepository";
import { User } from "../models/entities/User";
import { getRepository } from "typeorm";
import { Request } from "express";
import { IUser } from "../models/User";
import APIError from "../global/response/apierror";
import Err from "../global/response/errorcode";
import { Logger } from "../../lib/logger";

export class UserService implements IUserRepository {
  public static logger: any = new Logger();
  async checkUserExists(email?: string, username?: string): Promise<boolean> {
    const userRepository = getRepository(User);

    try {
      let exists = false;

      if (email !== undefined) {
        const count = await userRepository.count({ email: email+"" });
        exists = count > 0;
      }

      if (username !== undefined && !exists) {
        const count = await userRepository.count({ username: username+"" });
        exists = count > 0;
      }

      return exists;
    } catch (err) {
      UserService.logger.error("Error checking user existence:", err);
      throw err;
    }
  }

  //   async getOneByUserAndPassword
  // async get(): Promise<User[] | null> {
  //     // Get users from database
  //     try {
  //         const userRepository = getRepository(User);
  //         const users = await userRepository.find({});
  //         return users;
  //     }
  //     catch (error) {
  //         return null
  //     }
  // }
  async getById(id: number): Promise<User | null> {
    const userRepository = getRepository(User);
    try {
      const user = await userRepository.findOneOrFail(id);
      return user;
    } catch (error) {
      return null;
    }
  }
  async add(model: IUser): Promise<User | null> {
    const {
      first,
      middle,
      last,
      username,
      password,
      email,
      createdBy,
      Position,
      dsc,
      note,
      phoneNumber
    } = model;
    const user = new User();
    user.username = username;
    user.first = first;
    user.password =  password;
    user.middle = middle;
    user.last = last;
    user.isAdmin = false;
    user.isActive = true;
    user.position = Position;
    user.email = email;
    user.phoneNumber = phoneNumber ;
    user.hashPassword();
    const userRepository = getRepository(User);
    try {
      const savedUser = await userRepository.save(user);
      return savedUser;
    } catch (e) {
      console.log(e);
      return Promise.reject(
        new APIError("User Already exists", Err.EmailAlreadyExists)
      );
    }
  }
  // async delete(id: number): Promise<User | null> {
  //     const userRepository = getRepository(User);
  //     let user: User;
  //     try {
  //         user = await userRepository.findOneOrFail(id);
  //         if (user) {
  //             userRepository.delete(id);
  //         }
  //         return null;
  //     } catch (error) {
  //         return null;
  //     }
  // }
}
