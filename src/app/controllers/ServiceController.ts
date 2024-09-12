import { EntityType } from "../enum/EntityType";
import { FieldTypes } from "../enum/FieldTypes";
import { TypeormOptions } from "../interface/TypeormOptions";
import { Service } from "../models/entities/Service";
import { IService } from "../models/Service";
import { ServiceService } from "../services/ServiceService";
import { BaseController } from "./BaseController";

const service =  new ServiceService(Service);
class ServiceController extends BaseController<Service,IService,ServiceService>{
  option: TypeormOptions = {
    relations: {
    },
    join: {
      alias: 'service',
      innerJoinAndSelect: {
        createdBy:'service.createdBy',
        modifiedBy:'service.modifiedBy',
        deletedBy:'service.deletedBy',
      },
    },
  };
  entity: EntityType = EntityType.SERVICE;
  constructor() {
    super(service,
      [
        {
          name: 'name',
          type: FieldTypes.TEXT
        },
      ],
    );
  }
}

export default ServiceController;