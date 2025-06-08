// src/routes/templateRoutes.js
import express from 'express';
import upload from '../config/uploadConfig.js'; // <-- also add .js if missing
import { createTemplateData } from '../controllers/templateController.js'; // <-- add .js
const router = express.Router();

router.post('/create-template', upload.single('file'), createTemplateData);

export default router;
