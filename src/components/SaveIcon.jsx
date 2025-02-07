import { useState } from "react";
import Cookies from "js-cookie";

const SaveIcon = ({
  type,
  itemID,
  currentUser,
  setCurrentUser,
  currentUserSavedItems,
  setCurrentUserSavedItems,
}) => {
  console.log("SaveIcon");

  function handleSave(event, type, itemID) {
    console.log("Saving", itemID);

    // console.log("currentUserSavedItems is", currentUserSavedItems);

    let tempCurrentUserSavedItems = { ...currentUserSavedItems };

    // console.log(
    //   `!tempCurrentUserSavedItems[${type}s] vaut`,
    //   !tempCurrentUserSavedItems[`${type}s`]
    // );

    if (!tempCurrentUserSavedItems[`${type}s`]) {
      tempCurrentUserSavedItems[`${type}s`] = [];
    }

    !currentUserSavedItems?.[`${type}s`].includes(itemID) &&
      currentUserSavedItems?.[`${type}s`].push(itemID);

    localStorage.setItem(
      `${currentUser?.username}`,
      JSON.stringify(currentUserSavedItems)
    );
    setCurrentUserSavedItems(tempCurrentUserSavedItems);
  }

  function handleUnsave(event, type, itemID) {
    console.log("Unsave", itemID);
    let tempCurrentUserSavedItems = { ...currentUserSavedItems };
    let index = tempCurrentUserSavedItems[`${type}s`].indexOf(itemID);
    if (index === -1) {
      return;
    }
    localStorage.setItem(
      `${currentUser?.username}`,
      JSON.stringify(tempCurrentUserSavedItems[`${type}s`].splice(index, 1))
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
