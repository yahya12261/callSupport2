import { IUserRepository } from "../repository/UserRepository";
import { User } from "../models/entities/User";
import { FindOperator, getRepository } from "typeorm";
import { Request } from "express";
import { IUser } from "../models/User";
import APIError from "../global/response/apierror";
import Err from "../global/response/errorcode";
import { Logger } from "../../lib/logger";
import { EmailService } from "./EmailService";
import { JWTService } from "./JWTService";

export class UserService implements IUserRepository {
  async changePassword(user: IUser, newPass: string): Promise<User | null> {
    try {
      const existingUser = await this.login(user, false);
      if (existingUser) {
        existingUser.password = newPass;
        existingUser.hashPassword();
        await getRepository(User).save(existingUser);
        return existingUser;
      } else {
        throw new APIError("User not found", Err.UserNotFound);
      }
    } catch (err) {
      throw new APIError("Error changing password", Err.UserNotFound);
    }
  }
  public static logger: any = new Logger();
  //  userRepository = getRepository(User);

  async checkUserExists(model: IUser): Promise<boolean> {
    const userRepository = getRepository(User);
    const { email, username } = model;
    try {
      let exists = false;
      let emailLowerCase = email?.toLocaleLowerCase();
      let userLoweCase = username?.toLocaleLowerCase();
      if (email !== undefined) {
        const count = await userRepository.count({ email: emailLowerCase });
        exists = count > 0;
      }

      if (username !== undefined && !exists) {
        const count = await userRepository.count({ username: userLoweCase });
        exists = count > 0;
      }

      return exists;
    } catch (err) {
      UserService.logger.error("Error checking user existence:", err);
      throw err;
    }
  }
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
      phoneNumber,
    } = model;
    const user = new User();
    user.username = username;
    user.first = first;
    user.password = password;
    user.middle = middle;
    user.last = last;
    user.isAdmin = false;
    user.isActive = true;
    user.position = Position;
    user.email = email;
    user.phoneNumber = phoneNumber;
    user.hashPassword();
    user.makeUsernameAndEmailLowerCase();
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
  async login(model: IUser, otp: boolean): Promise<User | null> {
    const { username, password } = model;
    const user = await this.findUser(username);
    if (!user) {
      return Promise.reject(
        new APIError("user not found", Err.UserNotFound)
      );
    }
  
    await this.validateUser(user, password);
    await this.updateUserLastLogin(user);
  
    if (otp) {
      await this.sendOTP(user);
    }
  
    return user;
  }
  
  private async findUser(username: string): Promise<User | null> {
    try {
      const userRepository = getRepository(User);
      const user = await userRepository.findOne({
        where: {
          username,
        },
      });
      if(user){
      return user;}
      else{
      throw new APIError("user not found", Err.UserNotFound);}
    } catch (err) {
      console.log(err);
      throw new APIError("An error occurred", Err.DatabaseError);
    }
  }
  
  private async validateUser(user: User, password: string): Promise<void> {
    if (!user.isActive) {
      throw new APIError("Account is locked", Err.InactiveUser);
    }
  
    if (user.checkIfUnencryptedPasswordIsValid(password)) {
      user.invalidLoginAttempts = 0;
    } else {
      user.invalidLoginAttempts++;
      if (user.invalidLoginAttempts >= 3) {
        user.isActive = false;
        await getRepository(User).save(user);
        throw new APIError("Account is locked", Err.InactiveUser);
      } else {
        throw new APIError("Invalid password", Err.InvalidLoginPassword);
      }
    }
  }
  
  private async updateUserLastLogin(user: User): Promise<void> {
    user.lastLogin = new Date();
    await getRepository(User).save(user);
  }
  async loginByOTP(user: IUser): Promise<String | null> {
    const { OTP, uuid } = user;
    const userRepository = getRepository(User);
    try {
      if (OTP && uuid) {
        const user = await userRepository.findOne({
          where: { uuid: uuid },
          // { OTP:OTP }
        });
        if (user) {
          if (OTP == user.OTP) {
            //Generate JWE and send it
            const token = JWTService.generateJWT(user.uuid);
            return token;
          } else {
            this.sendOTP(user);
            return Promise.reject(
              new APIError("check your email with new OTP", Err.IncorrectCurrPassword)
            );
          }
        } else {
          return Promise.reject(
            new APIError("User not found", Err.UserNotFound)
          );
        }
      } else {
        return Promise.reject(
          new APIError("An error occurred", Err.EmptyRequestBody)
        );
      }
    } catch (err) {
      console.log(err);
      return Promise.reject(
        new APIError("An error occurred", Err.DatabaseError)
      );
    }
  }
  private sendOTP(user: User) {
    const userRepository = getRepository(User);
    try {
      let OTP = this.generateOTP();
      user.OTP = Number(OTP);
      userRepository.save(user);
      const E_mail = new EmailService();
      E_mail.sendEmail(user.email,"2nd Factor Auth",`your OTP : ${OTP}`)
    } catch (err) {
      console.log(err);
      return Promise.reject(
        new APIError("An error occurred", Err.DatabaseError)
      );
    }
  }
  private generateOTP(): string {
    // Generate a random 4-digit number
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    return otp;
  }
}
