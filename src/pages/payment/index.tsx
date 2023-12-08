import React from 'react';
import { MainLayout } from '@/widgets/layouts';
import { PaymentSection } from '@/sections-pages/payment';

const Payment = () => {
  return (
    <MainLayout
      hidden={{ topBar: true, categories: true, botBar: true, footer: true }}
      isOnlyAuth
    >
      <PaymentSection />
    </MainLayout>
  );
};

export default Payment;
