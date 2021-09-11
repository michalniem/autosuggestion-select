import cn from "classnames";

import styles from "./index.module.scss";
import { CheckboxItemProps } from "./types";

import tick from "../../../assets/svg/tick.svg";

export function CheckboxItem({ name, onClick, isChecked }: CheckboxItemProps) {
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
}
