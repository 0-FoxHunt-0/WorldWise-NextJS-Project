import React, { ReactNode } from "react";
import styles from "../styles/Button.module.css";
import { Button as ButtonUI } from "./ui/button";

interface ButtonProps {
  children: ReactNode;
  onClickHandler: () => void;
  type: string;
}

function Button({ children, onClickHandler, type }: ButtonProps) {
  return (
    <ButtonUI className={`${styles.btn} ${styles[type]}`} onClick={onClickHandler}>
      {children}
    </ButtonUI>
  );
}

export default Button;
