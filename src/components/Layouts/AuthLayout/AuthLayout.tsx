import { FC, ReactNode } from "react";
import { ChildWrapper, MainWrapper } from "./styles";
import Header from "@/components/Headers/AuthHeader";

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
