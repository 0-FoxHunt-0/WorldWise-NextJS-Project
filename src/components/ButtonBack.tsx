"use client";

import Button from "./Button";

interface ButtonBackProps {
  onClickHandler: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

function ButtonBack({ onClickHandler }: ButtonBackProps) {
  return (
    <Button type="back" onClickHandler={onClickHandler}>
      &larr; Back
    </Button>
  );
}

export default ButtonBack;
