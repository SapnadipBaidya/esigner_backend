

// src/routes/templateRoutes.js
import express from 'express';
import { createOrUpdateMultipleFieldsByTemplateId, getFieldsByTemplateId } from '../controllers/fieldController.js';


const router = express.Router();

router.post('/create_update_fields_per_template_id', createOrUpdateMultipleFieldsByTemplateId);
router.get('/get_fields_by_template_id', getFieldsByTemplateId);

export default router;
