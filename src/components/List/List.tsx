import styles from "./index.module.scss";

import type { ReactElement } from "react";

type Props<T> = {
  options: T[];
  renderOption: (option: T) => ReactElement;
  placeholder?: string;
}


export function List<T extends string | number>({
  options,
  renderOption,
  placeholder,
}: Props<T>) {
  return (
    <ul className={styles.list}>
      {options.map((option) => (
        <li key={option} className={styles.item}>
          {renderOption(option)}
        </li>
      ))}
      {placeholder && <li className={styles.placeholder}>{placeholder}</li>}
    </ul>
  );
}
