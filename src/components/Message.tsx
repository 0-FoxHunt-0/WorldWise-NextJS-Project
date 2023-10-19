import React from "react";
import styles from "../styles/Message.module.css";

interface MessageProps {
  message: string;
}

function Message({ message }: MessageProps) {
  return (
    <p className={`${styles.message} xl:!text-4xl`}>
      <span role="img">👋</span> {message}
    </p>
  );
}

export default Message;
