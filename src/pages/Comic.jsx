import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SaveIcon from "../components/SaveIcon";
// import { useLocation } from "react-router-dom";

const Comic = ({
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
  const { comicID } = useParams();

  // const location = useLocation();
  // console.log(location);

  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  // console.log("title is", title);
  // const navigate = useNavigate();

  const comic = data;

  useEffect(() => {
    async function fetchData() {
      console.log("Retrieving comic data...");
      try {
        const response = await axios.get(
          `https://site--marvel-back--44tkxvkbbxk5.code.run/comic/${comicID}`
        );
        console.log("Comic data retrieved");
        setData(response.data);
        setError(null);
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
    return <div className="is-loading">Loading...</div>;
  }

  if (error) {
    return <div className="loading-error">Oups</div>;
  }

  return (
    <article className="comic-page">
      <div
        className="back-button"
        onClick={() => {
          history.go(-1);
          // navigate("/comics");
        }}
      >
        Go back
      </div>
      <div className="comic-thumbnail-container">
        <img
          src={
            comic.thumbnail.path +
            "/portrait_uncanny" +
            "." +
            comic.thumbnail.extension
          }
          alt={comic.title}
        />
        <SaveIcon
          type={"comic"}
          itemID={comicID}
          currentUser={currentUser}
          currentUserSavedItems={currentUserSavedItems}
          setCurrentUserSavedItems={setCurrentUserSavedItems}
        />
      </div>
      <div className="comic-title">{comic.title}</div>
      <div className="comic-description">{comic.description}</div>
      <div
        className="back-button"
        onClick={() => {
          history.go(-1);
        }}
      >
        Go back
      </div>
    </article>
  );
};

export default Comic;
