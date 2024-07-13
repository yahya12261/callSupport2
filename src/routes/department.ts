import { Router } from 'express';
import multer from 'multer';
import { DepartmentService } from '../app/services/DepartmentService';
import { getRepository } from 'typeorm';
import { Department } from '../app/models/entities/Department';
import DepartmentController from '../app/controllers/DepartmentController';
const router = Router();
const upload = multer();
// Get all departments
router.get('/', DepartmentController.getAll);

// Create a new department
router.post('/', upload.none(), DepartmentController.add);

// // Get a department by ID
// router.get('/:id',cont.getById);

// // Update a department
// router.put('/:id', upload.none(), cont.update);

// // Delete a department
// router.delete('/:id',);

export default router;