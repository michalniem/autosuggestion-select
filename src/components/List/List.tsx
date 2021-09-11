import styles from "./index.module.scss";
import { ListProps } from "./types";

export function List<T extends string | number>({
  options,
  renderOption,
  placeholder,
}: ListProps<T>) {
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
