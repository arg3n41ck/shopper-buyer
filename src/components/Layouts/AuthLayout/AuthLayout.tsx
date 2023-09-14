import React, { FC, ReactNode } from 'react';
import Header from '@/components/headers/authHeader';
import { ChildWrapper, MainWrapper } from './styles';

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  return (
    <MainWrapper>
      <Header />
      <ChildWrapper>{children}</ChildWrapper>
    </MainWrapper>
  );
};

export default AuthLayout;
