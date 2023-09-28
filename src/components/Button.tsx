import React, { ReactNode } from "react";
import styles from "../styles/Button.module.css";

interface ButtonProps {
  children: ReactNode;
  onClickHandler: () => void;
  type: string;
}

function Button({ children, onClickHandler, type }: ButtonProps) {
  return (
    <button className={`${styles.btn} ${styles[type]}`} onClick={onClickHandler}>
      {children}
    </button>
  );
}

export default Button;
