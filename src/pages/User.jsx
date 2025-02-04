import { useEffect, useState } from "react";
import axios from "axios";
import Gallery from "../components/Gallery";

const User = () => {
  const [localUser, setLocalUser] = useState(
    JSON.parse(localStorage.getItem("localUser"))
  );

  const [localData, setLocalData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    async function getData() {
      console.log("Retrieving data...");
      let newLocalData = { comics: [], characters: [] };
      try {
        // let retrievedComics = [];
        for (let comic of localUser.saved.comics) {
          let response = await axios(
            `https://site--marvel-back--44tkxvkbbxk5.code.run/comic/${comic}`
          );
          newLocalData.comics.push(response.data);
        }
        for (let character of localUser.saved.characters) {
          let response = await axios(
            `https://site--marvel-back--44tkxvkbbxk5.code.run/character/${character}`
          );
          newLocalData.characters.push(response.data);
        }
        console.log("Data retrieved");
        setLocalData(newLocalData);
        setIsLoading(false);
      } catch (error) {
        console.log(error?.message);
        setError(true);
        setIsLoading(false);
      }
    }
    getData();
  }, [localUser]);

  // console.log(localUser);

  if (isLoading) {
    return (
      <div className="user-saved">
        <h1>{localUser.username}</h1>
        <div className="user-saved-comics">
          <h2>Saved comics</h2>
          <ul>
            {localUser.saved.comics.map((comic, index) => {
              return <li key={index}>{comic}</li>;
            })}
          </ul>
        </div>
        <div className="user-saved-characters">
          <h2>Saved characters</h2>
          <ul>
            {localUser.saved.characters.map((comic, index) => {
              return <li key={index}>{comic}</li>;
            })}
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div className="user-saved">
      <h1>{localUser.username}</h1>
      <h2>Saved comics</h2>
      <div className="user-saved-comics">
        <Gallery
          type="comic"
          items={localData.comics}
          count={localData.comics.length}
        />
      </div>
      <div className="user-saved-characters"></div>
      <h2>Saved characters</h2>
      <Gallery
        type="character"
        items={localData.characters}
        count={localData.characters.length}
      />
    </div>
  );
};

export default User;
