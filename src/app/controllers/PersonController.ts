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
          name: IPersonKeys.firstAr.toString(),
          type: FieldTypes.TEXT
        },
            {
            name: IPersonKeys.firstAr.toString(),
            type: FieldTypes.TEXT
          },
          {
            name: IPersonKeys.middleAr.toString(),
            type: FieldTypes.TEXT
          },
          {
            name: IPersonKeys.lastAr.toString(),
            type: FieldTypes.TEXT
          },        {
            name: IPersonKeys.firstEn.toString(),
            type: FieldTypes.TEXT
          },
          {
            name: IPersonKeys.middleEn.toString(),
            type: FieldTypes.TEXT
          },
          {
            name: IPersonKeys.lastEn.toString(),
            type: FieldTypes.TEXT
          },
          {
            name: IPersonKeys.Gender.toString(),
            type: FieldTypes.TEXT
          },
          {
            name: IPersonKeys.dob.toString(),
            type: FieldTypes.DATE
          },
          {
            name: IPersonKeys.fromMedical.toString(),
            type: FieldTypes.BOOLEAN
          },        {
            name: IPersonKeys.nationality.toString(),
            type: FieldTypes.TEXT
          },
          {
            name: IPersonKeys.phoneNumber.toString(),
            type: FieldTypes.TEXT
          },
          {
            name: IPersonKeys.phoneNumberCode.toString(),
            type: FieldTypes.TEXT
          },
          {
            name: IPersonKeys.townAddress.toString(),
            type: FieldTypes.TEXT
          },
          {
            name: IPersonKeys.governmentAddress.toString(),
            type: FieldTypes.TEXT
          },
          {
            name: IPersonKeys.cazaAddress.toString(),
            type: FieldTypes.TEXT
          },
      ],
    );
  }
}

export default PersonController;
