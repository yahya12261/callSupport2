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
      },
    },
  };
  entity: EntityType = EntityType.PERSON;
  constructor() {
   const IPersonKeys = createKeys<IPerson>();
    super(service,
      [
             {
          name: IPersonKeys.firstAr,
          type: FieldTypes.TEXT
        },
            {
            name: IPersonKeys.firstAr,
            type: FieldTypes.TEXT
          },
          {
            name: IPersonKeys.middleAr,
            type: FieldTypes.TEXT
          },
          {
            name: IPersonKeys.lastAr,
            type: FieldTypes.TEXT
          },        {
            name: IPersonKeys.firstEn,
            type: FieldTypes.TEXT
          },
          {
            name: IPersonKeys.middleEn,
            type: FieldTypes.TEXT
          },
          {
            name: IPersonKeys.lastEn,
            type: FieldTypes.TEXT
          },
          {
            name: IPersonKeys.Gender,
            type: FieldTypes.TEXT
          },
          {
            name: IPersonKeys.dob,
            type: FieldTypes.DATE
          },
          {
            name: IPersonKeys.fromMedical,
            type: FieldTypes.BOOLEAN
          },        {
            name: IPersonKeys.nationality,
            type: FieldTypes.TEXT
          },
          {
            name: IPersonKeys.phoneNumber,
            type: FieldTypes.TEXT
          },
          {
            name: IPersonKeys.phoneNumberCode,
            type: FieldTypes.TEXT
          },
          {
            name: IPersonKeys.townAddress,
            type: FieldTypes.TEXT
          },
          {
            name: IPersonKeys.governmentAddress,
            type: FieldTypes.TEXT
          },
          {
            name: IPersonKeys.cazaAddress,
            type: FieldTypes.TEXT
          },
      ],
    );
  }
}

export default PersonController;
