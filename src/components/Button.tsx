import React, { ReactNode } from "react";
import styles from "../styles/Button.module.css";
import { Button as ButtonUI } from "./ui/button";

interface ButtonProps {
  children: ReactNode;
  onClickHandler: () => void;
  type: string;
  className?: string;
}

function Button({ children, onClickHandler, type, className }: ButtonProps) {
  return (
    <ButtonUI
      className={`${styles.btn} ${styles[type]} ${className}`}
      onClick={onClickHandler}
    >
      {children}
    </ButtonUI>
  );
}

export default Button;
