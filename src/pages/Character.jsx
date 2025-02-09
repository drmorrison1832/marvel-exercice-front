import axios from "axios";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import SaveIcon from "../components/SaveIcon";
import Gallery from "../components/Gallery";

const Character = ({
  currentUser,
  setCurrentUser,
  currentUserSavedItems,
  setCurrentUserSavedItems,
}) => {
  const { characterID } = useParams();

  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [comicsData, setComicsData] = useState();
  const [isComicsDataLoading, setComicsDataIsLoading] = useState(false);
  const [comicsDataError, setComicsDataError] = useState(false);

  const [appearancesSkip, setAppearancesSkip] = useState(0);

  useEffect(() => {
    async function fetchData() {
      console.log("Retrieving character data...");
      try {
        const response = await axios.get(
          `https://site--marvel-back--44tkxvkbbxk5.code.run/character/${characterID}`
        );
        console.log("Character data retrieved");

        console.log(`Retrieving comic data for ${response.data.name}...`);

        for (let index = 0; index < response.data.comics.length; index++) {
          try {
            let responseComic = await axios.get(
              `https://site--marvel-back--44tkxvkbbxk5.code.run/comic/${response.data.comics[index]}`
            );

            response.data.comics[index] = responseComic.data;
          } catch (error) {
            console.log(error);
            setComicsDataError(true);
          }
          console.log(`Comic data for ${response.data.name} retrieved`);
        }

        setData(response.data);
        setError(null);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
        setIsLoading(false);
        setError(error.message);
      }
    }
    fetchData();
  }, []);

  if (isLoading || isComicsDataLoading) {
    return <div className="is-loading">Loading...</div>;
  }

  if (error || comicsDataError) {
    return <div className="loading-error">Oups</div>;
  }

  return (
    <article className="character-page">
      <div className="character-thumbnail-container">
        <img
          src={`${data.thumbnail.path}.${data.thumbnail.extension}`}
          alt={data.name}
        />

        <SaveIcon
          type="character"
          itemID={characterID}
          currentUser={currentUser}
          currentUserSavedItems={currentUserSavedItems}
          setCurrentUserSavedItems={setCurrentUserSavedItems}
        />
      </div>
      <div className="character-name">{data.name}</div>
      <div className="character-description">
        {data.description || "No description..."}
      </div>

      <section className="character-appearances-section">
        <h2>Appears in...</h2>

        {!data.comics || !data.comics?.length ? (
          <p>No appearances yet...</p>
        ) : (
          <Gallery
            type="comic"
            items={data.comics}
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
            currentUserSavedItems={currentUserSavedItems}
            setCurrentUserSavedItems={setCurrentUserSavedItems}
          />
        )}
      </section>

      {/* <h2>Appears in...</h2>
      <div className="character-appearances-section">
        {data.comics.map((comic) => {
          return (
            <div className="character-appearance-comic" key={comic._id}>
              <Link to={`/comic/${comic._id}`}>
                <div className="caracter-appearance-comic-thumbnail-container">
                  <img
                    src={`${comic.thumbnail.path}/portrait_medium.${comic.thumbnail.extension}`}
                    alt={comic.title}
                  />
                </div>
              </Link>
              <div className="character-appearance-title">
                {comic.title}
                <SaveIcon
                  type="comic"
                  itemID={comic._id}
                  currentUser={currentUser}
                  currentUserSavedItems={currentUserSavedItems}
                  setCurrentUserSavedItems={setCurrentUserSavedItems}
                />
              </div>
            </div>
          );
        })}
      </div> */}
    </article>
  );
};

export default Character;
