import { Person } from "../models/entities/Person";
import { IPerson } from "../models/Person";
import BaseService from "./BaseService";

class PersonService extends BaseService<Person,IPerson> {

    protected getEntityClass(): typeof Person{
      return Person;
  }
  
}

  export { PersonService };