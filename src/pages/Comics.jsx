import axios from "axios";
import { useEffect, useState } from "react";

const Comics = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          "https://site--marvel-back--44tkxvkbbxk5.code.run/comics"
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
      <h1>Comics</h1>
      <section className="comics-showcase">
        {data.results.map((comic) => {
          return (
            <article className="article test1" key={comic._id}>
              <div className="title">{comic.title}</div>
              <div className="description">{comic.description}</div>
              <div className="thumbnail">
                <img
                  src={
                    comic.thumbnail.path +
                    "/portrait_medium" +
                    "." +
                    comic.thumbnail.extension
                  }
                  alt=""
                />
              </div>
            </article>
          );
        })}
      </section>
    </div>
  );
};

export default Comics;
