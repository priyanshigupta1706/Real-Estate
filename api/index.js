import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import requestIp from 'request-ip';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import cookieParser from 'cookie-parser';
import listingRouter from './routes/listing.route.js';
import path from 'path';
dotenv.config();

const app = express();

// Middleware to get the client's IP address
app.use(requestIp.mw());

// Get the client's IP address from the request
app.use((req, res, next) => {
  const clientIp = req.clientIp;
  console.log('Client IP Address:', clientIp);
  next();
});

mongoose.connect(process.env.MONGO).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB:', err.message);
  process.exit(1); // Exit the process with a failure code
});

const __dirname=path.resolve();

app.use(express.json());
app.use(cookieParser());

app.listen(3000, () => {
  console.log('Server is running on PORT 3000');
});

app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/listing', listingRouter);

app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client' , 'dist' , 'index.html'));
})

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal server error';
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
