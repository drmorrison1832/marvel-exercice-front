import axios from "axios";
import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const Character = () => {
  const { characterID } = useParams();

  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const character = data;

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `https://site--marvel-back--44tkxvkbbxk5.code.run/character/${characterID}`
        );
        console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        // console.log(error.message);
        setIsLoading(false);
        setError(error.message);
      }
    }
    fetchData();
  }, []);

  if (isLoading) {
    return <div className="is-loading">Chargement...</div>;
  }

  if (error) {
    return <div className="loading-error">Oups</div>;
  }

  return (
    <article className="comic-page">
      <div className="thumbnail">
        <img
          src={
            character.thumbnail.path +
            "/portrait_uncanny" +
            "." +
            character.thumbnail.extension
          }
          alt=""
        />
      </div>
      <div className="title">{character.name}</div>
      <div className="description">
        {character.description || "No description"}
      </div>
    </article>
  );
};

export default Character;
