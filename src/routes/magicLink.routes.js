import * as MagicLinkController from '../controllers/magicLink.controller.js';




// magicLink.routes.js
import express from 'express';
const router = express.Router();

router.get('/generate', MagicLinkController.generate);
router.get('/verify', MagicLinkController.verify);
router.get('/regenerate', MagicLinkController.regenerate);


export default router;