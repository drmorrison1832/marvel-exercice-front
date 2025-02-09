import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";

const SaveIcon = ({
  type,
  itemID,
  currentUser,
  setCurrentUser,
  currentUserSavedItems,
  setCurrentUserSavedItems,
}) => {
  console.log("RenderingSaveIcon");

  const [error, setError] = useState(null);
  const [isSynchronizing, setIsSynchronizing] = useState(false);

  // const [tempCurrentUserSavedItems, settempCurrentUserSavedItems] = useState();

  // useEffect(() => {
  //   const debouncesetCurrentUserSavedItems = setTimeout(() => {}, 500);

  //   return () => {
  //     clearTimeout(debouncesetCurrentUserSavedItems);
  //   };
  // }, [tempCurrentUserSavedItems]);

  async function handleSaved(action, type, itemID) {
    setError(null);
    setIsSynchronizing(true);

    let tempCurrentUserSavedItems = { ...currentUserSavedItems };

    if (!tempCurrentUserSavedItems[`${type}s`]) {
      tempCurrentUserSavedItems[`${type}s`] = [];
    }

    switch (action) {
      case "save":
        console.log("♥︎♡ Saving", itemID);
        if (tempCurrentUserSavedItems?.[`${type}s`]?.includes(itemID)) {
          console.log("♥︎♡ Item already saved");
        } else {
          tempCurrentUserSavedItems[`${type}s`].push(itemID);
        }
        break;
      case "unsave": {
        console.log("♥︎♡ Unsaving", itemID);
        const index = tempCurrentUserSavedItems[`${type}s`].indexOf(itemID);
        if (index === -1) {
          console.log("♥︎♡ Item already unsaved");
          return;
        }
        tempCurrentUserSavedItems[`${type}s`].splice(index, 1);
        break;
      }
      default:
        console.log("♥︎♡ Action unknown");
        return;
    }

    setCurrentUserSavedItems(tempCurrentUserSavedItems);
    console.log("♥︎♡ Saved/unsaved on state");

    // DEBOUNCE THIS

    console.log("♥︎♡ Synchonizing remotely:", action);
    try {
      const config = {
        headers: { authorization: `Bearer ${currentUser.token}` },
      };
      const body = {};
      body[type] = itemID;
      const response = await axios.put(
        `https://site--marvel-back--44tkxvkbbxk5.code.run/${action}`,
        // `http://localhost:3000/${action}`,
        body,
        config
      );
      console.log("♥︎♡ Remotely action done");
      console.log("♥︎♡ Verifying state data matches server data");
      if (tempCurrentUserSavedItems !== response.data)
        setCurrentUserSavedItems(response.data);
      setIsSynchronizing(false);
    } catch (error) {
      console.log(
        "♥︎♡ Server response:",
        error.response?.data?.message ?? error?.message
      );
      setError(`Unable to save save ${type}`);

      setIsSynchronizing(false);
    }
  }

  return (
    currentUser && (
      <>
        {currentUserSavedItems?.[`${type}s`]?.includes(itemID) ? (
          <div
            className="save-icon-container"
            onClick={() => {
              if (isSynchronizing) {
                return;
              }
              handleSaved("unsave", type, itemID);
            }}
          >
            ♥︎
          </div>
        ) : (
          <div
            className="save-icon-container"
            onClick={() => {
              if (isSynchronizing) {
                return;
              }
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
