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
  const [showModalsContainer, setShowModalsContainer] = useState(false);
  const [modalToShow, setModalToShow] = useState("");

  const [syncrhonizingError, setSyncrhonizingError] = useState(null);

  const [currentUser, setCurrentUser] = useState(
    JSON.parse(Cookies.get("userCookie") ?? null)
  );
  // console.log("currentUser is", currentUser);

  const [currentUserSavedItems, setCurrentUserSavedItems] = useState(
    JSON.parse(localStorage.getItem(`${currentUser?.username}`)) ?? null
  );

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
