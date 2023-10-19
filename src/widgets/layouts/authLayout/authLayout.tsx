import React, { FC, ReactNode } from 'react';
import Header from '@/shared/ui/templates/authHeader';

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="mx-auto flex flex-col max-w-[1080px]">
      <Header />
      <div className="flex flex-col justify-center items-center w-full max-w-[622px] mx-auto my-[70px]">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
