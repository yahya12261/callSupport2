import { IBaseEntity } from "./baseEntity";
import { Position } from "./entities/Position";
import { StatusFlow } from "./entities/Statuses/StatusFlow";
import { Status } from "./entities/Statuses/Status";
import { Service } from "./entities/Service";

export interface IStatusFlow extends IBaseEntity {
    refStatus:Status,
    nextStatuses:Status[],
    position:Position,
    service:Service
}