// routes/payment.route.js

import express from 'express';
import { createPayment } from '../controllers/payment.controller.js';

const router = express.Router();

// Route for creating payment orders
router.post('/createpayment', createPayment);

export default router;
