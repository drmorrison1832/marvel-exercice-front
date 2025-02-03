import { useState, useEffect } from "react";

const ComicsSearchSection = ({ setValue, count, type }) => {
  const [newValue, setNewValue] = useState("");

  useEffect(() => {
    const debouncenewValue = setTimeout(() => {
      setValue(newValue);
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
        placeholder={`Search ${count} ${type}s`}
        value={newValue}
        onChange={(event) => {
          setNewValue(event.target.value);
        }}
      />
    </form>
  );
};

export default ComicsSearchSection;
