// models/payment.model.js

import mongoose from 'mongoose';

const { Schema } = mongoose;

const paymentSchema = new Schema({
  orderId: {
    type: String,
    required: true,
    unique: true
  },
  amount: {
    type: Number,
    required: true
  },
}, {
  timestamps: true
});

const Payment = mongoose.model('Payment', paymentSchema);

export default Payment;
