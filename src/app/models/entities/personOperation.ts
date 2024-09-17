import { BeforeInsert, Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { BaseEntity } from "./baseEntity";
import { IBaseEntity } from "../baseEntity";
import { Length } from "class-validator";
import { Gender } from "../../enum/Gender";
import { Nationality } from "../../enum/Nationality";
import { Government } from "./Location/Government";
import { Caza } from "./Location/Caza";
import { IPerson } from "../Person";
import { Service } from "./Service";
import { Person } from "./Person";
import { Status } from "./Statuses/Status";
import { User } from "./User";
import { IPersonOperation } from "../PersonOperation";
import { PersonService } from "../../services/personService";
import ServiceController from "../../controllers/ServiceController";
import { IService } from "../Service";
import {  ServiceService } from "../../services/ServiceService";
import { StatusService } from "../../services/Status/StatusService";
const personServices = new PersonService(Person);

@Entity()
// @Unique(['name'])
export class PersonOperation extends BaseEntity{
    
    
    @ManyToOne(() => Service, (service) =>service.personOperation)
    @JoinColumn({ name: 'serviceId', referencedColumnName: 'id' })
    service!: Service;

    @ManyToOne(() => Person, (person) =>person.personOperation)
    @JoinColumn({ name: 'personId', referencedColumnName: 'id' })
    person!:Person;
    
    @ManyToOne(() => Status, (status) =>status.personOperation)
    @JoinColumn({ name: 'statusId', referencedColumnName: 'id' })
    status!:Status;
    
    @ManyToOne(() => User, (user) =>user.assignOperation)
    @JoinColumn({ name: 'assignToId', referencedColumnName: 'id' })
    assignTo!:User;

    @ManyToOne(() => User, (user) =>user.reporterOperation)
    @JoinColumn({ name: 'reporterId', referencedColumnName: 'id' })
    reporter!:User;

    @BeforeInsert()
    async beforeInsert() {
// create new Person
        if(!this.person.id){
            await PersonService.createPerson(this.person).then(person=>{
                if(person){
                    this.person = person;
                    console.log("new Person Created")
                }
              })
        }
        const statusService = new StatusService(Status);
        // set New Service
            await statusService.getOrCreateOpenStatusByName().then(sts=>{
           if(sts){
            this.status = sts;
           }
        })
        
        // if(this.createdBy){
        //     this.assignTo = this.createdBy;
        // }

            //set Reporter
        if(this.service.id){
            const serviceService = new ServiceService(Service)
           const fetchedService  =  await serviceService.getById(this.service.id,["reporter"])
          
           if(fetchedService){
            console.log(fetchedService);
            this.reporter = fetchedService.reporter;
           }
        }

    }
        
    public updateEntity(entity: BaseEntity): void {
        throw new Error("Method not implemented.");
    }
    public fillFromModel(model: IPersonOperation): void {
        this.fillEntityFromModel(model);
        this.service =model.service;
        this.person = model.person;
        this.status = model.status;
        this.assignTo = model.assignTo;
        this.reporter = model.reporter;
    }

}