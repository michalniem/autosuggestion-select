export type OptionType = string;

export interface AutosuggestionSelectProps<ResponseType> {
  name: string;
  label: string;
  errorMessage?: string;
  emptyResultsMessage?: string;
  onOptionCheck: (options: OptionType[]) => void;
  getUrl: (query: string) => string;
  responseExtractor: (response: ResponseType) => OptionType[];
}
