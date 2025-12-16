import { useEffect, useState, type KeyboardEvent } from "react";

interface SearchBarProps {
  placeholder?: string;

  onQuery: (query: string) => void;
}

export const SearchBar = ({
  placeholder = "Buscar",
  onQuery,
}: SearchBarProps) => {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const deLayDebounce = setTimeout(() => {
      onQuery(query);
    }, 700);

    return () => {
      clearTimeout(deLayDebounce);
    };
  }, [query, onQuery]);

  const handleSearch = () => {
    onQuery(query);
    //setQuery("");
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };
  return (
    <div className="search-container">
      <input
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        //onKeyDown es el evento que se dispara cuando se presiona una tecla
        onKeyDown={handleKeyDown}
      />
      <button onClick={handleSearch}>Buscar</button>{" "}
    </div>
  );
};
