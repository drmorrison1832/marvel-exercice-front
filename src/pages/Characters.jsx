import axios from "axios";
import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import Gallery from "../components/Gallery";
import Pagination from "../components/Pagination";

const Characters = ({
  currentUser,
  setCurrentUser,
  currentUserSavedItems,
  setCurrentUserSavedItems,
}) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [name, setName] = useState("");
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(25);

  useEffect(() => {
    async function fetchData() {
      console.log("Retrieving characters...");
      try {
        const response = await axios.get(
          `https://site--marvel-back--44tkxvkbbxk5.code.run/characters?name=${name}&limit=${limit}&skip=${skip}`
        );
        console.log("Characters retrieved...");
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
  }, [name, skip, limit]);

  console.log("Rendering Characters");

  if (isLoading) {
    return <div className="is-loading">Loading...</div>;
  }

  if (error) {
    return <div className="loading-error">Oups</div>;
  }

  return (
    <>
      <SearchBar
        value={name}
        setValue={setName}
        count={data.count}
        skip={skip}
        setSkip={setSkip}
        type="character"
      />
      <Pagination
        count={data.count}
        limit={limit}
        skip={skip}
        setSkip={setSkip}
        type="character"
      />
      <Gallery
        type="character"
        items={data.results}
        count={data.count}
        isLoading={isLoading}
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
        currentUserSavedItems={currentUserSavedItems}
        setCurrentUserSavedItems={setCurrentUserSavedItems}
      />
      <Pagination
        count={data.count}
        limit={limit}
        skip={skip}
        setSkip={setSkip}
        type="character"
      />
    </>
  );
};

export default Characters;
