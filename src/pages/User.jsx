import { useEffect, useState } from "react";
import axios from "axios";
import Gallery from "../components/Gallery";
import LoginForm from "../components/LoginForm";
import LogoutButton from "../components/LogoutButton";

const User = ({
  currentUser,
  setCurrentUser,
  currentUserSavedItems,
  setCurrentUserSavedItems,
}) => {
  console.log("Rendering User");

  const [currentUserSavedItemsData, setCurrentUserSavedItemsData] = useState(
    new Object()
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [comicsNotFound, setComicsNotFound] = useState(false);
  const [charactersNotFound, setCharactersNotFound] = useState(false);

  useEffect(() => {
    async function getSavedItems() {
      console.log("Retrieving saved items...");
      setError(null);
      setIsLoading(true);

      try {
        const config = {
          headers: { authorization: `Bearer ${currentUser.token}` },
        };

        const savedItemsResponse = await axios.get(
          "https://site--marvel-back--44tkxvkbbxk5.code.run/saved",
          // "http://localhost:3000/saved",
          config
        );
        console.log("Saved items successfully retrieved:");

        localStorage.removeItem(`${currentUser.username}`);

        localStorage.setItem(
          `${currentUser.username}`,
          JSON.stringify(savedItemsResponse.data)
        );

        setCurrentUserSavedItems(savedItemsResponse.data);

        // setIsLoading(false); // Still need to retrieve data with getSavedItemsData()
      } catch (error) {
        console.log(error.message);
        console.log(
          "Server response:",
          error.response?.data?.message ?? error?.message
        );
        setError(error.response?.data?.message ?? error?.message);
        setIsLoading(false);
      }
    }
    if (!currentUser) {
      console.log("Not connected");
      return;
    }
    getSavedItems();
  }, [currentUser]);

  useEffect(() => {
    async function getSavedItemsData() {
      console.log("Retrieving items data...");
      setIsLoading(true);

      setError(null);
      let newLocalCollectionData = {
        comics: new Array(),
        characters: new Array(),
      };
      try {
        for (let comic of currentUserSavedItems.comics) {
          let comicResponse = await axios(
            // `http://localhost:3000/comic/${comic}`
            `https://site--marvel-back--44tkxvkbbxk5.code.run/comic/${comic}`
          );

          comicResponse.data
            ? newLocalCollectionData.comics.push(comicResponse.data)
            : setComicsNotFound(true);
        }

        for (let character of currentUserSavedItems.characters) {
          let characterResponse = await axios(
            // `http://localhost:3000/character/${character}`
            `https://site--marvel-back--44tkxvkbbxk5.code.run/character/${character}`
          );

          characterResponse.data
            ? newLocalCollectionData.characters.push(characterResponse.data)
            : setCharactersNotFound(true);
        }

        console.log("Items data retrieved");
        setCurrentUserSavedItemsData(newLocalCollectionData);
        setError(null);
        setIsLoading(false);
      } catch (error) {
        console.error(error.message);
        setError(error.message);
        setIsLoading(false);
      }
    }
    currentUser && getSavedItemsData();
  }, [currentUser, currentUserSavedItems]);

  if (!currentUser) {
    return (
      <div>
        <LoginForm
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
          setCurrentUserSavedItems={setCurrentUserSavedItems}
        />
      </div>
    );
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Oups</div>;
  }

  return (
    <div className="user-saved">
      <LogoutButton
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
        setCurrentUserSavedItems={setCurrentUserSavedItems}
      />

      <section>
        <h2>Saved comics</h2>
        <div className="user-saved-comics">
          {comicsNotFound && (
            <div>⚠️ Some comics couldn't be retrieved from Marvel Database</div>
          )}
          {!currentUserSavedItemsData ||
            (!currentUserSavedItemsData.comics?.length && (
              <p>No comics saved yet</p>
            ))}

          <Gallery
            type="comic"
            items={currentUserSavedItemsData.comics}
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
            currentUserSavedItems={currentUserSavedItems}
            setCurrentUserSavedItems={setCurrentUserSavedItems}
          />
        </div>
        <div className="user-saved-characters"></div>
        <h2>Saved characters</h2>
        {!currentUserSavedItemsData ||
          (!currentUserSavedItemsData?.characters.length && (
            <p>No comics saved yet</p>
          ))}
        {charactersNotFound && (
          <div>
            ⚠️ Some characters couldn't be retrieved from Marvel's database
          </div>
        )}
        <Gallery
          type="character"
          items={currentUserSavedItemsData.characters}
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
          currentUserSavedItems={currentUserSavedItems}
          setCurrentUserSavedItems={setCurrentUserSavedItems}
        />{" "}
      </section>
    </div>
  );
};

export default User;
