import { useState, useEffect } from "react";

const ComicsSearchSection = ({ title, setTitle }) => {
  const [newTitle, setNewTitle] = useState("");

  useEffect(() => {
    const debounceNewTitle = setTimeout(() => {
      setTitle(newTitle);
      console.log("Setting title to", newTitle);
    }, 500);
    return () => {
      clearTimeout(debounceNewTitle);
    };
  }, [newTitle, setTitle]);

  return (
    <form>
      <input
        type="text"
        placeholder="Start searching..."
        value={newTitle}
        onChange={(event) => {
          console.log(event.target.value);
          setNewTitle(event.target.value);
        }}
      />
    </form>
  );
};

export default ComicsSearchSection;
