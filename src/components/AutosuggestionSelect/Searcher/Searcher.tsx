import { useRef } from "react";
import styles from "./index.module.scss";

import { useAutoFocus } from "../../../hooks/useAutoFocus";

import type { ChangeEvent } from "react";

type Props = {
  name: string;
  query: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const Searcher = ({ name, query, onChange }: Props) => {
  const searcherRef = useRef<HTMLInputElement>(null);

  useAutoFocus(searcherRef);

  return (
    <input
      ref={searcherRef}
      autoComplete="off"
      className={styles.input}
      name={`${name}-searcher`}
      value={query}
      onChange={onChange}
    />
  );
};
