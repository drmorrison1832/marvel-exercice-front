import axios from "axios";
import { useState, useEffect } from "react";

const Home = () => {
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

  if (isLoading) {
    return <div className="is-loading">Home: Chargement...</div>;
  }

  if (error) {
    return <div className="loading-error">Home: Oups</div>;
  }

  return <div>Home</div>;
};

export default Home;
