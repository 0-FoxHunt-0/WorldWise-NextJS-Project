import React, { FC, ReactNode } from "react";
import { Button } from "./ui/button";
import { signIn } from "next-auth/react";

interface GoogleSignInButtonProps {
  children: ReactNode;
}

const GoogleSignInButton: FC<GoogleSignInButtonProps> = ({ children }) => {
  function loginWithGoogle() {
    signIn("google", { callbackUrl: "http://localhost:3000/app/cities" });
  }

  return (
    <Button onClick={loginWithGoogle} className="w-full text-xl xl:text-3xl xl:!p-6">
      {children}
    </Button>
  );
};

export default GoogleSignInButton;
