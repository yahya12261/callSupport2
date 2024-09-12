import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, Unique } from "typeorm";
import { BaseEntity } from "./baseEntity";
import { User } from "./User";
import { Position } from "./Position";
import { MethodTypes } from "../../enum/MethodTypes";
import { EntityType } from "../../enum/EntityType";
import { IRule } from "../Rule";
import { IService } from "../Service";
import { StatusFlow } from "./Statuses/StatusFlow";

@Entity()
@Unique(['name'])
export class Service extends BaseEntity{

@Column()
public name!:String;

@OneToMany(() => StatusFlow, (sf) => sf.service)
services!: StatusFlow[];

constructor(){
  super();
  this.type = EntityType.SERVICE;
}
public fillFromModel(modal:IService){
  this.fillEntityFromModel(modal);
  this.name = modal.name;
}

public updateEntity(entity: BaseEntity): void {
    throw new Error("Method not implemented.");
  }
  

}