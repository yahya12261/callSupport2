import { getRepository, Repository } from 'typeorm';
import { IDepartment } from '../models/Department';
import { IDepartmentRepository } from '../repository/DepartmentRepository';
import { Department } from '../models/entities/Department';
import APIError from '../global/response/apierror';
import Err from '../global/response/errorcode';


class DepartmentService implements IDepartmentRepository {


  
 async getAll(): Promise<Department[] | null> {
    const depRepository = getRepository(Department);
try{
  const departments : [Department[], number] = await depRepository.findAndCount();
  return departments[0];
}catch (e) {
  console.log(e);
  return Promise.reject(new APIError('Department Already exists', Err.DuplicateRequest));
}

  }
  async add(model: IDepartment): Promise<Department | null> {
    const depRepository = getRepository(Department);
    try {
      const department = new Department();
      department.fillDepFromModel(model);
      const saveDepartment = await depRepository.save(department);
      return saveDepartment;
    } catch (e) {
      console.log(e);
      return Promise.reject(new APIError('Department Already exists', Err.DuplicateRequest));
    }
  }
  update(department: IDepartment): Promise<Department | null> {
    throw new Error('Method not implemented.');
  }
  getById(id: number): Promise<Department | null> {
    throw new Error('Method not implemented.');
  }

}

export { DepartmentService };