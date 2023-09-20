import React from "react";
import styles from "../styles/Message.module.css";

interface MessageProps {
  message: string;
}

function Message({ message }: MessageProps) {
  return (
    <p className={styles.message}>
      <span role="img">👋</span> {message}
    </p>
  );
}

export default Message;
