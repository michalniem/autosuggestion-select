import { useCallback, useState } from "react";

import type { ChangeEvent } from "react";

type Output = [string, (e: ChangeEvent<HTMLInputElement>) => void, () => void];

export function useTextInput(): Output {
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
