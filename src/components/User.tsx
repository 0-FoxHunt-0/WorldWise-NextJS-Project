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
    <div className={styles.user}>
      {user.image && <img src={user.image} alt={displayName} />}
      <span>Welcome, {displayName}</span>
      <button onClick={handleClick}>Logout</button>
    </div>
  );
}

// const FAKE_USER = {
//   name: "Jack",
//   email: "jack@example.com",
//   password: "qwerty",
//   avatar: "https://i.pravatar.cc/100?u=zz",
// };

// function User() {
//   const user = FAKE_USER;

//   function handleClick() {}

//   return (
//     <div className={styles.user}>
//       <img src={user.avatar} alt={user.name} />
//       <span>Welcome, {user.name}</span>
//       <button onClick={handleClick}>Logout</button>
//     </div>
//   );
// }

export default User;
