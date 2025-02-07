import { useEffect, useState } from "react";
import axios from "axios";
import Gallery from "../components/Gallery";
import LoginForm from "../components/LoginForm";
import Cookies from "js-cookie";
import LogoutButton from "../components/LogoutButton";

const User = ({
  currentUser,
  setCurrentUser,
  currentUserSavedItems,
  setCurrentUserSavedItems,
}) => {
  console.log("Rendering User");

  // const [currentUser, setCurrentUser] = useState(
  //   JSON.parse(Cookies.get("userCookie") ?? null)
  // );
  // console.log("currentUser is", currentUser);

  // const [currentUserSavedItems, setCurrentUserSavedItems] = useState(
  //   JSON.parse(localStorage.getItem(`${currentUser?.username}`)) ?? null
  // );
  // console.log("currentUserSavedItems is", currentUserSavedItems);

  const [currentUserSavedItemsData, setCurrentUserSavedItemsData] = useState(
    new Object()
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [comicsNotFound, setComicsNotFound] = useState(false);
  const [charactersNotFound, setCharactersNotFound] = useState(false);

  useEffect(() => {
    async function getData() {
      console.log("Retrieving data...");
      setError(null);
      let newLocalCollectionData = {
        comics: new Array(),
        characters: new Array(),
      };
      try {
        for (let comic of currentUserSavedItems.comics) {
          let comicResponse = await axios(
            `http://localhost:3000/comic/${comic}`
            // `https://site--marvel-back--44tkxvkbbxk5.code.run/comic/${comic}`
          );

          comicResponse.data
            ? newLocalCollectionData.comics.push(comicResponse.data)
            : setComicsNotFound(true);
        }

        for (let character of currentUserSavedItems.characters) {
          let characterResponse = await axios(
            `http://localhost:3000/character/${character}`
            // `https://site--marvel-back--44tkxvkbbxk5.code.run/character/${character}`
          );

          characterResponse.data
            ? newLocalCollectionData.characters.push(characterResponse.data)
            : setCharactersNotFound(true);
        }

        console.log("Data retrieved");
        setCurrentUserSavedItemsData(newLocalCollectionData);
        setError(null);
        setIsLoading(false);
      } catch (error) {
        console.error(error.message);
        setError(error.message);
        setIsLoading(false);
      }
    }
    currentUser && getData();
  }, [currentUser, currentUserSavedItems]);

  useEffect(() => {
    !currentUser && setIsLoading(false);
  }, [currentUser]);

  if (currentUser && isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Oups</div>;
  }

  return (
    <section className="user-saved">
      {currentUser ? (
        <LogoutButton
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
          setCurrentUserSavedItems={setCurrentUserSavedItems}
        />
      ) : (
        <div>
          <p>Create an account or login to create a collection.</p>
          <LoginForm
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
            setCurrentUserSavedItems={setCurrentUserSavedItems}
          />
        </div>
      )}

      {/* <h1>{localUser.username}</h1> */}
      {currentUser && (
        <section>
          <h2>Saved comics</h2>
          <div className="user-saved-comics">
            {comicsNotFound && (
              <div>
                ⚠️ Some comics couldn't be retrieved from Marvel Database
              </div>
            )}
            <Gallery
              type="comic"
              items={currentUserSavedItemsData.comics}
              count={currentUserSavedItemsData.comics.length}
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
              currentUserSavedItems={currentUserSavedItems}
              setCurrentUserSavedItems={setCurrentUserSavedItems}
            />
          </div>
          <div className="user-saved-characters"></div>
          <h2>Saved characters</h2>
          {charactersNotFound && (
            <div>
              ⚠️ Some characters couldn't be retrieved from Marvel's database
            </div>
          )}
          <Gallery
            type="character"
            items={currentUserSavedItemsData.characters}
            count={currentUserSavedItemsData.characters.length}
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
            currentUserSavedItems={currentUserSavedItems}
            setCurrentUserSavedItems={setCurrentUserSavedItems}
          />{" "}
        </section>
      )}
    </section>
  );
};

export default User;
