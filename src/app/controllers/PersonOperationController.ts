import { EntityType } from "../enum/EntityType";
import { FieldTypes } from "../enum/FieldTypes";
import { TypeormOptions } from "../interface/TypeormOptions";
import { createKeys } from "../models/baseEntity";
import { PersonOperation } from "../models/entities/personOperation";
import { IPerson } from "../models/Person";
import { IPersonOperation } from "../models/PersonOperation";
import { PersonOperationService } from "../services/personOperationService";
import { BaseController } from "./BaseController";

const service =  new PersonOperationService(PersonOperation);
class PersonOperationController extends BaseController<PersonOperation,IPersonOperation,PersonOperationService>{
  option: TypeormOptions = {
    relations: {
    },
    join: {
      alias: 'personOperation',
      innerJoinAndSelect: {
        createdBy:'personOperation.createdBy',
        modifiedBy:'personOperation.modifiedBy',
        deletedBy:'personOperation.deletedBy',

        status:"personOperation.status",
        next:'status.next',
        refStatus:'next.refStatus',
        nextStatusesPosition:'next.position',
        nextStatusesService:'next.service',
        nextStatusesNext:'next.nextStatuses',

        person:"personOperation.person",
        government:'person.governmentAddress',
        caza:'person.cazaAddress',

        service:"personOperation.service",



      },
    },
  };
  entity: EntityType = EntityType.PERSONOPERATION;
  constructor() {
    const IPersonOperationKeys = createKeys<IPersonOperation>();
    const IPersonKeys = createKeys<IPerson>();
    super(service,
      [

        {
          name:IPersonOperationKeys.service.toString()+".id",
          type: FieldTypes.NUMBER
        },

        {
            name:IPersonOperationKeys.status.toString()+".id",
            type: FieldTypes.NUMBER
          },
          {
            name:IPersonOperationKeys.person.toString()+".id",
            type: FieldTypes.NUMBER
          },
          {
            name:IPersonOperationKeys.person.toString()+"."+IPersonKeys.phoneNumber.toString(),
            type: FieldTypes.TEXT
          },
          {
            name:IPersonOperationKeys.assignTo.toString()+".id",
            type: FieldTypes.NUMBER
          },
          {
            name:IPersonOperationKeys.reporter.toString()+".id",
            type: FieldTypes.NUMBER
          },
      ],
    );
  }
}

export default PersonOperationController;
