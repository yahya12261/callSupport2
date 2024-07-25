import { Router } from 'express';
import multer from 'multer';
import { DepartmentService } from '../app/services/DepartmentService';
import { Department } from '../app/models/entities/Department';
import DepartmentController from '../app/controllers/DepartmentController';
import { EndPoints } from '../app/extra/EndPoints';
import { authMiddleware } from '../middlewares/authMiddlewares';
const router = Router();
const upload = multer();
const Service: DepartmentService = new DepartmentService(Department);
const Controller = new DepartmentController(Service);


router.get('/', Controller.getAll);

router.post('/',authMiddleware, upload.none(), Controller.add);

// Get a department by ID
router.get('/:id',Controller.getAll);

// // Update a department
// router.put('/:id', upload.none(), cont.update);

// // Delete a department
// router.delete('/:id',);

export default router;