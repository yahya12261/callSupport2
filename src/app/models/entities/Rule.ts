import { Column, Entity, JoinTable, ManyToMany } from "typeorm";
import { BaseEntity } from "./baseEntity";
import { User } from "./User";
import { Position } from "./Position";
import { MethodTypes } from "../../enum/MethodTypes";
import { EntityType } from "../../enum/EntityType";
import { IRule } from "../Rule";

@Entity("rules")
export class Rule extends BaseEntity{

@Column()
public name!:String;

@Column({nullable: true})
public route!:String;

@Column({nullable: true})
public code!:String;

@Column({
    type: "enum",
    enum: Object.values(MethodTypes),
    nullable: true
  })
public methodType!:MethodTypes|null;

@Column({nullable: true})
public methodName!:String;

constructor(){
  super();
}

public fillFromModel(modal:IRule){
  this.fillEntityFromModel(modal);
  this.name = modal.name;
  this.code = modal.code;
  this.methodName = modal.methodName;
  this.methodType = modal.methodType; 
}

}