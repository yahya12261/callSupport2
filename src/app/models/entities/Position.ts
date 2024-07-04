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
import { Department } from './Department';
import { User } from './User';
import { EntityType } from '../type/EntityType';

@Entity("position")
@Unique(['name'])
export class Position extends BaseEntity{
    
@Column({type:'varchar'})
public name!:String 

@ManyToOne(() => Department, (dep) => dep.positions)
department!: Department | null;

@OneToMany(() => User, (user) => user.position)
users!: User[];

constructor(){
  super();
  this.type = EntityType.POSITION;
}

}