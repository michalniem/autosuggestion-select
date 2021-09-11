import { ChangeEvent } from "react";

export interface SearcherProps {
  name: string;
  query: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}
