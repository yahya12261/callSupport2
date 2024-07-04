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

@Entity("department")
@Unique(['name'])
export class Department extends BaseEntity{
    
@Column({type:'varchar'})
public name!:String 

@OneToMany(() => Position, (pos) => pos.department)
positions!: Position[];




}