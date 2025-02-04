import axios from "axios";
import { useEffect, useState } from "react";
import Gallery from "../components/Gallery";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";

const Comics = ({ setShowModalsContainer, setModalToShow }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [title, setTitle] = useState("");
  const [limit, setLimit] = useState(100);
  const [skip, setSkip] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function fetchData() {
      console.log("Retrieving comics...");

      try {
        const response = await axios.get(
          `https://site--marvel-back--44tkxvkbbxk5.code.run/comics?title=${title}&limit=${limit}&skip=${skip}`
        );
        console.log("Comics retrieved...");

        // console.log(response);

        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
        setIsLoading(false);
        setError(error.message);
      }
    }

    fetchData();
  }, [page, title, skip, limit]);

  // console.log("Rendering Comics");

  if (isLoading) {
    return <div className="is-loading">Chargement...</div>;
  }

  if (error) {
    return <div className="loading-error">Oups</div>;
  }

  return (
    <>
      <SearchBar setValue={setTitle} count={data.count} type="comic" />

      <Pagination
        count={data.count}
        page={page}
        setPage={setPage}
        limit={limit}
        skip={skip}
        setSkip={setSkip}
        type="comic"
      />
      <Gallery type="comic" items={data.results} count={data.count} />
      <Pagination
        count={data.count}
        page={page}
        setPage={setPage}
        limit={limit}
        skip={skip}
        setSkip={setSkip}
        type="comic"
      />
    </>
  );
};

export default Comics;
