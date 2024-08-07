import { Between, DeepPartial, getRepository, In, IsNull, LessThan, LessThanOrEqual, Like, MoreThan, MoreThanOrEqual, Not, ObjectType, Repository } from "typeorm";
import { IBaseEntity } from "../models/baseEntity";
import { BaseEntity } from "../models/entities/baseEntity";
import APIError from "../global/response/apierror";
import Err from "../global/response/errorcode";
import { BaseRepository } from "../repository/BaseRepository";
import { EntityType } from "../enum/EntityType";
import { RequestElement } from "../interface/RequestElement";
import { ResponseElement } from "../interface/ResponseElement";
import { OrderByOperation } from "../enum/OrderByOperation";
import { QueryOperator } from "../enum/WhereOperations";
import { FieldTypes } from "../enum/FieldTypes";

abstract class BaseService<T extends BaseEntity, M extends IBaseEntity>
  implements BaseRepository<T, M>
{
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

  async getAll(
    requestElement: RequestElement
  ): Promise<{ result: ResponseElement<T> }> {
    try {
      const repository: Repository<T> = this.getRepository();
      // console.log(requestElement.relations);
      requestElement.page = requestElement.page ? requestElement.page : 1;
      requestElement.pageSize = requestElement.pageSize
        ? requestElement.pageSize
        : 20;
      const order: Record<string, "ASC" | "DESC"> =
        this.buildOrder(requestElement);
      const whereConditions: Record<string, any> =
        this.buildWhereConditions(requestElement);

      const [data, total] = await repository.findAndCount({
        relations: requestElement.relations ?? [],
        where: whereConditions,
        skip: Math.abs((requestElement.page - 1) * requestElement.pageSize),
        take: requestElement.pageSize,
        order,
      });
      // console.log(data)
      const result: ResponseElement<T> = {
        data: data,
        currentPage: requestElement.page,
        total: total,
        pageSize: requestElement.pageSize,
      };
      return {
        result,
      };
    } catch (e) {
      console.error("Error fetching entities:", e);
      const result: ResponseElement<T> = {
        data: [],
        currentPage: 0,
        total: 0,
        pageSize: requestElement.pageSize,
      };
      return {
        result,
      };
    }
  }

  async getSelectOption(): Promise<T[]> {
    try {
      const repository: Repository<T> = this.getRepository();
      const data = await repository.find({
        where: { isActive: true },
        select: ["id", "arabicLabel"],
      });
      return data;
    } catch (e) {
      console.error("Error fetching entities:", e);
      return Promise.reject(
        new APIError("cann't fetch data" + e, Err.UndefinedCode)
      );
    }
  }
  protected buildWhereConditions(
    requestElement: RequestElement
  ): Record<string, any> {
    const whereConditions: Record<string, unknown> = {};

    if (requestElement.search) {
      requestElement.search.forEach((searchField) => {
        const { name, type, operation, value } = searchField;
        if (value) {
          const fieldNames = name.split(".");
          let currentConditions = whereConditions;

          for (let i = 0; i < fieldNames.length; i++) {
            const fieldName = fieldNames[i];

            if (i === fieldNames.length - 1) {
              // Last field name, apply the condition
              switch (operation) {
                case QueryOperator.EQUAL:
                  currentConditions[fieldName] = value;
                  break;
                case QueryOperator.NOT_EQUAL:
                  currentConditions[fieldName] = Not(value);
                  break;
                case QueryOperator.GREATER_THAN:
                  currentConditions[fieldName] = MoreThan(value);
                  break;
                case QueryOperator.GREATER_THAN_OR_EQUAL:
                  currentConditions[fieldName] = MoreThanOrEqual(value);
                  break;
                case QueryOperator.LESS_THAN:
                  currentConditions[fieldName] = LessThan(value);
                  break;
                case QueryOperator.LESS_THAN_OR_EQUAL:
                  currentConditions[fieldName] = LessThanOrEqual(value);
                  break;
                case QueryOperator.LIKE:
                  currentConditions[fieldName] = Like(`%${value}%`);
                  break;
                case QueryOperator.ILIKE:
                  currentConditions[fieldName] = Like(`%${value}%`);
                  break;
                case QueryOperator.NOT_LIKE:
                  currentConditions[fieldName] = Not(Like(`%${value}%`));
                  break;
                case QueryOperator.NOT_ILIKE:
                  currentConditions[fieldName] = Not(Like(`%${value}%`));
                  break;
                case QueryOperator.BEGINS_WITH:
                  currentConditions[fieldName] = Like(`${value}%`);
                  break;
                case QueryOperator.ENDS_WITH:
                  currentConditions[fieldName] = Like(`%${value}`);
                  break;
                case QueryOperator.IN:
                  currentConditions[fieldName] = In(
                    value + "".split(",").map((v) => v.trim())
                  );
                  break;
                case QueryOperator.NOT_IN:
                  currentConditions[fieldName] = Not(
                    In(value + "".split(",").map((v) => v.trim()))
                  );
                  break;
                case QueryOperator.BETWEEN:
                    const [start, end] = value.split(',').map((v:string) => v.trim());
                  currentConditions[fieldName] = Between(start, end);
                  break;
                case QueryOperator.NOT_BETWEEN:
                  const [notStart, notEnd] =
                    value + "".split(",").map((v) => v.trim());
                  currentConditions[fieldName] = Not(Between(notStart, notEnd));
                  break;
                case QueryOperator.IS:
                  currentConditions[fieldName] = IsNull();
                  break;
                case QueryOperator.IS_NOT:
                  currentConditions[fieldName] = Not(IsNull());
                  break;
                default:
                  break;
              }
            } else {
              // Nested field, create a new object to hold the condition
              if (!currentConditions[fieldName]) {
                currentConditions[fieldName] = {};
              }
              currentConditions = currentConditions[fieldName] as Record<
                string,
                unknown
              >;
            }
          }
        }
      });
    }

    console.log(whereConditions);
    return whereConditions;
  }
  protected buildOrder(
    requestElement: RequestElement
  ): Record<string, "DESC" | "ASC"> {
    const order: Record<string, "DESC" | "ASC"> = {};
    const orderBy = requestElement.orderBy
      ?.split(",")
      .map((field) => field.trim()) ?? ["createdAt"];
    orderBy.forEach((field) => {
      order[field] = requestElement.order;
    });
    return order;
  }
  async add(model: M): Promise<T | null> {
    const repository: Repository<T> = this.getRepository();
    try {
      const entity = new this.entityConstructor();
      // Create an instance of the entity
      entity.fillFromModel(model);
      console.log(model);
      const saveEntity = await repository.save(entity as DeepPartial<T>);
      return saveEntity;
    } catch (e) {
      console.error("Error adding entity:", e);
      return Promise.reject(
        new APIError("Already exists", Err.DuplicateRequest)
      );
    }
  }
  async update<U extends T>(model: Partial<U>): Promise<U | null> {
    const repository: Repository<T> = this.getRepository();
    try {
      if (model.id) {
        const existingEntity = await repository.findOne({ id: model.id });
        if (!existingEntity) {
          return Promise.reject(new APIError("غير موجود", Err.UndefinedCode));
        }
        Object.keys(model).forEach((key) => {
          (existingEntity as U)[key as keyof U] =
            model[key as keyof U] ?? (existingEntity as U)[key as keyof U];
        });
        const updatedEntity = await repository.save(
          existingEntity as DeepPartial<T>
        );
        return updatedEntity as U;
      } else if (model.uuid) {
        const existingEntity = await repository.findOne({ uuid: model.uuid });
        if (!existingEntity) {
          return Promise.reject(new APIError("غير موجود", Err.UndefinedCode));
        }
        Object.keys(model).forEach((key) => {
          (existingEntity as U)[key as keyof U] =
            model[key as keyof U] ?? (existingEntity as U)[key as keyof U];
        });
        const updatedEntity = await repository.save(
          existingEntity as DeepPartial<T>
        );
        return updatedEntity as U;
      } else {
        return Promise.reject(
          new APIError("primary Key not exist", Err.UndefinedCode)
        );
      }
    } catch (e) {
      console.error("Error updating entity:", e);
      return Promise.reject(
        new APIError("Failed to update entity " + e, Err.UndefinedCode)
      );
    }
  }
}

export default BaseService;
