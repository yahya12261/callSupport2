import { Between, DeepPartial, FindManyOptions, FindOperator, getRepository, In, IsNull, LessThan, LessThanOrEqual, Like, MoreThan, MoreThanOrEqual, Not, ObjectType, Repository } from "typeorm";
import { IBaseEntity } from "../models/baseEntity";
import { BaseEntity } from "../models/entities/baseEntity";
import APIError from "../global/response/apierror";
import Err from "../global/response/errorcode";
import { BaseRepository } from "../repository/BaseRepository";
import { EntityType } from "../enum/EntityType";
import { RequestElement } from "../interface/RequestElement";
import { ResponseElement } from "../interface/ResponseElement";
import { OrderByOperation } from "../enum/OrderByOperation";
import { getComparisonSymbol, QueryOperator } from "../enum/WhereOperations";
import { FieldTypes } from "../enum/FieldTypes";
import { RelationOptions } from "../interface/RelationOptions";
import { SearchFields } from "../interface/SearchFields";
import { QueryOrder } from "../interface/QueryOrder";
import { ExceptionHandler } from "winston";
import { ErrorCallback } from "typescript";

abstract class BaseService<T extends BaseEntity, M extends IBaseEntity>
  implements BaseRepository<T, M>
{
  getById(id: number): Promise<T | null> {
    throw new Error("Method not implemented.");
  }

  async findByUUID(uuid: string): Promise<T | null> {
    const repository: Repository<T> = this.getRepository();
    try {
      const object = await repository.findOne({
        where: { uuid: uuid },
      });
      return object as T;
    } catch (e:any) {
      return Promise.reject(
        new APIError(e.message, Err.UndefinedCode)
      );
    }
  }
  async disable(uuid: string): Promise<T | null> {
    const repository: Repository<T> = this.getRepository();
    try {
      let object = await repository.findOne({
        where: { uuid: uuid },
      });
      if(object){
        object.isActive = false;
        await repository.save(object as DeepPartial<T>);
      }
      return object as T;
    } catch (e:any) {
      return Promise.reject(
        new APIError(e.message, Err.UndefinedCode)
      );
    }
  }
  protected getRepository(): Repository<T> {
    return getRepository(this.getEntityClass() as ObjectType<T>);
  }

  protected abstract getEntityClass(): typeof BaseEntity;
  private readonly defaultLimit = 10;
  private readonly maxLimit = 100;
  private entityConstructor: new () => T;

  constructor(entityConstructor: new () => T) {
    this.entityConstructor = entityConstructor;
  }

  // async getAll(
  //   requestElement: RequestElement
  // ): Promise<{ result: ResponseElement<T> }> {
  //   try {
  //     const repository: Repository<T> = this.getRepository();
  //     requestElement.page = requestElement.page ? requestElement.page : 1;
  //     requestElement.pageSize = requestElement.pageSize
  //       ? requestElement.pageSize
  //       : 20;
  //     const order: Record<string, "ASC" | "DESC"> = this.buildOrder(requestElement);
  //     const whereConditions: Record<string, any> = {
  //       ...this.buildWhereConditions(requestElement),
  //     };

  //     const findOptions: FindManyOptions<T> = {
  //       skip: Math.abs((requestElement.page - 1) * requestElement.pageSize),
  //       take: requestElement.pageSize,
  //       order,
  //       where: whereConditions,
  //     };
  //     if (requestElement.relations) {
  //       findOptions.relations = Object.keys(requestElement.relations);
  //     }

  //     if (requestElement.join) {
  //       findOptions.join = requestElement.join;
  //     }

  //     const [data, total] = await repository.findAndCount(findOptions);

  //     const result: ResponseElement<T> = {
  //       data: data,
  //       currentPage: requestElement.page,
  //       total: total,
  //       pageSize: requestElement.pageSize,
  //     };
  //     return {
  //       result,
  //     };
  //   } catch (e) {
  //     console.error("Error fetching entities:", e);
  //     const result: ResponseElement<T> = {
  //       data: [],
  //       currentPage: 0,
  //       total: 0,
  //       pageSize: requestElement.pageSize,
  //     };
  //     return {
  //       result,
  //     };
  //   }
  // }
  // async getAll(
  //   requestElement: RequestElement
  // ): Promise<{ result: ResponseElement<T> }> {
  //   try {
  //     const repository: Repository<T> = this.getRepository();
  //     requestElement.page = requestElement.page ? requestElement.page : 1;
  //     requestElement.pageSize = requestElement.pageSize
  //       ? requestElement.pageSize
  //       : 20;
  //     const order: Record<string, "ASC" | "DESC"> = this.buildOrder(requestElement);
  //     const whereConditions: Record<string, any> = {
  //       ...this.buildWhereConditions(requestElement),
  //     };

  //     const findOptions: FindManyOptions<T> = {
  //       skip: Math.abs((requestElement.page - 1) * requestElement.pageSize),
  //       take: requestElement.pageSize,
  //       order,
  //       where: whereConditions,
  //     };
  //     if (requestElement.relations) {
  //       findOptions.relations = Object.keys(requestElement.relations);
  //     }

  //     if (requestElement.join) {
  //       findOptions.join = requestElement.join;
  //     }

  //     const [data, total] = await repository.findAndCount(findOptions);

  //     const result: ResponseElement<T> = {
  //       data: data,
  //       currentPage: requestElement.page,
  //       total: total,
  //       pageSize: requestElement.pageSize,
  //     };
  //     return {
  //       result,
  //     };
  //   } catch (e) {
  //     console.error("Error fetching entities:", e);
  //     const result: ResponseElement<T> = {
  //       data: [],
  //       currentPage: 0,
  //       total: 0,
  //       pageSize: requestElement.pageSize,
  //     };
  //     return {
  //       result,
  //     };
  //   }
  // }

  async getAll(
    requestElement: RequestElement
  ): Promise<{ result: ResponseElement<T> }> {
    try {
      const repository: Repository<T> = this.getRepository();
      requestElement.page = requestElement.page ? requestElement.page : 1;
      requestElement.pageSize = requestElement.pageSize
        ? requestElement.pageSize
        : 20;
      const order: Record<string, "ASC" | "DESC"> =
        this.buildOrder(requestElement);
      console.log(order);
      console.log(requestElement.join);
      const whereConditions: Record<string, any> = {
        ...this.buildWhereConditions(requestElement),
      };
      let entity = requestElement.join?.alias;
      const queryBuilder = repository.createQueryBuilder(entity);
      Object.keys(whereConditions).forEach((key) => {
        const condition = whereConditions[key];
        if (getComparisonSymbol(condition._type) === "BETWEEN") {
          if (
            Array.isArray(condition._value) &&
            condition._value.length === 2
          ) {
            queryBuilder.andWhere(
              `${entity}.${key} ${getComparisonSymbol(
                condition._type
              )} :val1 AND :val2`,
              {
                ["val1"]: condition._value[0],
                ["val2"]: condition._value[1],
              }
            );
          } else {
            queryBuilder.andWhere(
              `${entity}.${key} ${getComparisonSymbol(
                condition._type
              )} :${key}`,
              { [key]: condition._value }
            );
          }
        } else if (typeof condition === "object") {
          Object.keys(condition).forEach((nestedKey) => {
            queryBuilder.andWhere(
              `${key}.${nestedKey} = :${key}_${nestedKey}`,
              { [`${key}_${nestedKey}`]: condition[nestedKey] }
            );
          });
        } else {
          queryBuilder.andWhere(`${entity}.${key} = :${key}`, {
            [key]: condition,
          });
        }
      });

      // Apply order
      Object.keys(order).forEach((key) => {
        console.log(`${entity}.${key}`);
        queryBuilder.addOrderBy(`${entity}.${key}`, order[key]);
      });

      // Apply pagination
      queryBuilder.skip(
        Math.abs((requestElement.page - 1) * requestElement.pageSize)
      );
      queryBuilder.take(requestElement.pageSize);

      // Apply relations
      if (requestElement.relations) {
        Object.keys(requestElement.relations).forEach((relation) => {
          queryBuilder.leftJoinAndSelect(`${entity}.${relation}`, relation);
        });
      }

      // Apply joins
      if (requestElement.join) {
        Object.keys(requestElement.join.innerJoinAndSelect).forEach(
          (joinAlias) => {
            if (requestElement.join)
              queryBuilder.leftJoinAndSelect(
                requestElement.join.innerJoinAndSelect[joinAlias],
                joinAlias
              );
          }
        );
      }

      const [data, total] = await queryBuilder.getManyAndCount();

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
                  console.log(value);
                  const [start, end] = value
                    .split(",")
                    .map((v: string) => v.trim());
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
  // async getDynamicData(
  //   requestElement: RequestElement
  // ): Promise<any[]> {
  //   const repository = this.getRepository();
  //   const results: any[] = [];

  //   if (requestElement.search) {
  //     for (const searchField of requestElement.search) {
  //       if (searchField.queryConfig) {
  //         let queryBuilder = repository.createQueryBuilder(searchField.queryConfig.alias);

  //         for (const relation of searchField.queryConfig.relations) {
  //           queryBuilder = queryBuilder.innerJoin(`${searchField.queryConfig.alias}.${relation}`, relation);
  //         }

  //         const whereParams: { [key: string]: any } = {};
  //         searchField.queryConfig.whereValues.forEach((value, index) => {
  //           whereParams[`whereValue${index}`] = value;
  //         });

  //         queryBuilder = queryBuilder
  //           .where(searchField.queryConfig.whereClause, whereParams)
  //           .select(searchField.queryConfig.selectColumns);

  //         const result = await queryBuilder.getRawMany();

  //         result.forEach(row => {
  //           const rowData: any = {};
  //           if(searchField.queryConfig)
  //           for (const column of searchField.queryConfig.selectColumns) {
  //             const parts = column.split('.');
  //             let value = row;
  //             for (const part of parts) {
  //               value = value[part];
  //             }
  //             rowData[column.replace('.', '_')] = value;
  //           }
  //           results.push(rowData);
  //         });
  //       }
  //     }
  //   }

  //   return results;
  // }
  // protected buildWhereConditions(
  //   requestElement: RequestElement
  // ): Record<string, any> {
  //   const whereConditions: Record<string, unknown> = {};

  //   if (requestElement.search) {
  //     requestElement.search.forEach((searchField) => {
  //       this.addSearchCondition(whereConditions, searchField);
  //     });
  //   }

  //   return whereConditions;
  // }

  // private addSearchCondition(
  //   whereConditions: Record<string, unknown>,
  //   searchField: SearchFields
  // ): void {
  //   const { name, type, operation, value } = searchField;

  //   if (value) {
  //     const fieldNames = name.split(".");
  //     let currentConditions = whereConditions;

  //     for (let i = 0; i < fieldNames.length; i++) {
  //       const fieldName = fieldNames[i];

  //       if (i === fieldNames.length - 1) {
  //         // Last field name, apply the condition
  //         switch (operation) {
  //           case QueryOperator.EQUAL:
  //             currentConditions[fieldName] = value;
  //             break;
  //           case QueryOperator.NOT_EQUAL:
  //             currentConditions[fieldName] = { $ne: value };
  //             break;
  //           case QueryOperator.GREATER_THAN:
  //             currentConditions[fieldName] = { $gt: value };
  //             break;
  //           case QueryOperator.GREATER_THAN_OR_EQUAL:
  //             currentConditions[fieldName] = { $gte: value };
  //             break;
  //           case QueryOperator.LESS_THAN:
  //             currentConditions[fieldName] = { $lt: value };
  //             break;
  //           case QueryOperator.LESS_THAN_OR_EQUAL:
  //             currentConditions[fieldName] = { $lte: value };
  //             break;
  //           case QueryOperator.LIKE:
  //             currentConditions[fieldName] = { $regex: new RegExp(value, "i") };
  //             break;
  //           case QueryOperator.IN:
  //             currentConditions[fieldName] = { $in: value.split(",").map(v => v.trim()) };
  //             break;
  //           case QueryOperator.BETWEEN:
  //             const [start, end] = value.split(",").map(v => v.trim());
  //             currentConditions[fieldName] = { $gte: start, $lte: end };
  //             break;
  //           default:
  //             break;
  //         }
  //       } else {
  //         // Nested field, create a new object to hold the condition
  //         if (!currentConditions[fieldName]) {
  //           currentConditions[fieldName] = {};
  //         }
  //         currentConditions = currentConditions[fieldName] as Record<
  //           string,
  //           unknown
  //         >;
  //       }
  //     }
  //   }
  // }

  private getSkipCount(page: number, limit: number): number {
    return (page - 1) * this.getNormalizedLimit(limit);
  }

  private getNormalizedLimit(limit?: number): number {
    return limit ? Math.min(limit, this.maxLimit) : this.defaultLimit;
  }
}


export default BaseService;
