

// src/routes/templateRoutes.js
import express from 'express';
import { createContract, findAndEditContract, getContractsByTemplateId } from '../controllers/contractController.js';


const router = express.Router();

router.post('/create_contract', createContract);
router.post('/get_contracts_by_template_id', getContractsByTemplateId);
router.post('/find_and_edit_contract', findAndEditContract);

export default router;
