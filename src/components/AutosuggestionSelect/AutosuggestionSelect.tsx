import { ChangeEvent, useCallback, useRef, useState } from "react";
import cn from "classnames";

import styles from "./index.module.scss";
import arrow from "../../assets/svg/arrow.svg";
import Button, { ButtonType } from "../Button/Button";
import {
  removeItemFromLocalStorage,
  setItemInLocalStorage,
  getItemFromLocalStorage,
} from "../../services/sessionStorage";
import { AutosuggestionSelectProps } from "./types";
import { useTextInput } from "../../hooks/useTextInput";
import { useToggle } from "../../hooks/useToggle";
import { useOnClickOutside } from "../../hooks/onOutsideClick";
import { useDebounce } from "../../hooks/useDebounce";
import { useDynamicOptions } from "../../hooks/useDynamicOptions";
import { Searcher } from "./Searcher/Searcher";
import { List } from "../List/List";
import { CheckboxItem } from "../List/CheckboxItem/CheckboxItem";
import { useKeyboardEffect } from "../../hooks/useKeyboardEffect";

const DEBOUNCE_DELAY = 400;
const KEY_NAME = "Escape";

export function AutosuggestionSelect<ResponseType>({
  name,
  label,
  getUrl,
  responseExtractor,
  onOptionCheck,
  errorMessage = "Something went wrong",
  emptyResultsMessage = "No matches found",
}: AutosuggestionSelectProps<ResponseType>) {
  const containerSelectRef = useRef<HTMLDivElement>(null);
  const [query, setQuery, resetQuery] = useTextInput();
  const [isActive, toggle] = useToggle();
  const [selectedOptions, setSelectedOptions] = useState<string[]>(() =>
    getItemFromLocalStorage(name, [])
  );

  const debouncedQuery = useDebounce(query, DEBOUNCE_DELAY);

  const [options, placeholder, reset] = useDynamicOptions({
    ebabled: Boolean(debouncedQuery),
    url: getUrl(debouncedQuery),
    initialState: () => getItemFromLocalStorage(name, []),
    responseExtractor,
    errorMessage,
    emptyResultsMessage,
  });

  const handleSelectCleanup = useCallback((callback?: () => void) => {
    reset();
    resetQuery();
    callback && callback();
  }, []);

  const handleCloseSelect = () => handleSelectCleanup(() => toggle(false));

  const handleOpenSelect = () => handleSelectCleanup(toggle);

  useOnClickOutside(containerSelectRef, handleCloseSelect);
  useKeyboardEffect(KEY_NAME, handleCloseSelect);

  const handleOptionCheck = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { checked, value } = e.target;

    setSelectedOptions((optionsSnapshot) => {
      const updatedValue = checked
        ? [...optionsSnapshot, value]
        : optionsSnapshot.filter((option) => option !== value);

      setItemInLocalStorage(name, updatedValue);
      onOptionCheck(updatedValue);
      return updatedValue;
    });
  }, []);

  const handleResetClick = useCallback(() => {
    handleSelectCleanup(undefined);
    setSelectedOptions([]);
    removeItemFromLocalStorage(name);
  }, []);

  return (
    <div ref={containerSelectRef}>
      <div className={styles.select}>
        <button
          className={cn(styles.trigger, {
            [styles["trigger--active"]]: isActive,
          })}
          onClick={handleOpenSelect}
        >
          {label}
          <span className={styles.counter}>{selectedOptions.length}</span>
          <img src={arrow} alt="chevron down icon" className={styles.arrow} />
        </button>
        {isActive && (
          <div className={styles.options}>
            <Searcher
              name={name}
              query={query}
              onChange={setQuery}
            />
            {placeholder ? (
              <div className={styles.placeholder}>{placeholder}</div>
            ) : (
              <List
                options={options.length ? options : selectedOptions}
                renderOption={(option) => (
                  <CheckboxItem
                    name={option}
                    isChecked={selectedOptions.includes(option)}
                    onClick={handleOptionCheck}
                  />
                )}
              />
            )}
            <div className={styles.footer}>
              <Button
                text="Reset"
                variant={ButtonType.Bare}
                onClick={handleResetClick}
                disabled={!Boolean(selectedOptions.length)}
              />
              <Button
                text="Save"
                variant={ButtonType.Full}
                onClick={handleCloseSelect}
                disabled={!Boolean(selectedOptions.length)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
