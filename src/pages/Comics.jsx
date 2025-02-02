import axios from "axios";
import { useEffect, useState } from "react";
import ComicsGallery from "../components/ComicsGallery";
import SearchBar from "../components/SearchBar";

const Comics = ({ setShowModalsContainer, setModalToShow }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [title, setTitle] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `https://site--marvel-back--44tkxvkbbxk5.code.run/comics?title=${title}`
        );
        // console.log(response);
        let sortedData = response.data;

        response;

        setData(sortedData);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
        setIsLoading(false);
        setError(error.message);
      }
    }

    fetchData();
  }, [title]);

  if (isLoading) {
    return <div className="is-loading">Chargement...</div>;
  }

  if (error) {
    return <div className="loading-error">Oups</div>;
  }

  return (
    <>
      <SearchBar setValue={setTitle} />
      <ComicsGallery comics={data.results} count={data.count} />
    </>
  );
};

export default Comics;
