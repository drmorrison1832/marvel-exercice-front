import axios from "axios";
import { useEffect, useState } from "react";
import Gallery from "../components/Gallery";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";

const Comics = ({
  currentUser,
  setCurrentUser,
  currentUserSavedItems,
  setCurrentUserSavedItems,
  setShowModalsContainer,
  setModalToShow,
  isSynchronizing,
  setIsSynchronizing,
}) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [title, setTitle] = useState("");
  const [limit, setLimit] = useState(25);
  const [skip, setSkip] = useState(0);

  useEffect(() => {
    async function fetchData() {
      console.log("Retrieving comics...");

      try {
        const response = await axios.get(
          `https://site--marvel-back--44tkxvkbbxk5.code.run/comics?title=${title}&limit=${limit}&skip=${skip}`
        );
        console.log("Comics retrieved...");

        // console.log(response.data.count);

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
  }, [title, skip, limit]);

  console.log("Rendering Comics");

  if (isLoading) {
    return <div className="is-loading">Loading...</div>;
  }

  if (error) {
    return <div className="loading-error">Oups</div>;
  }

  return (
    <>
      <SearchBar
        value={title}
        setValue={setTitle}
        count={data.count}
        type="comic"
        skip={skip}
        setSkip={setSkip}
      />

      <Pagination
        count={data.count}
        limit={limit}
        skip={skip}
        setSkip={setSkip}
        type="comic"
      />
      <Gallery
        type="comic"
        items={data.results}
        count={data.count}
        isLoading={isLoading}
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
        currentUserSavedItems={currentUserSavedItems}
        setCurrentUserSavedItems={setCurrentUserSavedItems}
        isSynchronizing={isSynchronizing}
        setIsSynchronizing={setIsSynchronizing}
      />
      <Pagination
        count={data.count}
        limit={limit}
        skip={skip}
        setSkip={setSkip}
        type="comic"
      />
    </>
  );
};

export default Comics;
