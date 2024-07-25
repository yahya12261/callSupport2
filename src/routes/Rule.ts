import { Router } from 'express';
import multer from 'multer';
import RuleController from '../app/controllers/RuleController';
import { RuleService } from '../app/services/RuleService';
import { Rule } from '../app/models/entities/Rule';
import { EndPoints } from '../app/extra/EndPoints';
const router = Router();
const upload = multer();
const ruleService: RuleService = new RuleService(Rule);
const ruleController = new RuleController(ruleService);
// Get all departments
router.get('/', ruleController.getAll);

router.post('/', upload.none(), ruleController.add);


export default router;