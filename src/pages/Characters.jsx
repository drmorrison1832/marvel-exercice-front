import axios from "axios";
import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import Gallery from "../components/Gallery";
import Pagination from "../components/Pagination";

const Characters = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [name, setName] = useState("");
  const [limit, setLimit] = useState(100);
  const [skip, setSkip] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `https://site--marvel-back--44tkxvkbbxk5.code.run/characters?name=${name}&limit=${limit}&skip=${skip}`
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
        setIsLoading(false);
        setError(error.message);
      }
    }
    fetchData();
  }, [name]);

  if (isLoading) {
    return <div className="is-loading">Chargement...</div>;
  }

  if (error) {
    return <div className="loading-error">Oups</div>;
  }

  return (
    <>
      <SearchBar setValue={setName} count={data.count} type="character" />
      <Pagination
        count={data.count}
        page={page}
        setPage={setPage}
        limit={limit}
        skip={skip}
        setSkip={setSkip}
        type="character"
      />
      <Gallery type="character" items={data.results} count={data.count} />
      <Pagination
        count={data.count}
        page={page}
        setPage={setPage}
        limit={limit}
        skip={skip}
        setSkip={setSkip}
        type="character"
      />
    </>
  );
};

export default Characters;
