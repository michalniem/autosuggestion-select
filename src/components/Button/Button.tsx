import { ReactNode } from "react";
import cn from "classnames";

import styles from "./index.module.scss";

export enum ButtonType {
  Full = "full",
  Bare = "bare",
}

interface ButtonProps {
  text: ReactNode;
  variant?: ButtonType;
  onClick: () => void;
  disabled?: boolean;
}

function Button({
  text,
  variant = ButtonType.Full,
  onClick,
  disabled = false,
}: ButtonProps) {
  return (
    <button
      className={cn(styles.button, styles[`button--${variant}`])}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
}

export default Button;
