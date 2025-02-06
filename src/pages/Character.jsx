import axios from "axios";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import SaveIcon from "../components/SaveIcon";

const Character = () => {
  const { characterID } = useParams();

  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [comicsData, setComicsData] = useState();
  const [isComicsDataLoading, setComicsDataIsLoading] = useState(false);
  const [comicsDataError, setComicsDataError] = useState(false);

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
    return <div className="is-loading">Chargement...</div>;
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
        <SaveIcon type="character" itemID={characterID} />
      </div>
      <div className="character-name">{data.name}</div>
      <div className="character-description">
        {data.description || "No description..."}
      </div>
      <h2>Appears in...</h2>
      <div className="character-appearances-section">
        {data.comics.map((comic) => {
          return (
            <Link to={`/comic/${comic._id}`} key={comic._id}>
              <div className="character-appearance">
                <div className="thumbnail-container">
                  <img
                    src={`${comic.thumbnail.path}/portrait_medium.${comic.thumbnail.extension}`}
                    alt={comic.title}
                  />
                </div>
                <div className="character-appearance-title">{comic.title}</div>
              </div>
            </Link>
          );
        })}
      </div>
    </article>
  );
};

export default Character;
