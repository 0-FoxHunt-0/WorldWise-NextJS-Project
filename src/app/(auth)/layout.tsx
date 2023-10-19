import React, { FC, ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-wrap justify-center content-center h-screen bg-dark-0">
      <div className="p-10 rounded-xl bg-dark-2 w-2/6 h-fit xl:w-3/12 max-lg:w-3/6 max-md:w-4/6 max-sm:w-10/12">{children}</div>
    </div>
  );
};

export default AuthLayout;
