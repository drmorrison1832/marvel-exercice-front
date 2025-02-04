import { useState } from "react";

const SaveIcon = ({ type, itemID }) => {
  localStorage.setItem("test", "contenu");
  const [locallySaved, setLocallySaved] = useState(
    JSON.parse(localStorage.getItem("locallySaved"))
  );

  function handleSave(event, type, itemID) {
    console.log("save");
    let newLocallySaved = { ...locallySaved };
    !newLocallySaved.saved[`${type}s`].includes(itemID) &&
      newLocallySaved.saved[`${type}s`].push(itemID);
    localStorage.setItem("locallySaved", JSON.stringify(newLocallySaved));
    setLocallySaved(newLocallySaved);
  }

  function handleUnsave(event, type, itemID) {
    console.log("unsave");
    let newLocallySaved = { ...locallySaved };
    let index = newLocallySaved.saved[`${type}s`].indexOf(itemID);
    if (index === -1) {
      return;
    }
    newLocallySaved.saved[`${type}s`].splice(index, 1);
    setLocallySaved(newLocallySaved);
  }

  return (
    <>
      {locallySaved.saved[`${type}s`].includes(itemID) ? (
        <div
          className="save-icon-container"
          onClick={(event) => {
            handleUnsave(event, type, itemID);
          }}
        >
          ♥︎
        </div>
      ) : (
        <div
          className="save-icon-container"
          onClick={(event) => {
            handleSave(event, type, itemID);
          }}
        >
          ♡
        </div>
      )}
    </>
  );
};

export default SaveIcon;
