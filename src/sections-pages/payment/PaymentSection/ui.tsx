import React from 'react';
import { PaymentCheckoutList, PaymentSteps } from '@/widgets/payment';

export const PaymentSection = () => {
  return (
    <div className="main-container min-h-[120vh]">
      <div className="font-jost my-[24px] grid grid-cols-[minmax(300px,620px)_minmax(300px,508px)] items-start justify-between lg:grid-cols-1 gap-[20px]">
        <PaymentSteps />
        <PaymentCheckoutList />
      </div>
    </div>
  );
};
