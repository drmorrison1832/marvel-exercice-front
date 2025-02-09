import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";

import "./style/App.scss";

import Home from "./pages/Home";
import Characters from "./pages/Characters";
import Comics from "./pages/Comics";
import Comic from "./pages/Comic";
import User from "./pages/User";
import Header from "./components/Header";
import ModalContainer from "./components/ModalContainer";
import Character from "./pages/Character";

function App() {
  console.log("Rendering App");

  const [showModalsContainer, setShowModalsContainer] = useState(false);
  const [modalToShow, setModalToShow] = useState("");

  const [syncrhonizingError, setSyncrhonizingError] = useState(null);

  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const [currentUser, setCurrentUser] = useState();

  const [currentUserSavedItems, setCurrentUserSavedItems] = useState(null);

  useEffect(() => {
    function defineCurentUser() {
      if (Cookies.get("userCookie")) {
        setCurrentUser(JSON.parse(Cookies.get("userCookie")));
        console.log("currentUser is", currentUser);
      }
    }
    defineCurentUser();
  }, []);

  useEffect(() => {
    async function getSavedItems() {
      if (!currentUser) {
        console.log("Not connected yet");
        return;
      }
      console.log("Retrieving saved items...");
      setError(null);
      setIsLoading(true);

      try {
        const config = {
          headers: { authorization: `Bearer ${currentUser.token}` },
        };

        const savedItemsResponse = await axios.get(
          "https://site--marvel-back--44tkxvkbbxk5.code.run/saved",
          // "http://localhost:3000/saved",
          config
        );
        console.log("Saved items successfully retrieved");

        setCurrentUserSavedItems(savedItemsResponse.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
        console.log(
          "Server response:",
          error.response?.data?.message ?? error?.message
        );
        setError(error.response?.data?.message ?? error?.message);
      }
    }
    getSavedItems();
    setIsLoading(false);
  }, [currentUser]);

  if (isLoading) {
    return <div>Loadgin...</div>;
  }

  return (
    <>
      <Header
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
        currentUserSavedItems={currentUserSavedItems}
        setCurrentUserSavedItems={setCurrentUserSavedItems}
      />
      <main className="main">
        <Routes>
          <Route
            path="/"
            element={
              <Home
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
                currentUserSavedItems={currentUserSavedItems}
                setCurrentUserSavedItems={setCurrentUserSavedItems}
              />
            }
          />
          <Route
            path="/comics"
            element={
              <Comics
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
                currentUserSavedItems={currentUserSavedItems}
                setCurrentUserSavedItems={setCurrentUserSavedItems}
              />
            }
          />
          <Route
            path="/comic/:comicID"
            element={
              <Comic
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
                currentUserSavedItems={currentUserSavedItems}
                setCurrentUserSavedItems={setCurrentUserSavedItems}
              />
            }
          />
          <Route
            path="/character/:characterID"
            element={
              <Character
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
                currentUserSavedItems={currentUserSavedItems}
                setCurrentUserSavedItems={setCurrentUserSavedItems}
              />
            }
          />
          <Route
            path="/characters"
            element={
              <Characters
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
                currentUserSavedItems={currentUserSavedItems}
                setCurrentUserSavedItems={setCurrentUserSavedItems}
              />
            }
          />
          <Route
            path="/user"
            element={
              <User
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
                currentUserSavedItems={currentUserSavedItems}
                setCurrentUserSavedItems={setCurrentUserSavedItems}
              />
            }
          />
          <Route
            path="*"
            element={
              <Home
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
                currentUserSavedItems={currentUserSavedItems}
                setCurrentUserSavedItems={setCurrentUserSavedItems}
              />
            }
          />
        </Routes>
      </main>
      {showModalsContainer && (
        <ModalContainer
          setShowModalsContainer={setShowModalsContainer}
          modalToShow={modalToShow}
          setModalToShow={setModalToShow}
        />
      )}
    </>
  );
}

export default App;
