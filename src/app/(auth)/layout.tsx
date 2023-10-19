import React, { FC, ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-wrap justify-center content-center h-screen bg-dark-0">
      <div className="p-10 rounded-xl bg-dark-2 w-2/6 h-fit">{children}</div>
    </div>
  );
};

export default AuthLayout;
