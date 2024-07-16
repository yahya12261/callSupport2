import { ServerException } from "../../lib/custom-errors";
import APIError from "../global/response/apierror";
import { TestyService } from "../services/TestyService";
import { UserService } from "../services/UserService";
import Template from "../global/response";
import { Request, Response } from "express";
import { DepartmentService } from "../services/DepartmentService";
import { BaseController } from "./BaseController";
import { Department } from "../models/entities/Department";
import { IDepartment } from "../models/Department";
import { EntityType } from "../models/type/EntityType";
import { TypeormOptions } from "../models/TypeormOptions";
class DepartmentController extends BaseController<Department,IDepartment,DepartmentService>{
  option: TypeormOptions = {
    relations:["createdBy"]
  } ;
  entity: EntityType = EntityType.DEPARTMENT;

}

export default DepartmentController;
