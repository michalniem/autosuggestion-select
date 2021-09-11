import { useCallback, useEffect, useState } from "react";
import { OptionType } from "../components/AutosuggestionSelect/types";

type UseDynamicOptionsType<T> = {
  ebabled: boolean;
  url: string;
  initialState: () => string[];
  responseExtractor: (response: T) => OptionType[];
  errorMessage: string;
  emptyResultsMessage: string;
};

type UseDynamicOptionsReturnType = [OptionType[], string, () => void];

export function useDynamicOptions<T>({
  ebabled,
  url,
  initialState,
  responseExtractor,
  errorMessage,
  emptyResultsMessage,
}: UseDynamicOptionsType<T>): UseDynamicOptionsReturnType {
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
          setOptions([])
        }
      })();
    } else {
      setPlaceholder("");
      setOptions([])
    }
  }, [ebabled, url]);

  return [options, placeholder, reset];
}
