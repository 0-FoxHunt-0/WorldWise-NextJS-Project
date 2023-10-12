"use client";

import { signOut } from "next-auth/react";
import React from "react";

function LoginButton() {
  function handleClick() {
    signOut({
      redirect: true,
      callbackUrl: `${window.location.origin}`,
    });
  }
  return <button className="uppercase" onClick={handleClick}>Logout</button>;
}

export default LoginButton;
