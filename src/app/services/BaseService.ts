import { DeepPartial, getRepository, ObjectType, Repository } from "typeorm";
import { IBaseEntity } from "../models/baseEntity";
import { BaseEntity } from "../models/entities/baseEntity";
import APIError from "../global/response/apierror";
import Err from "../global/response/errorcode";
import { BaseRepository } from "../repository/BaseRepository";
import { EntityType } from "../models/type/EntityType";

abstract class BaseService<T extends BaseEntity, M extends IBaseEntity> implements BaseRepository<T, M> {
    update(model: M): Promise<T | null> {
        throw new Error("Method not implemented.");
    }
    getById(id: number): Promise<T | null> {
        throw new Error("Method not implemented.");
    }
    protected getRepository(): Repository<T> {
        return getRepository(this.getEntityClass() as ObjectType<T>);
    }

    protected abstract getEntityClass(): typeof BaseEntity;

    private entityConstructor: new () => T;

    constructor(entityConstructor: new () => T) {
        this.entityConstructor = entityConstructor;
    }

    async getAll(relations?:string[]): Promise<T[]> {
        try {
            const repository: Repository<T> = this.getRepository();
            console.log(relations);
            const entities: T[] = await repository.find(relations?{relations: relations}:{});
            return entities;
        } catch (e) {
            console.error('Error fetching entities:', e);
            return []; // Return an empty array or handle the error differently
        }
    }

    async add(model: M): Promise<T | null> {
        const repository: Repository<T> = this.getRepository();
        try {
            const entity = new this.entityConstructor();
            // Create an instance of the entity
            entity.fillFromModel(model);
            const saveEntity = await repository.save(entity as DeepPartial<T>);
            return saveEntity;
        } catch (e) {
            console.error('Error adding entity:', e);
            return Promise.reject(new APIError('Already exists', Err.DuplicateRequest));
        }
    }
}

export default BaseService;
