import { PersonOperation } from "../models/entities/personOperation";
import { IPersonOperation } from "../models/PersonOperation";
import BaseService from "./BaseService";

class PersonOperationService extends BaseService<
  PersonOperation,
  IPersonOperation
> {
  protected getEntityClass(): typeof PersonOperation {
    return PersonOperation;
  }
}

export { PersonOperationService };
