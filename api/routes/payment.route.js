import express from 'express';
import { createPayment } from '../controllers/payment.controller.js';

const router = express.Router();

router.post('/payment/:id', createPayment);

export default router;
