/* eslint-disable no-unused-vars */
// /* eslint-disable no-unused-vars */
// import React, { useState, useEffect } from 'react';

// const PricingCards = () => {
//   // State to store paid cards
//   const [paidCards, setPaidCards] = useState([]);

//   // Effect to retrieve paid cards from localStorage on component mount
//   useEffect(() => {
//     const storedPaidCards = JSON.parse(localStorage.getItem('paidCards'));
//     if (storedPaidCards) {
//       setPaidCards(storedPaidCards);
//     }
//   }, []);

//   // Function to handle payment
//   const handlePayment = async (amount) => {
//     // Add the payment amount to paidCards state
//     const updatedPaidCards = [...paidCards, amount];
//     setPaidCards(updatedPaidCards);

//     // Store updated paid cards in localStorage
//     localStorage.setItem('paidCards', JSON.stringify(updatedPaidCards));

//     // Redirect user to payment page with the amount parameter
//     window.location.href = `/payment-page?amount=${amount}`;
//   };

//   // Define pricing card data
//   const cardsData = [
//     { amount: 10, title: 'Real Estate', description: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem for $10 plan', features: ['It is a long established', 'It is a long established', 'It is a long established'] },
//     { amount: 20, title: 'Real Estate', description: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem for $20 plan', features: ['It is a long established', 'It is a long established', 'It is a long established'] },
//     { amount: 30, title: 'Real Estate', description: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem for $30 plan', features: ['It is a long established', 'It is a long established', 'It is a long established'] },
//   ];

//   // Filter out the unpaid cards
//   const unpaidCards = cardsData.filter(card => !paidCards.includes(card.amount));

//   return (
//     <div className="min-h-screen bg-gray-100 overflow-auto">
//       <div className="container mx-auto max-w-4xl">
//         <div className="mt-10 text-center">
//           <h1 className="text-4xl font-bold text-gray-800">Pricing plans</h1>
//           <p className="text-lg mt-3 font-semibold">Hope you are enjoying our services. To continue enjoying them, subscribe to our plans!</p>
//         </div>
//         <div className="mt-8">
//           <div className="flex justify-between">
//             {/* Plan selection UI can be added here */}
//           </div>
//           <hr className="mt-10" />
//           <div className="flex space-x-10 pt-10">
//             {/* Map through the unpaid cards and render them */}
//             {unpaidCards.map((card, index) => (
//               <div key={index} className="py-12">
//                 <div className="bg-white pt-4 rounded-xl space-y-6 overflow-hidden transition-all duration-500 transform hover:-translate-y-6 hover:scale-105 shadow-xl hover:shadow-2xl cursor-pointer">
//                   <div className="px-8 flex justify-between items-center">
//                     {/* Title with flexibility */}
//                     <h1 className="font-bold text-sm sm:text-xl flex flex-wrap-reverse">
//                       <span className="text-slate-500">{card.title}</span>
//                       <span className="text-slate-700">Estate</span>
//                     </h1>
//                   </div>
//                   {/* Price */}
//                   <h1 className="text-4xl text-center font-bold">${card.amount}.00</h1>
//                   {/* Description */}
//                   <p className="px-4 text-center text-sm">{card.description}</p>
//                   {/* Features */}
//                   <ul className="text-center">
//                     {card.features.map((feature, index) => (
//                       <li key={index}><a href="#" className="font-semibold">{feature}</a></li>
//                     ))}
//                   </ul>
//                   {/* Payment button */}
//                   <div className="text-center bg-gray-800">
//                     <button onClick={() => handlePayment(card.amount)} className="inline-block my-6 font-bold text-gray-200">Get started today</button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PricingCards;
import React, { useState, useEffect } from 'react';

const PricingCards = () => {
  const [latestPaidCardId, setLatestPaidCardId] = useState(null);
  const [showPricing, setShowPricing] = useState(true);
  const [apiAmount, setApiAmount] = useState(null);
  const [currentPlan, setCurrentPlan] = useState(null);

  // Define pricing card data
  const cardsData = [
    { id: 1, amount: 10, title: 'Real Estate', description: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem for $10 plan', features: ['It is a long established', 'It is a long established', 'It is a long established'] },
    { id: 2, amount: 20, title: 'Real Estate', description: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem for $20 plan', features: ['It is a long established', 'It is a long established', 'It is a long established'] },
    { id: 3, amount: 30, title: 'Real Estate', description: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem for $30 plan', features: ['It is a long established', 'It is a long established', 'It is a long established'] },
  ];



  useEffect(() => {
    const storedLatestPaidCardId = localStorage.getItem('latestPaidCardId');
    if (storedLatestPaidCardId) {
      setLatestPaidCardId(parseInt(storedLatestPaidCardId));
    }

    fetch('/api/payment/payment/aniket@gmail.com')
      .then(response => response.json())
      .then(data => {
        if (data.payments && data.payments.length > 0 && data.payments[0].amount !== null) {
          setApiAmount(data.payments[0].amount);
          setShowPricing(false);
        }
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handlePayment = (cardId) => {
    setLatestPaidCardId(cardId);
    localStorage.setItem('latestPaidCardId', cardId.toString());
    window.location.href = `/payment-page?amount=${cardId}`;
  };

  const handleUpgrade = () => {
    if (apiAmount === 10) {
      setCurrentPlan(20);
    } else if (apiAmount === 20) {
      setCurrentPlan(30);
    }
    setShowPricing(true); // Show pricing after upgrade
  };

  const handleDowngrade = () => {
    if (apiAmount === 20) {
      setCurrentPlan(10);
    } else if (apiAmount === 30) {
      setCurrentPlan(20);
    }
    setShowPricing(true); // Show pricing after downgrade
  };

  return (
    <div className="min-h-screen bg-gray-100 overflow-auto">
      <div className="container mx-auto max-w-4xl">
        {showPricing ? (
          <>
            <div className="mt-10 text-center">
              <h1 className="text-4xl font-bold text-gray-800">Pricing plans</h1>
              <p className="text-lg mt-3 font-semibold">Hope you are enjoying our services. To continue enjoying them, subscribe to our plans!</p>
            </div>
            <div className="mt-8">
              <div className="flex justify-between">
                {/* Plan selection UI can be added here */}
              </div>
              <hr className="mt-10" />
              <div className="flex space-x-10 pt-10">
                {/* Map through the unpaid cards and render them */}
                {cardsData.map((card, index) => (
                  <div key={index} className="py-12">
            {(currentPlan === null || currentPlan === card.amount || currentPlan === card.amount - 10 || currentPlan === card.amount - 20)&& (
                      <div className="bg-white pt-4 rounded-xl space-y-6 overflow-hidden transition-all duration-500 transform hover:-translate-y-6 hover:scale-105 shadow-xl hover:shadow-2xl cursor-pointer">
                        <div className="px-8 flex justify-between items-center">
                          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap-reverse">
                            <span className="text-slate-500">{card.title}</span>
                            <span className="text-slate-700">Estate</span>
                          </h1>
                        </div>
                        <h1 className="text-4xl text-center font-bold">${card.amount}.00</h1>
                        <p className="px-4 text-center text-sm">{card.description}</p>
                        <ul className="text-center">
                          {card.features.map((feature, index) => (
                            <li key={index}><a href="#" className="font-semibold">{feature}</a></li>
                          ))}
                        </ul>
                        <div className="text-center bg-gray-800">
                          <button onClick={() => handlePayment(card.amount)} className="inline-block my-6 font-bold text-gray-200">Get started today</button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="min-h-screen bg-gray-100 overflow-auto">
            <div className="container mx-auto max-w-4xl">
              {apiAmount !== null && (
                <div className="mt-10 text-center">
                  <h1 className="text-4xl font-bold text-gray-800">You have an active plan</h1>
                  <p className="text-lg mt-3 font-semibold">
                    Your current plan amount is ${apiAmount}
                    {apiAmount === 10 && " (Basic Plan)"}
                    {apiAmount === 20 && " (Standard Plan)"}
                    {apiAmount === 30 && " (Premium Plan)"}
                  </p>
                  {apiAmount === 10 && (
                    <button onClick={handleUpgrade} className="mt-4 inline-block px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600">
                      Upgrade Plan
                    </button>
                  )}
                  {apiAmount === 20 && (
                    <div>
                      <button onClick={handleUpgrade} className="mt-4 inline-block px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600">
                        Upgrade Plan
                      </button>
                      <button onClick={handleDowngrade} className="mt-4 ml-4 inline-block px-4 py-2 bg-red-500 text-white font-semibold rounded hover:bg-red-600">
                        Downgrade Plan
                      </button>
                    </div>
                  )}
                  {apiAmount === 30 && (
                    <button onClick={handleDowngrade} className="mt-4 inline-block px-4 py-2 bg-red-500 text-white font-semibold rounded hover:bg-red-600">
                      Downgrade Plan
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PricingCards;
