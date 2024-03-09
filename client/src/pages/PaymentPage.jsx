import React from 'react';

class PaymentPage extends React.Component {
  constructor(props) {
    super(props);
    const searchParams = new URLSearchParams(window.location.search);
    this.amount = searchParams.get('amount');
    this.razorpayScriptURL = 'https://checkout.razorpay.com/v1/checkout.js';
    this.razorpayKey = 'rzp_test_27gndSTbnRjv7h'; // Replace with your actual Razorpay key
  }

  componentDidMount() {
    const script = document.createElement('script');
    script.src = this.razorpayScriptURL;
    script.async = true;
    script.onload = () => {
      console.log('Razorpay script loaded');
      this.initiatePayment();
    };
    document.body.appendChild(script);
  }

  initiatePayment = () => {
    const options = {
      key: this.razorpayKey,
      amount: this.amount * 100,
      currency: 'INR',
      name: 'Real Estate',
      description: 'Test Transaction',
      image: 'https://example.com/your_logo.png',
      handler: (response) => {
        console.log('Payment successful:', response);
        // Make an API call to your backend to store payment success
        this.storePaymentSuccess(response.razorpay_payment_id);
      },
      prefill: {
        name: 'Gaurav Kumar',
        email: '',
        contact: '9999999999'
      },
      notes: {
        address: 'Razorpay Corporate Office'
      },
      theme: {
        color: '#3399cc'
      }
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  storePaymentSuccess = (paymentId) => {
    fetch('/api/payment/payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ paymentId, amount: this.amount })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to store payment');
      }
      console.log('Payment stored successfully');
      // Redirect or do any other action after storing the payment
      window.location.href = `/create-listing?paymentId=${paymentId}`;
    })
    .catch(error => {
      console.error('Error storing payment:', error);
      // Handle error scenario
    });
  };
  

  render() {
    return (
      <div>
        <h1></h1>
        {/* Optionally, you can include additional content here */}
      </div>
    );
  }
}

export default PaymentPage;
