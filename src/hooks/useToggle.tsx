import { useState, useCallback } from "react";

type UseToggleReturnType = [boolean, (value?: boolean) => void];

export function useToggle(initialValue: boolean = false): UseToggleReturnType {
  const [value, setValue] = useState<boolean>(initialValue);

  const toggle = useCallback((value) => {
    setValue((currentValue) =>
      typeof value === "boolean" ? value : !currentValue
    );
  }, []);

  return [value, toggle];
}
