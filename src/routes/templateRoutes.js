// src/routes/templateRoutes.js
import express from 'express';
import upload from '../config/uploadConfig.js'; // <-- also add .js if missing
import { createTemplateData, getAllTemplateIdName, getTemplateData, getTemplatePDF } from '../controllers/templateController.js'; // <-- add .js
const router = express.Router();

router.post('/create-template', upload.single('file'), createTemplateData);
router.post('/get-all-template', upload.single('file'), getAllTemplateIdName);
router.post('/get-template-data', getTemplateData);
router.post('/get-template-pdf',  getTemplatePDF);
export default router;
