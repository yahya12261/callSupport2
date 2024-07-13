import { Router } from 'express';
import multer from 'multer';
import PositionController from '../app/controllers/PositionController';

const router = Router();
const upload = multer();
// Get all departments
router.get('/', PositionController.getAll);

// Create a new department
router.post('/', upload.none(), PositionController.add);

// // Get a department by ID
// router.get('/:id',cont.getById);

// // Update a department
// router.put('/:id', upload.none(), cont.update);

// // Delete a department
// router.delete('/:id',);

export default router;