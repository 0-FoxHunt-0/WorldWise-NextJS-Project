"use client";

import { signOut } from "next-auth/react";
import React from "react";

function LogoutButton() {
  function handleClick() {
    signOut({
      redirect: true,
      callbackUrl: `${window.location.origin}`,
    });
  }
  return (
    <button onClick={handleClick}>
      Logout
    </button>
  );
}

export default LogoutButton;
