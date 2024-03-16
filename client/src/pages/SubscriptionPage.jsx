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
  // State to store the latest paid card ID
  const [latestPaidCardId, setLatestPaidCardId] = useState(null);

  // Effect to retrieve the latest paid card from localStorage on component mount
  useEffect(() => {
    const storedLatestPaidCardId = localStorage.getItem('latestPaidCardId');
    if (storedLatestPaidCardId) {
      setLatestPaidCardId(parseInt(storedLatestPaidCardId));
    }
  }, []);

  // Function to handle payment
  const handlePayment = (cardId) => {
    // Update the latest paid card ID and store it in localStorage
    setLatestPaidCardId(cardId);
    localStorage.setItem('latestPaidCardId', cardId.toString());

    // Redirect user to payment page with the card amount
    window.location.href = `/payment-page?amount=${cardId}`;
  };

  // Define pricing card data
  const cardsData = [
    { id: 1, amount: 10, title: 'Real Estate', description: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem for $10 plan', features: ['It is a long established', 'It is a long established', 'It is a long established'] },
    { id: 2, amount: 20, title: 'Real Estate', description: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem for $20 plan', features: ['It is a long established', 'It is a long established', 'It is a long established'] },
    { id: 3, amount: 30, title: 'Real Estate', description: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem for $30 plan', features: ['It is a long established', 'It is a long established', 'It is a long established'] },
  ];

  // Filter out the unpaid cards
  const unpaidCards = cardsData.filter(card => card.amount !== latestPaidCardId);

  return (
    <div className="min-h-screen bg-gray-100 overflow-auto">
      <div className="container mx-auto max-w-4xl">
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
            {unpaidCards.map((card, index) => (
              <div key={index} className="py-12">
                <div className="bg-white pt-4 rounded-xl space-y-6 overflow-hidden transition-all duration-500 transform hover:-translate-y-6 hover:scale-105 shadow-xl hover:shadow-2xl cursor-pointer">
                  <div className="px-8 flex justify-between items-center">
                    {/* Title with flexibility */}
                    <h1 className="font-bold text-sm sm:text-xl flex flex-wrap-reverse">
                      <span className="text-slate-500">{card.title}</span>
                      <span className="text-slate-700">Estate</span>
                    </h1>
                  </div>
                  {/* Price */}
                  <h1 className="text-4xl text-center font-bold">${card.amount}.00</h1>
                  {/* Description */}
                  <p className="px-4 text-center text-sm">{card.description}</p>
                  {/* Features */}
                  <ul className="text-center">
                    {card.features.map((feature, index) => (
                      <li key={index}><a href="#" className="font-semibold">{feature}</a></li>
                    ))}
                  </ul>
                  {/* Payment button */}
                  <div className="text-center bg-gray-800">
                    <button onClick={() => handlePayment(card.amount)} className="inline-block my-6 font-bold text-gray-200">Get started today</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingCards;
