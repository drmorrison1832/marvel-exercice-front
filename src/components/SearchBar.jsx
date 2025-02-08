import { useState, useEffect } from "react";

const SearchBar = ({ value, setValue, count, skip, setSkip, type }) => {
  const [newValue, setNewValue] = useState("");

  useEffect(() => {
    const debouncenewValue = setTimeout(() => {
      skip != 0 && setSkip(0);
      newValue != value && setValue(newValue);
      // newValue && console.log("Setting newValue to", newValue);
    }, 500);
    return () => {
      clearTimeout(debouncenewValue);
    };
  }, [newValue, setValue]);

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
        value={newValue}
        onChange={(event) => {
          setNewValue(event.target.value);
        }}
      />
    </form>
  );
};

export default SearchBar;
