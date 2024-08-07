import * as bcrypt from 'bcryptjs';
import { IsNotEmpty, Length } from 'class-validator';
import {
  AfterInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { BaseEntity } from './baseEntity';
import { EntityType } from '../../enum/EntityType';
import { Position } from './Position';
import { IBaseEntity } from '../baseEntity';
import { IUser } from '../User';
import { Exclude } from 'class-transformer';
import { Rule } from './Rule';
import { Logger } from '../../../lib/logger';
import APIError from '../../global/response/apierror';
import Template from "../../global/response";
import { Response } from 'express';
import { UserService } from '../../services/UserService';

@Entity("users")
@Unique(['email','username'])

export class User extends BaseEntity{
  public updateEntity(entity: BaseEntity): void {
    throw new Error('Method not implemented.');
  }

  @Column({nullable:true})
  @Length(4, 25)
  public first!: string;

  @Column({nullable:true})
  @Length(4, 25)
  public middle!: string;

  @Column({nullable:true})
  @Length(4, 25)
  public last!: string;

  @Column()
  @Length(4, 100)
  public email!: string;

  @Column()
  @Length(4, 100)
  public username!: string;

  @Column()
  @Length(4, 100)
  public password!: string;

  @Column({nullable:true})
  @Length(8, 8)
  public phoneNumber!: string;

  @Column({nullable:true})
  @Length(4, 4)
  public OTP!:number;

  @Column({default:false})
  public isAdmin!:boolean;

  @Column({default:true})
  public changePassword!:boolean;

  @Column({default:0, nullable:true})
  public invalidLoginAttempts!:number;

  @Column({ type: 'timestamp', nullable:true})
  lastLogin!: Date;
  
  // add needChangePass

  @OneToMany(() => User, (user) => user.createdBy)
  createdUsers!: User[];

  @OneToMany(() => User, (user) => user.modifiedBy)
  modifiedUsers!: User[];

  @OneToMany(() => User, (user) => user.deletedBy)
  deletedUsers!: User[];

  @ManyToOne(() => Position, (pos) => pos.users)
  @JoinColumn({ name: 'positionId', referencedColumnName: 'id' })
    position!: Position | null;

  @ManyToMany(() => Rule)
  @JoinTable({
    name: 'user_rule',
    joinColumn: {
      name: 'userId',
      referencedColumnName: 'id'
    },
    inverseJoinColumn: {
      name: 'ruleId',
      referencedColumnName: 'id'
    }
  })
  rules!:Rule[]
 

  @AfterInsert()
  async afterInsertHandler() {
      const rulesCreatedSuccessfully = UserService.addUserRulesByPosition(this).then(b=>{
        if(b){
          console.log('Entering afterInsertHandler3');
          console.log(b)
        }});
      }

  private ruleBack() {
    // Add your custom logic to handle the rule creation failure
    console.log("Performing rule back operation...");
  }
    
  constructor(){
    super();
    this.type = EntityType.USER;
  }
  public hashPassword() {
    if(this.password){
    this.password = bcrypt.hashSync(this.password, 8);}
  }

  public makeUsernameAndEmailLowerCase(){
    this.username =this.username.toLowerCase();
    this.email = this.email.toLowerCase(); 
  }
  public checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
    return bcrypt.compareSync(unencryptedPassword, this.password);
  }

  public fillFromModel(model: IUser): void {
    throw new Error('Method not implemented.');
  }

  public addRules(rule:Rule){
    this.rules.push(rule);
  }

  public static getUserJson(user:User){
    return{
      id:user.id,
      uuid:user.uuid
    }
  }
}
