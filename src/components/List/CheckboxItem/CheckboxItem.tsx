import cn from "classnames";

import styles from "./index.module.scss";

import tick from "../../../assets/svg/tick.svg";

import type { ChangeEvent } from "react";

type Props = {
  name: string;
  onClick: (e: ChangeEvent<HTMLInputElement>) => void;
  isChecked: boolean;
};

export const CheckboxItem = ({ name, onClick, isChecked }: Props) => {
  return (
    <label
      className={cn(styles.label, {
        [styles["label--checked"]]: isChecked,
      })}
    >
      {name}
      <input
        type="checkbox"
        onChange={onClick}
        value={name}
        defaultChecked={isChecked}
        hidden
      />
      {isChecked && <img src={tick} alt="tick icon" />}
    </label>
  );
};
