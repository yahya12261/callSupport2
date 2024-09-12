import { IsNotEmpty, Length } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { BaseEntity } from '../baseEntity';
import { Position } from '../Position';
import { EntityType } from '../../../enum/EntityType';
import { IDepartment } from '../../Department';
import { IBaseEntity } from '../../baseEntity';
import { IStatus } from '../../Status';
import { StatusFlow } from './StatusFlow';

@Entity()
@Unique(['name'])
export class Status extends BaseEntity{

  @Column({type:'varchar'})
  public name!:String 

  @Column({type:'varchar'})
  color!:String

  @ManyToMany(() => StatusFlow, (flow) => flow.nextStatuses)
  next!:StatusFlow[]

 constructor(){
  super();
  this.type = EntityType.STATUS;
}
public fillFromModel(modal:IStatus): void {
  this.fillEntityFromModel(modal);
  this.name = modal.name;
  this.color = modal.color;
  this.next = modal.next;
}

@OneToMany(() => StatusFlow, (sf) => sf.refStatus)
refStatuses!: StatusFlow[];

public updateEntity(entity: BaseEntity): void {
    throw new Error('Method not implemented.');
}
}