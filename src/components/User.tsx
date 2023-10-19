"use client"

import { signOut } from "next-auth/react";
import styles from "../styles/User.module.css";

interface UserProps {
  user: any;
  displayName: string;
}

function User({ displayName, user }: UserProps) {
  function handleClick() {
    signOut({
      redirect: true,
      callbackUrl: `${window.location.origin}`,
    });
  }
  return (
    <div className={`${styles.user} xl:!text-3xl max-lg:!text-xl max-lg:!top-6 max-lg:!right-6 max-xs:!text-lg max-xs:!top-4 max-xs:!right-4`}>
      {user.image && <img src={user.image} alt={displayName} />}
      <span>Welcome, {displayName}</span>
      <button className="max-xs:!text-sm xl:!text-2xl" onClick={handleClick}>Logout</button>
    </div>
  );
}

export default User;
