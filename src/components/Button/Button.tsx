import cn from "classnames";

import styles from "./index.module.scss";

import type { ReactNode } from "react";

export type ButtonType = "full" | "bare";

type Props = {
  text: ReactNode;
  variant?: ButtonType;
  onClick: () => void;
  disabled?: boolean;
};

export const Button = ({
  text,
  variant = "full",
  onClick,
  disabled = false,
}: Props) => {
  return (
    <button
      className={cn(styles.button, styles[`button--${variant}`])}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};
