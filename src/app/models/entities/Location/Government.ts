import { IsNotEmpty, Length } from 'class-validator';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  Unique,
} from 'typeorm';
import { BaseEntity } from '../baseEntity';
import { User } from '../User';
import { EntityType } from '../../../enum/EntityType';
import { IGovernment } from '../../Locations/Government';
import { Caza } from './Caza';
import { Person } from '../Person';

@Entity()
@Unique(['name'])
export class Government extends BaseEntity{

@Column({type:'varchar'})
public name!:String 

@OneToMany(() => Caza, (caza) => caza.government)
casas!: Caza[];

@OneToMany(() =>Person, (person) =>person.governmentAddress)
personGovernment!: Person[];


constructor(){
  super();
  this.type = EntityType.GOVERNMENT;
}
public fillFromModel(modal:IGovernment): void {
  this.fillEntityFromModel(modal);
}
public updateEntity(entity: BaseEntity): void {
    throw new Error('Method not implemented.');
  }

}