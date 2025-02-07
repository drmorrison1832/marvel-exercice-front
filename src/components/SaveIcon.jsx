import { useState } from "react";
import Cookies from "js-cookie";

const SaveIcon = ({
  type,
  itemID,
  currentUser,
  currentUserSavedItems,
  setCurrentUserSavedItems,
}) => {
  console.log("SaveIcon");

  function handleSave(event, type, itemID) {
    console.log("Saving", itemID);

    // console.log("currentUserSavedItems is", currentUserSavedItems);

    let tempCurrentUserSavedItems = { ...currentUserSavedItems };

    if (!tempCurrentUserSavedItems[`${type}s`]) {
      tempCurrentUserSavedItems[`${type}s`] = [];
    }

    !tempCurrentUserSavedItems?.[`${type}s`]?.includes(itemID) &&
      tempCurrentUserSavedItems[`${type}s`].push(itemID);

    localStorage.setItem(
      `${currentUser?.username}`,
      JSON.stringify(tempCurrentUserSavedItems)
    );
    setCurrentUserSavedItems(tempCurrentUserSavedItems);
  }

  function handleUnsave(event, type, itemID) {
    console.log("Unsaving", itemID);
    let tempCurrentUserSavedItems = { ...currentUserSavedItems };
    let index = tempCurrentUserSavedItems[`${type}s`].indexOf(itemID);
    console.log(index);
    if (index === -1) {
      return;
    }
    tempCurrentUserSavedItems[`${type}s`].splice(index, 1);
    localStorage.setItem(
      `${currentUser?.username}`,
      JSON.stringify(tempCurrentUserSavedItems)
    );
    setCurrentUserSavedItems(tempCurrentUserSavedItems);
  }

  return (
    currentUser && (
      <>
        {currentUserSavedItems?.[`${type}s`]?.includes(itemID) ? (
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
    )
  );
};

export default SaveIcon;
