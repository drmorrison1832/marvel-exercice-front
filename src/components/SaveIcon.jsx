import { useState } from "react";
// import Cookies from "js-cookie";
import axios from "axios";

const SaveIcon = ({
  type,
  itemID,
  currentUser,
  currentUserSavedItems,
  setCurrentUserSavedItems,
  // isSynchronizing,
  // setIsSynchronizing,
}) => {
  console.log("SaveIcon");

  const [error, setError] = useState();

  async function handleSave(event, type, itemID) {
    console.log("Saving", itemID);

    let tempCurrentUserSavedItems = { ...currentUserSavedItems };
    if (!tempCurrentUserSavedItems[`${type}s`]) {
      tempCurrentUserSavedItems[`${type}s`] = [];
    }

    if (tempCurrentUserSavedItems?.[`${type}s`]?.includes(itemID)) {
      return;
    }

    tempCurrentUserSavedItems[`${type}s`].push(itemID);

    localStorage.setItem(
      `${currentUser?.username}`,
      JSON.stringify(tempCurrentUserSavedItems)
    );

    console.log("Synchronizing data with server...");

    try {
      const config = {
        headers: { authorization: `Bearer ${currentUser.token}` },
      };
      const body = {};
      body[type] = itemID;
      const response = await axios.put(
        // "https://site--marvel-back--44tkxvkbbxk5.code.run/save",
        "http://localhost:3000/save",
        body,
        config
      );
      console.log("Synchronized");
      setCurrentUserSavedItems(response.data);
      // setIsSynchronizing(false);
    } catch (error) {
      console.log(
        "Server response:",
        error.response?.data?.message ?? error?.message
      );
      setError(`Unable to save save ${type}`);
      // setIsSynchronizing(true);
      // isSynchronizing(false);
    }

    // setCurrentUserSavedItems(tempCurrentUserSavedItems);
  }

  async function handleUnsave(event, type, itemID) {
    console.log("Unsaving", itemID);

    let tempCurrentUserSavedItems = { ...currentUserSavedItems };
    let index = tempCurrentUserSavedItems[`${type}s`].indexOf(itemID);

    if (index === -1) {
      return;
    }

    tempCurrentUserSavedItems[`${type}s`].splice(index, 1);

    localStorage.setItem(
      `${currentUser?.username}`,
      JSON.stringify(tempCurrentUserSavedItems)
    );
    setCurrentUserSavedItems(tempCurrentUserSavedItems);

    console.log("Synchronizing data with server...");

    try {
      const config = {
        headers: { authorization: `Bearer ${currentUser.token}` },
      };
      const body = {};
      body[type] = itemID;
      const response = await axios.put(
        // "https://site--marvel-back--44tkxvkbbxk5.code.run/unsave",
        "http://localhost:3000/unsave",
        body,
        config
      );
      console.log("Synchronized");
      setCurrentUserSavedItems(response.data);
      // setIsSynchronizing(false);
    } catch (error) {
      console.log(
        "Server response:",
        error.response?.data?.message ?? error?.message
      );
      setError(`Unable to save save ${type}`);
      // setIsSynchronizing(true);
      // isSynchronizing(false);
    }

    // setCurrentUserSavedItems(tempCurrentUserSavedItems);
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
