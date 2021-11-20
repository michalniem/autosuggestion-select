import "./App.css";
import { AutosuggestionSelect } from "./components/AutosuggestionSelect/AutosuggestionSelect";
import { OptionType } from "./components/AutosuggestionSelect/AutosuggestionSelect";

export type ResponseType = { name: string }[];

const API_URL = `http://universities.hipolabs.com`;

const updateSomeStore = (options: string[]) => {
  console.log(options, "updaded in the store");
};

const responseExtractor = (response: { name: string }[]): OptionType[] => {
  const responseMap = response.map(({ name }) => name);
  const uniqueOptions = Array.from(new Set(responseMap)); // `http://universities.hipolabs.com` API has some duplicats which cause key errors. I've used Set to make every option unique.

  return uniqueOptions;
};

const getUrl = (query: string) => `${API_URL}/search?name=${query}`;

function App() {
  return (
    <div className="App">
      <AutosuggestionSelect<ResponseType>
        name="universities"
        label="Universities"
        getUrl={getUrl}
        responseExtractor={responseExtractor}
        onOptionCheck={updateSomeStore}
        emptyResultsMessage="No matched universities found"
      />
    </div>
  );
}

export default App;
