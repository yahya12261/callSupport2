import { IsNotEmpty, Length } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { BaseEntity } from './baseEntity';
import { Position } from './Position';
import { EntityType } from '../../enum/EntityType';
import { IDepartment } from '../Department';

@Entity()
@Unique(['name'])
export class Department extends BaseEntity{


    
@Column({type:'varchar'})
public name!:String 

@OneToMany(() => Position, (position) => position.department)
positions!: Position[];

constructor(){
  super();
  this.type = EntityType.DEPARTMENT;

}
public fillFromModel(modal:IDepartment,isUpdate?:boolean): void {
  this.fillEntityFromModel(modal,isUpdate);
  if(!isUpdate){
    this.name = modal.name;
  }

}
public updateEntity(entity: BaseEntity): void {
  this.updateBaseEntity(entity);
  this.positions = this.positions;
}

}