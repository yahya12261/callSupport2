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
import { Position } from './Position';
import { EntityType } from '../type/EntityType';

@Entity("departments")
@Unique(['name'])
export class Department extends BaseEntity{
    
@Column({type:'varchar'})
public name!:String 

@OneToMany(() => Position, (pos) => pos.department)
positions!: Position[];

constructor(){
  super();
  this.type = EntityType.DEPARTMENT;
}


}