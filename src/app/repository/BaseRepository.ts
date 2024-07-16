import { IBaseEntity } from "../models/baseEntity";
import { BaseEntity } from "../models/entities/baseEntity";

export interface BaseRepository<T extends BaseEntity,M extends IBaseEntity> {
    getAll(): Promise<T[] | null>;
    add(model:M): Promise<T | null>;
    update(model: M): Promise<T | null>;
    getById(id: number): Promise<T | null>;
}