import { useState, useEffect } from "react";

const SearchBar = ({ query, setQuery, count, skip, setSkip, type }) => {
  const [newQuery, setNewQuery] = useState("");

  useEffect(() => {
    const debouncenewQuery = setTimeout(() => {
      skip != 0 && setSkip(0);
      newQuery != query && setQuery(newQuery);
      // newQuery && console.log("Setting newQuery to", newQuery);
    }, 500);
    return () => {
      clearTimeout(debouncenewQuery);
    };
  }, [newQuery, setQuery]);

  return (
    <form
      className="search-form"
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
      <input
        type="text"
        id="search-bar"
        placeholder={
          count ? `Search among ${count} ${type}s` : "Start searching"
        }
        value={newQuery}
        onChange={(event) => {
          setNewQuery(event.target.value);
        }}
      />
    </form>
  );
};

export default SearchBar;
