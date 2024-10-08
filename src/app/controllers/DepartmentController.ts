import { ServerException } from "../../lib/custom-errors";
import APIError from "../global/response/apierror";
import { TestyService } from "../services/TestyService";
import { UserService } from "../services/UserService";
import Template from "../global/response";
import { Request, Response } from "express";
import { DepartmentService } from "../services/DepartmentService";
import { BaseController } from "./BaseController";
import { IDepartment } from "../models/Department";
import { EntityType } from "../enum/EntityType";
import { TypeormOptions } from "../interface/TypeormOptions";
import { FieldTypes } from "../enum/FieldTypes";
import { Department } from "../models/entities/Department";
const service =  new DepartmentService(Department);
class DepartmentController extends BaseController<Department,IDepartment,DepartmentService>{
  option: TypeormOptions = {
    relations: {
    },
    join: {
      alias: 'department',
      innerJoinAndSelect: {
        createdBy:'department.createdBy',
        modifiedBy:'department.modifiedBy',
        deletedBy:'department.deletedBy',
      },
    },
  };
  entity: EntityType = EntityType.DEPARTMENT;
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

export default DepartmentController;
