import { IDepartment } from "../models/Department";
import { Department } from "../models/entities/Department";

export interface IDepartmentRepository {
    getAll(): Promise<Department[] | null>;
    add(department: IDepartment): Promise<Department | null>;
    update(department: IDepartment): Promise<Department | null>;
    getById(id: number): Promise<Department | null>;
}