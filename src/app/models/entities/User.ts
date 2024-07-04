import * as bcrypt from 'bcryptjs';
import { IsNotEmpty, Length } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { BaseEntity } from './baseEntity';
import { EntityType } from '../type/EntityType';
import { Position } from './Position';

@Entity("user")
@Unique(['email','username'])
export class User extends BaseEntity{

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

  @OneToMany(() => User, (user) => user.createdBy)
  createdUsers!: User[];

  @OneToMany(() => User, (user) => user.modifiedBy)
  modifiedUsers!: User[];

  @OneToMany(() => User, (user) => user.deletedBy)
  deletedUsers!: User[];

  @ManyToOne(() => Position, (pos) => pos.users)
    position!: Position | null;

    // add lastLogin
    // add needChangePass
    
  constructor(){
    super();
    this.type = EntityType.USER;
  }
  public hashPassword() {
    this.password = bcrypt.hashSync(this.password, 8);
  }

  public checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
    return bcrypt.compareSync(unencryptedPassword, this.password);
  }
}
