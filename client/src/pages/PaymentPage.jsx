import React from 'react';

class PaymentPage extends React.Component {
  constructor(props) {
    super(props);
    // Retrieve the 'amount' parameter from the URL query string
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
      amount: this.amount*100, // Amount in paise
      currency: 'INR',
      name: 'Real Estate',
      description: 'Test Transaction',
      image: 'https://example.com/your_logo.png',
      handler: function(response) {
          alert(response.razorpay_payment_id);
          //window.location.href = '/success';
          // Handle payment success
      },
      prefill: {
          name: 'Gaurav Kumar',
          email: 'gaurav.kumar@example.com',
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

  render() {
    return (
      <div>
        <h1>Payment Page</h1>
        {/* Optionally, you can include additional content here */}
      </div>
    );
  }
}

export default PaymentPage;
