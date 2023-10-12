import React, { FC, ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-wrap justify-center content-center h-screen">
      <div className="p-10 rounded-md bg-dark-1 w-2/6 h-fit">{children}</div>
    </div>
  );
};

export default AuthLayout;
