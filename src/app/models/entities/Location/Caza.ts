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
import { Government } from './Government';
import { Town } from './Town';
import { ICaza } from '../../Locations/Caza';
@Entity()
@Unique(['name'])
export class Caza extends BaseEntity{

    @Column({type:'varchar'})
    public name!:String 

    @ManyToOne(() => Government, (gov) => gov.casas)
    @JoinColumn({ name: 'governmentId', referencedColumnName: 'id' })
    government!:Government;

    @OneToMany(() => Town, (town) => town.caza)
    towns!: Town[];


    constructor(){
        super();
        this.type = EntityType.GOVERNMENT;
      }
      public fillFromModel(modal:ICaza): void {
        this.fillEntityFromModel(modal);
      }
      public updateEntity(entity: BaseEntity): void {
          throw new Error('Method not implemented.');
        }
      
}