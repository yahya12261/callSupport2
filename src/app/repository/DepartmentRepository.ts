import { IDepartment } from "../models/Department";
import { Department } from "../models/entities/Department";
import { BaseRepository } from "./BaseRepository";

export interface IDepartmentRepository extends BaseRepository<Department,IDepartment> {

}