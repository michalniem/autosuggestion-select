import { ChangeEvent } from "react";

export interface CheckboxItemProps {
  name: string;
  onClick: (e: ChangeEvent<HTMLInputElement>) => void;
  isChecked: boolean;
}
