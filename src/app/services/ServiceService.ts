import { Service } from "../models/entities/Service";
import { IService } from "../models/Service";
import BaseService from "./BaseService";

class ServiceService extends BaseService<Service,IService> {
    
    protected getEntityClass(): typeof Service {
      return Service;

    }
  }
  export { ServiceService };