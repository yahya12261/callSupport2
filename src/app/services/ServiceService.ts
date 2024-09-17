import APIError from "../global/response/apierror";
import Err from "../global/response/errorcode";
import { Service } from "../models/entities/Service";
import { IService } from "../models/Service";
import BaseService from "./BaseService";

class ServiceService extends BaseService<Service,IService> {
    
    protected getEntityClass(): typeof Service {
      return Service;

    }

    async getServiceByName(name:string): Promise<Service | null>{
      try {

        const service = await this.getRepository().findOne({
          where: {
            name,
          },
        });
        if (service) {
          return service;
        } else {
          throw new APIError("service not found", Err.UserNotFound);
        }
      } catch (err) {
        console.log(err);
        throw new APIError("An error occurred", Err.DatabaseError);
      }
    }
  
  }
  export { ServiceService };