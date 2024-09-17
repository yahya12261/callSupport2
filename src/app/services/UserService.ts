import { IUserRepository } from "../repository/UserRepository";
import { User } from "../models/entities/User";
import { FindOperator, getRepository } from "typeorm";
import { Request } from "express";
import { IUser } from "../models/User";
import APIError from "../global/response/apierror";
import Err from "../global/response/errorcode";
import { Logger } from "../../lib/logger";
import { EmailService } from "../extra/EmailService";
import { JWTService } from "../extra/JWTService";
import { Position } from "../models/entities/Position";
import { Rule } from "../models/entities/Rule";
import BaseService from "./BaseService";
import { BaseEntity } from "../models/entities/baseEntity";
import * as bcrypt from 'bcryptjs';
import { RuleService } from "./RuleService";
export class UserService extends BaseService<User, IUser> implements IUserRepository {
  private ruleService: RuleService = new RuleService(Rule);
  public static logger: any = new Logger();
  protected getEntityClass(): typeof User {
    return User;
  }
  async changePassword(user: IUser): Promise<boolean> {
    try {
      const userRepository = this.getRepository();
      const userId = user.id;
      const existingUser = await userRepository.findOne({
        where: { id: Number(userId) },
      });

      if (existingUser) {
        console.log(user.password);
        existingUser.password = User.hashPasswordNew(user.password);

        //  existingUser.hashPassword();
        existingUser.changePassword = false;
        await userRepository.save(existingUser);
        return true;
      } else {
        return Promise.reject(new APIError("user not found", Err.UserNotFound));
      }
    } catch (err) {
      return Promise.reject(new APIError("user not found", Err.UserNotFound));
    }
  }
  async checkUserExists(model: IUser): Promise<boolean> {
    const userRepository = getRepository(User);
    const { email, username } = model;
    try {
      let exists = false;
      console.log("email", email);
      console.log("username", username);
      if (!email || !username) {
        new APIError("غير موجود", Err.EmailAlreadyExists);
      }

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
    } catch (e) {
      console.log(e);
      return Promise.reject(
        new APIError("User Already exists", Err.EmailAlreadyExists)
      );
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
  async getByUUID(uuid: string): Promise<User | undefined> {
    const userRepository = getRepository(User);
    try {
      const user = await userRepository.findOne({
        where: { uuid: uuid },
        relations: ["rules","position"],
      });
      return user;
    } catch (err: any) {
      return Promise.reject(new APIError(err.message, Err.UndefinedCode));
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
      position,
      dsc,
      note,
      phoneNumber,
      arabicLabel,
    } = model;
    const user = new User();
    user.username = username;
    user.first = first;
    user.password = password;
    user.middle = middle;
    user.last = last;
    user.isAdmin = false;
    user.isActive = true;
    console.log(position);
    user.position = position;
    user.email = email;
    user.phoneNumber = phoneNumber;
    user.arabicLabel = arabicLabel;
    user.hashPassword();
    user.makeUsernameAndEmailLowerCase();
    const userRepository = getRepository(User);
    try {
      //  add default rules
      // const defaultRules = await this.ruleService.getDefaultRules();
      // if(defaultRules){
      //   defaultRules.forEach((rule)=>{
      //     user.addRules(rule);
      //   });
      // }
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
      return Promise.reject(new APIError("الحساب غير موجود", Err.UserNotFound));
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
      if (user) {
        return user;
      } else {
        throw new APIError("user not found", Err.UserNotFound);
      }
    } catch (err) {
      console.log(err);
      throw new APIError("An error occurred", Err.DatabaseError);
    }
  }
  private async validateUser(user: User, password: string): Promise<void> {
    if (!user.isActive) {
      return Promise.reject(
        new APIError("تم إغلاق هذا الحساب يرجى التواصل مع المسؤول !", Err.UndefinedCode)
      );
    }

    if (user.checkIfUnencryptedPasswordIsValid(password)) {
      user.invalidLoginAttempts = 0;
    } else {
      user.invalidLoginAttempts++;
      if (user.invalidLoginAttempts >= 3) {
        user.isActive = false;
        await getRepository(User).save(user);
        return Promise.reject(
          new APIError("تم إغلاق هذا الحساب يرجى التواصل مع المسؤول !", Err.UndefinedCode)
        );
      } else {
        return Promise.reject(
          new APIError("كلمة المرور خاطئة", Err.UndefinedCode)
        );
      }
    }
  }
  private async updateUserLastLogin(user: User): Promise<void> {
    user.lastLogin = new Date();
    await getRepository(User).save(user);
  }
  async loginByOTP(
    user: IUser
  ): Promise<{ JWT: string | null; resetPass: boolean }> {
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
            return { JWT: token, resetPass: user.changePassword as boolean };
          } else {
            this.sendOTP(user);
            return Promise.reject(
              new APIError(
                "check your email with new OTP",
                Err.IncorrectCurrPassword
              )
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
      E_mail.sendEmail(user.email, "2nd Factor Auth", `your OTP : ${OTP}`);
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
  static async addUserRulesByPosition(user: User): Promise<User | null> {
    const userRepository = getRepository(User);
    const positionRepository = getRepository(Position);
    try {
      const position = await positionRepository.findOne({
        where: { id: user.position?.id },
        relations: ["rules"],
      });
      console.log(position);
      if (!position || !position.rules) {
        return Promise.reject(new APIError("err", Err.EmptyRequestBody));
      }
      if (!Array.isArray(user.rules)) {
        user.rules = [];
      }

      const availableRules = position.rules.filter(
        (rule) => !user.rules.some((r) => r.id === rule.id)
      );

      availableRules.forEach((rule) => user.addRules(rule));
      const saved = await userRepository.save(user);
      return saved;
    } catch (err) {
      console.log(err);
      return Promise.reject(new APIError("err", Err.DuplicateRequest));
    }
  }
  async resetUserRules(userId: number): Promise<void> {
    const userRepository = getRepository(User);
    const positionRepository = getRepository(Position);
    try {
      const user = await userRepository.findOne({
        where: { id: userId },
        relations: ["rules", "position"],
      });
      if (!user) {
        return Promise.reject(new APIError("err", Err.UserNotFound));
      }
      if (!user.position) {
        return Promise.reject(
          new APIError("please set position before reset rules! ", 0)
        );
      }
      const position = await positionRepository.findOne({
        where: { id: user.position?.id },
        relations: ["rules"],
      });
      if (position?.rules) {
        if (!Array.isArray(position.rules)) {
          position.rules = [];
        }
        user.rules = position.rules;
        userRepository.save(user);
      }
    } catch (err) {
      return Promise.reject(
        new APIError("an error : " + err, Err.UndefinedCode)
      );
    }
  }
  async addUserRule(userId: number, ruleId: number): Promise<void> {
    try {
      if (!userId || !ruleId) {
        return Promise.reject(new APIError("err", Err.EmptyRequestBody));
      }
      getRepository("user_rule").insert({ userId: userId, ruleId: ruleId });
    } catch (err) {
      return Promise.reject(
        new APIError("an error : " + err, Err.UndefinedCode)
      );
    }
  }
  async deleteUserRule(userId: number, ruleId: number): Promise<void> {
    try {
      if (!userId || !ruleId) {
        return Promise.reject(new APIError("طلب خاطئ", Err.EmptyRequestBody));
      }
      getRepository("user_rule").delete({ userId: userId, ruleId: ruleId });
    } catch (err) {
      return Promise.reject(
        new APIError("an error : " + err, Err.UndefinedCode)
      );
    }
  }
  async activeDeactivateChangePassword(uuid: string): Promise<void> {
    const userRepository = getRepository(User);
    try {
      const user = await this.findByUUID(uuid);
      //console.log(user);
      if (!user) {
        return Promise.reject(
          new APIError("user not Exist", Err.UndefinedCode)
        );
      }
      user.changePassword = !user.changePassword;
      await userRepository.save(user as User);
    } catch (err: any) {
      return Promise.reject(new APIError(err.message, Err.UndefinedCode));
    }
  }
  async activeDeactivate(uuid: string): Promise<void> {
    const userRepository = getRepository(User);
    try {
      const user = await this.findByUUID(uuid);
      //console.log(user);
      if (!user) {
        return Promise.reject(
          new APIError("user not Exist", Err.UndefinedCode)
        );
      }
      user.isActive = !user.isActive;
      await userRepository.save(user as User);
    } catch (err: any) {
      return Promise.reject(new APIError(err.message, Err.UndefinedCode));
    }
  }

 async getUserPosition(userId:number): Promise<Position>{
  try{
    if(userId){
        const user = await this.getRepository().findOne(   
          {where: { id:userId },
          relations: ["position"]}
        );
          if(!user||!user.position){
            return Promise.reject(new APIError("لا يمكن الوصول", Err.UndefinedCode));
          }
          return user.position;
    }else{
      return Promise.reject(new APIError("خطأ", Err.UndefinedCode));
    }  

  }catch(err){
    return Promise.reject(new APIError("err", Err.UndefinedCode));
  } 
 }

 async getUserByUUID(uuid:string):Promise<{ id: number; position:Position,arabicLabel:string,email:string}> {
  const userRepository = getRepository(User);
  try {
      const user = await userRepository.findOne({
        where: { uuid: uuid },
        relations:["position"]
      });
      if (!user) {
        return Promise.reject(
          new APIError(
            "check your email with new OTP",
            Err.IncorrectCurrPassword
          )
        );
      }
          return { id:user.id, position: user.position,arabicLabel:(user.arabicLabel)?user.arabicLabel:"",email:user.email };
        }
   catch (err) {
    return Promise.reject(
      new APIError("An error occurred", Err.DatabaseError)
    );
  }
 }
}
