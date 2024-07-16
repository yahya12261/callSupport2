import { IsNotEmpty, Length } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
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
import { IPosition } from '../Position';
import { Rule } from './Rule';

@Entity("positions")
@Unique(['name'])
export class Position extends BaseEntity{
    
@Column({type:'varchar'})
public name!:String 

@ManyToOne(() => Department, (dep) => dep.positions)
department!: Department | null;

@OneToMany(() => User, (user) => user.position)
users!: User[];

@ManyToMany(() => Rule)
@JoinTable()
rules!: Rule[]

constructor(){
  super();
  this.type = EntityType.POSITION;
}
public fillFromModel(modal:IPosition): void {
  this.fillEntityFromModel(modal);
  this.name = modal.name;
  this.department = modal.department;
}
}