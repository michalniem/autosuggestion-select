import { useEffect, useRef } from "react";
import styles from "./index.module.scss";
import { SearcherProps } from "./types";

export function Searcher({ name, query, onChange }: SearcherProps) {
  const searcherRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    searcherRef.current && searcherRef.current.focus();
  }, []);

  return (
    <div className={styles.container}>
      <input
        ref={searcherRef}
        autoComplete="off"
        className={styles.input}
        name={`${name}-searcher`}
        value={query}
        onChange={onChange}
      />
    </div>
  );
}
