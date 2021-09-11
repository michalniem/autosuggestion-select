import { ChangeEvent, useCallback, useState } from "react";

export function useTextInput(): [
  string,
  (e: ChangeEvent<HTMLInputElement>) => void,
  () => void
] {
  const [value, setValue] = useState("");

  const handleSetValue = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setValue(e.currentTarget.value);
    },
    [setValue]
  );

  const reset = () => {
    setValue("");
  };

  return [value, handleSetValue, reset];
}
