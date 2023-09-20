import UserModel from "@/models/UserModel";
import Image from "next/image";
import React from "react";
import styles from "../styles/User.module.css";

const FAKE_USER: UserModel = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

function User() {
  const user = FAKE_USER;

  function handleClick() {}
  return (
    <div className={styles.user}>
      <Image src={user.avatar} alt={user.name} />
      <span>Welcome, {user.name}</span>
      <button onClick={handleClick}>Logout</button>
    </div>
  );
}

export default User;
