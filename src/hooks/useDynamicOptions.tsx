import { useCallback, useEffect, useState } from "react";

import type { OptionType } from "../components/AutosuggestionSelect/AutosuggestionSelect";

type Input<T> = {
  ebabled: boolean;
  url: string;
  initialState: () => string[];
  responseExtractor: (response: T) => OptionType[];
  errorMessage: string;
  emptyResultsMessage: string;
};

type Data = OptionType[];
type Placeholder = string;
type Reset = VoidFunction;

type Output = [Data, Placeholder, Reset];

export function useDynamicOptions<T>({
  ebabled,
  url,
  initialState,
  responseExtractor,
  errorMessage,
  emptyResultsMessage,
}: Input<T>): Output {
  const [options, setOptions] = useState(initialState);
  const [placeholder, setPlaceholder] = useState("");

  const reset = useCallback(() => {
    setOptions([]);
  }, []);

  useEffect(() => {
    if (ebabled) {
      (async () => {
        try {
          const response = await (await fetch(url)).json();
          const options = responseExtractor(response);
          if (options.length) {
            setPlaceholder("");
            setOptions(options);
          } else {
            setPlaceholder(emptyResultsMessage);
            setOptions([]);
          }
        } catch {
          setPlaceholder(errorMessage);
          setOptions([]);
        }
      })();
    } else {
      setPlaceholder("");
      setOptions([]);
    }
  }, [ebabled, emptyResultsMessage, errorMessage, responseExtractor, url]);

  return [options, placeholder, reset];
}
