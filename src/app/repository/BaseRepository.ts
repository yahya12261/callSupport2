import { RequestElement } from "../interface/RequestElement";
import { ResponseElement } from "../interface/ResponseElement";
import { IBaseEntity } from "../models/baseEntity";
import { BaseEntity } from "../models/entities/baseEntity";

export interface BaseRepository<T extends BaseEntity,M extends IBaseEntity> {
    getAll(requestElement:RequestElement): Promise<{result:ResponseElement<T>}>;
    add(model:M): Promise<T | null>;
    update<U extends T>(model: Partial<U>): Promise<U | null> ;
    getById(id: number): Promise<T | null>;
}