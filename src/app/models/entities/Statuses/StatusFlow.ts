import { AfterInsert, AfterUpdate, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Position } from "../Position";
import { Status } from "./Status";
import { IStatus } from "../../Status";
import { IStatusFlow } from "../../StatusFlow";
import { BaseEntity } from "../baseEntity";
import { EntityType } from "../../../enum/EntityType";
import { Service } from "../Service";
import { StatusFlowService } from "../../../services/Status/StatusFlowService";

@Entity()

export class StatusFlow extends BaseEntity {

  @ManyToOne(() => Status, (status) => status.refStatuses)
  @JoinColumn({ name: "refStatusId", referencedColumnName: "id" })
  refStatus!: Status;

  @ManyToMany(() => Status, (status) =>status.next)
  @JoinTable({
    name: "next-status",
    joinColumn: {
      name: "nextStatusId",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "statusId",
      referencedColumnName: "id",
    },
  })
  nextStatuses!:Status[];

  @ManyToOne(() => Position, (position) => position.statusPosition)
  @JoinColumn({ name: "positionId", referencedColumnName: "id" })
  position!:Position;

  @ManyToOne(() => Service, (service) => service.services)
  @JoinColumn({ name: "serviceId", referencedColumnName: "id" })
  service!:Service;

  constructor(){
    super();
    this.type = EntityType.STAUTSFLOW;
  }
  
  public fillFromModel(modal:IStatusFlow): void {
    this.fillEntityFromModel(modal);
    console.log(modal.nextStatuses);
    this.refStatus = modal.refStatus;
    this.nextStatuses = modal.nextStatuses;
  
    this.position = modal.position;
    this.service = modal.service;
    // this.department = modal.department;
  }
  @AfterInsert()
  async afterInsertHandler() {
    this.nextStatuses.forEach(next=>{
      const flowSuccess = StatusFlowService.addNextStatus(next.id,this.id).then(b=>{
        console.log("flowStatus Added ");
        });
    })
      }
      @AfterUpdate()
      async afterUpdateHandler() {
        const temp = this.nextStatuses;
        StatusFlowService.removeNextStatus(this.id).then(b=>{
          console.log("removed all nextStatus ");
        })
        temp.forEach(next=>{
          const flowSuccess = StatusFlowService.addNextStatus(next.id,this.id).then(b=>{
            console.log("flowStatus Added ");
            });
        })
          }
  private ruleBack() {
    // Add your custom logic to handle the rule creation failure
    console.log("Performing rule back operation...");
  }
  
  public updateEntity(entity: BaseEntity): void {
      throw new Error('Method not implemented.');
  }
}