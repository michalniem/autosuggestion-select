import { ReactElement } from "react";

export interface ListProps<T> {
  options: T[];
  renderOption: (option: T) => ReactElement;
  placeholder?: string;
}
