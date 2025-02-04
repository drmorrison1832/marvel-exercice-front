import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

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

  useEffect(() => {
    function createLocallySaved() {
      const locallySaved = { saved: { comics: [], characters: [] } };
      if (!localStorage.getItem("locallySaved")) {
        localStorage.setItem("locallySaved", JSON.stringify(locallySaved));
      }
    }
    createLocallySaved();
    // console.log(JSON.parse(localStorage.getItem("locallySaved")));
  }, []);

  return (
    <>
      <Header />
      <main className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/comics" element={<Comics />} />
          <Route path="/comic/:comicID" element={<Comic />} />
          <Route path="/character/:characterID" element={<Character />} />
          <Route path="/characters" element={<Characters />} />
          <Route path="/user" element={<User />} />
          <Route path="*" element={<Home />} />
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
