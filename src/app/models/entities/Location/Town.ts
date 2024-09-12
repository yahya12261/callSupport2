import { IsNotEmpty, Length } from 'class-validator';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  Unique,
} from 'typeorm';
import { BaseEntity } from '../baseEntity';
import { EntityType } from '../../../enum/EntityType';
import { Caza } from './Caza';
import { ITown } from '../../Locations/Town';

@Entity()
@Unique(['name'])

export class Town extends BaseEntity{

    @Column({type:'varchar'})
    public name!:String 

    @ManyToOne(() => Caza, (caza) => caza.towns)
    @JoinColumn({ name: 'cazaId', referencedColumnName: 'id' })
    caza!:Caza;

    constructor(){
        super();
        this.type = EntityType.TOWN;
      }

      public fillFromModel(modal:ITown): void {
        this.fillEntityFromModel(modal);
        this.name = modal.name;
        this.caza = modal.caza;
      }

      public updateEntity(entity: BaseEntity): void {
          throw new Error('Method not implemented.');
        }
      
}