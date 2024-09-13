import { IBaseEntity } from "./baseEntity";
import { Person } from "./entities/Person";
import { Service } from "./entities/Service";
import { Status } from "./entities/Statuses/Status";
import { User } from "./entities/User";

export interface IPersonOperation extends IBaseEntity {
    service:Service
    person:Person
    status:Status
    assignTo:User
    reporter:User
}