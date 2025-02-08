import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";

const SaveIcon = ({
  type,
  itemID,
  currentUser,
  currentUserSavedItems,
  setCurrentUserSavedItems,
  isSynchronizing,
  setIsSynchronizing,
}) => {
  console.log("Rendering SaveIcon");

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSaved(action, type, itemID) {
    setError(null);
    let tempCurrentUserSavedItems = { ...currentUserSavedItems };

    switch (action) {
      case "save":
        console.log("Saving", itemID);
        if (!tempCurrentUserSavedItems[`${type}s`]) {
          tempCurrentUserSavedItems[`${type}s`] = [];
        }
        if (tempCurrentUserSavedItems?.[`${type}s`]?.includes(itemID)) {
          console.log("Item already saved");
        } else {
          tempCurrentUserSavedItems[`${type}s`].push(itemID);
        }
        break;
      case "unsave": {
        console.log("Unsaving", itemID);
        const index = tempCurrentUserSavedItems[`${type}s`].indexOf(itemID);
        if (index === -1) {
          console.log("Item already unsaved");
          return;
        }
        tempCurrentUserSavedItems[`${type}s`].splice(index, 1);
        break;
      }
      default:
        console.log("Action unknown");
        return;
        break;
    }

    setCurrentUserSavedItems(tempCurrentUserSavedItems);

    console.log("Synchronizing data with server...");
    try {
      const config = {
        headers: { authorization: `Bearer ${currentUser.token}` },
      };
      const body = {};
      body[type] = itemID;
      const response = await axios.put(
        // "https://site--marvel-back--44tkxvkbbxk5.code.run/save",
        `http://localhost:3000/${action}`,
        body,
        config
      );
      console.log("Synchronized");
      setCurrentUserSavedItems(response.data);
      setIsSynchronizing(false);
    } catch (error) {
      console.log(
        "Server response:",
        error.response?.data?.message ?? error?.message
      );
      setError(`Unable to save save ${type}`);
      setIsSynchronizing(true);
      isSynchronizing(false);
    }
  }

  return (
    currentUser && (
      <>
        {currentUserSavedItems?.[`${type}s`]?.includes(itemID) ? (
          <div
            className="save-icon-container"
            onClick={() => {
              // handleUnsave(type, itemID);
              handleSaved("unsave", type, itemID);
            }}
          >
            ♥︎
          </div>
        ) : (
          <div
            className="save-icon-container"
            onClick={() => {
              // handleSave(type, itemID);
              handleSaved("save", type, itemID);
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
