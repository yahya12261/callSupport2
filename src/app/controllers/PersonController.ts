import { Interface } from "readline";
import { EntityType } from "../enum/EntityType";
import { FieldTypes } from "../enum/FieldTypes";
import { TypeormOptions } from "../interface/TypeormOptions";
import { createKeys, getNameFromPriority } from "../models/baseEntity";
import { Person } from "../models/entities/Person";
import { IPerson } from "../models/Person";
import { PersonService } from "../services/personService";
import { BaseController } from "./BaseController";

const service =  new PersonService(Person);
class PersonController extends BaseController<Person,IPerson,PersonService>{
    
  option: TypeormOptions = {
    relations: {
    },
    join: {
      alias: 'person',
      innerJoinAndSelect: {
        createdBy:'person.createdBy',
        modifiedBy:'person.modifiedBy',
        deletedBy:'person.deletedBy',
        government:'person.governmentAddress',
        caza:'person.cazaAddress'   
      },
    },
  };
  entity: EntityType = EntityType.PERSON;
  constructor() {
   const IPersonKeys = createKeys<IPerson>();
   
    super(service,
      [
             {
          name:"firstAr",
          type: FieldTypes.TEXT
        },
          {
            name: "middleAr",
            type: FieldTypes.TEXT
          },
          {
            name: "lastAr",
            type: FieldTypes.TEXT
          },        
          {
            name: "firstEn",
            type: FieldTypes.TEXT
          },
          {
            name: "middleEn",
            type: FieldTypes.TEXT
          },
          {
            name:"lastEn",
            type: FieldTypes.TEXT
          },
          {
            name:"Gender",
            type: FieldTypes.TEXT
          },
          {
            name:"dob",
            type: FieldTypes.DATE
          },
          {
            name: "fromMedical",
            type: FieldTypes.BOOLEAN
          },        
          {
            name: "nationality",
            type: FieldTypes.TEXT
          },
          {
            name: "phoneNumber",
            type: FieldTypes.TEXT
          },
          {
            name:"phoneNumberCode",
            type: FieldTypes.TEXT
          },
          {
            name:"townAddress",
            type: FieldTypes.TEXT
          },
          {
            name:"governmentAddress",
            type: FieldTypes.TEXT
          },
          {
            name:"cazaAddress",
            type: FieldTypes.TEXT
          },
      ],
    );
  }
}

export default PersonController;
