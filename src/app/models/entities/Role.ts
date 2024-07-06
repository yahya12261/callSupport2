import { Column, Entity, JoinTable, ManyToMany } from "typeorm";
import { BaseEntity } from "./baseEntity";
import { User } from "./User";
import { Position } from "./Position";
import { MethodTypes } from "../type/MethodTypes";
import { EntityType } from "../type/EntityType";

@Entity("roles")
export class Role extends BaseEntity{

@Column()
public name!:String;

@Column()
public route!:String;

@Column()
public code!:String;

@Column({
    type: "enum",
    enum: Object.values(MethodTypes),
  })
public methodType!:MethodTypes|null;

@Column()
public MethodName!:String;

@ManyToMany(() => User)
@JoinTable()
users!: User[]

@ManyToMany(() => Position)
@JoinTable()
positions!: Position[]

constructor(){
  super();
}

}