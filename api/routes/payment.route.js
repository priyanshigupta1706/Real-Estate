import express from 'express';
import { createPayment , getPaymentsByUserEmail } from '../controllers/payment.controller.js';

const router = express.Router();

router.post('/payment/:id', createPayment);
router.get('/payment/:email' , getPaymentsByUserEmail);
export default router;
