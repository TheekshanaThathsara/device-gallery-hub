import React from 'react';

export default function CheckoutSteps({ currentStep }) {
  const steps = [
    { id: 1, name: 'Shipping Information' },
    { id: 2, name: 'Payment Details' },
    { id: 3, name: 'Review Order' },
    { id: 4, name: 'Order Complete' }
  ];

  return (
    <nav aria-label="Checkout Progress">
      <ol className="md:flex hidden items-center w-full">
        {steps.map((step, index) => (
          <li key={step.id} className={`flex items-center ${index !== steps.length - 1 ? 'w-full' : ''}`}>
            <div className="flex flex-col items-center">
              <div 
                className={`flex items-center justify-center w-10 h-10 rounded-full ${
                  currentStep >= step.id 
                    ? 'bg-primary-600 text-white' 
                    : 'bg-gray-200 text-gray-600'
                } transition-colors duration-300 ease-in-out`}
              >
                {currentStep > step.id ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <span className="text-sm font-bold">{step.id}</span>
                )}
              </div>
              <span 
                className={`mt-2 text-xs ${
                  currentStep >= step.id ? 'text-secondary-800 font-medium' : 'text-secondary-500'
                }`}
              >
                {step.name}
              </span>
            </div>
            
            {index !== steps.length - 1 && (
              <div 
                className={`flex-1 h-0.5 mx-2 ${
                  currentStep > step.id ? 'bg-primary-600' : 'bg-gray-200'
                }`}
              ></div>
            )}
          </li>
        ))}
      </ol>
      
      {/* Mobile View - Just show current step name */}
      <div className="md:hidden flex items-center justify-center">
        <span className="text-lg font-medium text-secondary-800">
          Step {currentStep}: {steps.find(step => step.id === currentStep)?.name}
        </span>
      </div>
    </nav>
  );
}
