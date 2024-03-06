import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import listingRouter from './routes/listing.route.js';
import cookieParser from 'cookie-parser';
import path from 'path';

dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log('Connected to MongoDB!');
  })
  .catch((err) => {
    console.log(err);
  });

const __dirname = path.resolve();

const app = express();

app.use(express.json());
app.use(cookieParser());

// // Initialize Razorpay
// const razorpay = new Razorpay({
//   key_id:"rzp_test_27gndSTbnRjv7h",
//   key_secret: "zN0OvIaBvdg9havbygF5rvIY",
// });

// Routes for user, authentication, and listing
app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/listing', listingRouter);

// Route to create a payment order
// app.post('/api/create-order', async (req, res) => {
//   const { amount } = req.body;

//   // Generate a unique receipt ID for this payment
//   const receiptId = uuidv4();

//   const options = {
//     amount: amount * 100, // Amount in smallest currency unit (paise)
//     currency: 'INR',
//     receipt: receiptId, // Use the generated receipt ID
//   };

//   try {
//     const order = await razorpay.orders.create(options);
//     res.json(order);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// Route to verify payment
// app.post('/api/verify-payment', async (req, res) => {
//   const { orderId, paymentId, signature } = req.body;

//   try {
//     const payment = await razorpay.payments.fetch(paymentId);
//     if (payment.order_id === orderId && payment.status === 'captured') {
//       // Payment is successful, update your database or perform necessary actions
//       res.json({ success: true, message: 'Payment successful' });
//     } else {
//       res.status(400).json({ success: false, message: 'Payment verification failed' });
//     }
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// Serve static files
app.use(express.static(path.join(__dirname, '/client/dist')));

// Route to serve frontend
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}!`);
});
