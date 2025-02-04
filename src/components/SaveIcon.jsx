import { useState } from "react";

const SaveIcon = ({ type, itemID }) => {
  const [localUser, setLocalUser] = useState(
    JSON.parse(localStorage.getItem("localUser"))
  );

  function handleSave(event, type, itemID) {
    console.log("save", itemID);
    let tempLocalUser = JSON.parse(localStorage.getItem("localUser"));
    // let newLocalUser = { ...localUser };
    !tempLocalUser.saved[`${type}s`].includes(itemID) &&
      tempLocalUser.saved[`${type}s`].push(itemID);
    localStorage.setItem("localUser", JSON.stringify(tempLocalUser));
    setLocalUser(tempLocalUser);
  }

  function handleUnsave(event, type, itemID) {
    console.log("unsave", itemID);
    let tempLocalUser = JSON.parse(localStorage.getItem("localUser"));
    let index = tempLocalUser.saved[`${type}s`].indexOf(itemID);
    if (index === -1) {
      return;
    }
    tempLocalUser.saved[`${type}s`].splice(index, 1);
    localStorage.setItem("localUser", JSON.stringify(tempLocalUser));
    setLocalUser(tempLocalUser);
  }

  return (
    <>
      {localUser.saved[`${type}s`].includes(itemID) ? (
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
