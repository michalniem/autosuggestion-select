import styles from "./index.module.scss";
import { SearcherProps } from "./types";

export function Searcher({ name, query, onChange }: SearcherProps) {
  return (
    <div className={styles.container}>
      <input
        autoComplete="off"
        className={styles.input}
        name={`${name}-searcher`}
        value={query}
        onChange={onChange}
      />
    </div>
  );
}
