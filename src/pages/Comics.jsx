import axios from "axios";
import { useEffect, useState, useRef } from "react";
import Gallery from "../components/Gallery";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";

const Comics = ({
  currentUser,
  setCurrentUser,
  currentUserSavedItems,
  setCurrentUserSavedItems,
  // title,
  // setTitle,
  // limit,
  // setLimit,
  // skip,
  // setSkip,
}) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [title, setTitle] = useState("");
  const [limit, setLimit] = useState(25);
  const [skip, setSkip] = useState(0);

  // console.log("title is", title);

  useEffect(() => {
    async function fetchData() {
      console.log("Retrieving comics...");
      setIsLoading(true);
      try {
        const response = await axios.get(
          `https://site--marvel-back--44tkxvkbbxk5.code.run/comics?title=${title}&limit=${limit}&skip=${skip}`
        );
        console.log("Comics retrieved...");
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

  // if (isLoading) {
  //   return <div className="is-loading">Loading...</div>;
  // }

  if (error) {
    return <div className="loading-error">Oups</div>;
  }

  return (
    <>
      <SearchBar
        query={title}
        setQuery={setTitle}
        count={data?.count ?? null}
        skip={skip}
        setSkip={setSkip}
        type="comic"
      />
      {data?.count > 0 && (
        <Pagination
          count={data?.count ?? null}
          limit={limit}
          skip={skip}
          setSkip={setSkip}
          type="comic"
        />
      )}
      <Gallery
        type="comic"
        items={data?.results}
        isLoading={isLoading}
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
        currentUserSavedItems={currentUserSavedItems}
        setCurrentUserSavedItems={setCurrentUserSavedItems}
      />
      {!isLoading && data?.count > 0 && (
        <Pagination
          count={data?.count ?? null}
          limit={limit}
          skip={skip}
          setSkip={setSkip}
          type="comic"
        />
      )}
    </>
  );
};

export default Comics;
