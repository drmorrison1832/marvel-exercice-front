import axios from "axios";
import { useState, useEffect } from "react";

const Home = ({
  currentUser,
  setCurrentUser,
  currentUserSavedItems,
  setCurrentUserSavedItems,
}) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
      } catch (error) {}
    }
    fetchData();
  }, []);

  // if (isLoading) {
  //   return <div className="is-loading">Home: Loading...</div>;
  // }

  // if (error) {
  //   return <div className="loading-error">Home: Oups</div>;
  // }

  return (
    <section className="home">
      <h1> Exercice done at Le Reacteur</h1>
    </section>
  );
};

export default Home;
