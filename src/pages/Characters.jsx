import axios from "axios";
import { useEffect, useState } from "react";

const Characters = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          "https://site--marvel-back--44tkxvkbbxk5.code.run/characters"
        );
        console.log(response);
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

  if (isLoading) {
    return <div className="is-loading">Chargement...</div>;
  }

  if (error) {
    return <div className="loading-error">Oups</div>;
  }

  return (
    <div>
      <h1>Characters</h1>
      <section className="gallery">
        {data.results.map((character) => {
          return (
            <article className="article test1" key={character._id}>
              <div className="thumbnail">
                <img
                  src={
                    character.thumbnail.path +
                    "/portrait_xlarge" +
                    "." +
                    character.thumbnail.extension
                  }
                  alt=""
                />
              </div>
              <div className="name">{character.name}</div>
              {character.description && (
                <div className="description">{character.description}</div>
              )}
            </article>
          );
        })}
      </section>
    </div>
  );
};

export default Characters;
