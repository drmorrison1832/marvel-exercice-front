import { useState, useEffect } from "react";

const ComicsSearchSection = ({ setValue }) => {
  const [newValue, setNewValue] = useState("");

  useEffect(() => {
    const debouncenewValue = setTimeout(() => {
      setValue(newValue);
      newValue && console.log("Setting newValue to", newValue);
    }, 500);
    return () => {
      clearTimeout(debouncenewValue);
    };
  }, [newValue, setValue]);

  return (
    <form>
      <input
        type="text"
        placeholder="Start searching..."
        value={newValue}
        onSubmit={(event) => {
          event.preventDefault();
        }}
        onChange={(event) => {
          console.log(event.target.value);
          setNewValue(event.target.value);
        }}
      />
    </form>
  );
};

export default ComicsSearchSection;
