import Razorpay from 'razorpay';
import Payment from '../models/payment.model.js';
import User from '../models/user.model.js'; // Assuming you have a User model

const razorpay = new Razorpay({
  key_id: "rzp_test_27gndSTbnRjv7h",
  key_secret: "zN0OvIaBvdg9havbygF5rvIY",
});

export const createPayment = async (req, res, next) => {
  console.log('User ID:', req.params.id);
  try {
    const amount = req.body.amount;
    const paymentId = req.body.paymentId;
    const userId = req.params?.id;

    if (!amount || isNaN(amount) || amount <= 0) {
      return res.status(400).json({ message: 'Invalid amount' });
    }

    const options = {
      amount: amount * 100,
      currency: 'INR',
      receipt: paymentId, // Use paymentId for receipt
      payment_capture: 1,
    };

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const userEmail = user.email;

    // Check if a payment already exists for the user's email
    const existingPayment = await Payment.findOne({ userEmail: userEmail });

    if (existingPayment) {
      // If payment exists, update the amount
      existingPayment.amount = amount;
      await existingPayment.save();
      return res.status(200).json({ message: 'Payment amount updated successfully' });
    }

    razorpay.orders.create(options, async (err, order) => {
      if (err) {
        console.error('Failed to create payment order:', err);
        return res.status(500).json({ message: 'Failed to create payment order' });
      }

      try {
        const payment = new Payment({
          orderId: order.id,
          amount,
          userEmail, // Store user's email in the payment record
        });
        await payment.save();
      } catch (error) {
        console.error('Failed to save payment information:', error);
        return res.status(500).json({ message: 'Failed to save payment information' });
      }

      res.status(200).json({ orderId: order.id, userEmail });
    });
  } catch (error) {
    next(error);
  }
};


export const getPaymentsByUserEmail = async (req, res, next) => {
  const userEmail = req.params.email;

  try {
    const payments = await Payment.find({ userEmail: userEmail });

    if (!payments || payments.length === 0) {
      return res.status(404).json({ message: 'No payments found for the user' });
    }

    res.status(200).json({ payments: payments });
  } catch (error) {
    console.error('Failed to fetch payments:', error);
    res.status(500).json({ message: 'Failed to fetch payments' });
  }
};
