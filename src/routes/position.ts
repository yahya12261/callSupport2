import { Router } from 'express';
import multer from 'multer';
import PositionController from '../app/controllers/PositionController';
import { PositionService } from '../app/services/PositionService';
import { Position } from '../app/models/entities/Position';

const router = Router();
const upload = multer();

const Service: PositionService = new PositionService(Position);
const Controller = new PositionController(Service);


router.get('/', Controller.getAll);
router.post('/', upload.none(), Controller.add);

// // Get a department by ID
// router.get('/:id',cont.getById);

// // Update a department
// router.put('/:id', upload.none(), cont.update);

// // Delete a department
// router.delete('/:id',);

export default router;