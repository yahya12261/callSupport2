import { IsNotEmpty, Length } from 'class-validator';
import {
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
import { Department } from './Department';
import { User } from './User';
import { EntityType } from '../../enum/EntityType';
import { IPosition } from '../Position';
import { Rule } from './Rule';
import { Status } from './Statuses/Status';
import { StatusFlow } from './Statuses/StatusFlow';

@Entity()
@Unique(['name'])
export class Position extends BaseEntity{
public updateEntity(entity: BaseEntity): void {
  throw new Error('Method not implemented.');
}
    
@Column({type:'varchar'})
public name!:String 

@ManyToOne(() => Department, (department) => department.positions)
@JoinColumn({ name: 'departmentId', referencedColumnName: 'id' })
department!: Department;

@OneToMany(() => User, (user) => user.position)
users!: User[];

@OneToMany(() => StatusFlow, (sf) => sf.position)
statusPosition!: StatusFlow[];

@ManyToMany(() => Rule, (rule) => rule.positionRules)
@JoinTable({
  name: 'position_rule',
  joinColumn: {
    name: 'positionId',
    referencedColumnName: 'id'
  },
  inverseJoinColumn: {
    name: 'ruleId',
    referencedColumnName: 'id'
  }
})
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

public addRules(rule:Rule){
  this.rules.push(rule);
}

}