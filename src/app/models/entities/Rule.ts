import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne } from "typeorm";
import { BaseEntity } from "./baseEntity";
import { User } from "./User";
import { Position } from "./Position";
import { MethodTypes } from "../../enum/MethodTypes";
import { EntityType } from "../../enum/EntityType";
import { IRule } from "../Rule";

@Entity()
export class Rule extends BaseEntity{
public updateEntity(entity: BaseEntity): void {
  throw new Error("Method not implemented.");
}

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


@ManyToMany(() => Rule, (rule) => rule.rules)
@JoinTable({
  name: 'rule_rules',
  joinColumn: {
    name: 'pageId',
    referencedColumnName: 'id'
  },
  inverseJoinColumn: {
    name: 'apiId',
    referencedColumnName: 'id'
  }
})
rules!: Rule[];

@Column({default:false})
public isDefault!:boolean;


@ManyToMany(() => Position, (pos) => pos.rules)
  positionRules!: Position[];

constructor(){
  super();
  this.type = EntityType.PAGE;
}
public fillFromModel(modal:IRule){
  this.fillEntityFromModel(modal);
  this.name = modal.name;
  this.code = modal.code;
  this.methodName = modal.methodName;
  this.methodType = modal.methodType; 
  this.isDefault = modal.isDefault;
}
public addRules(rule: Rule) {
  // Check if the rule already exists in the rules array
  if (!this.rules.some((r) => r.id === rule.id)) {
    this.rules.push(rule);
  }
}

}