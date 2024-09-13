import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
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