
import { IDepartment } from '../models/Department';
import { Department } from '../models/entities/Department';
import BaseService from './BaseService';

class DepartmentService extends BaseService<Department,IDepartment> {
  protected getEntityClass(): typeof Department {
    return Department;
}
}

export { DepartmentService };