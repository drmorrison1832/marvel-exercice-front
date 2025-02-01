import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import Home from "./pages/Home";
import Characters from "./pages/Characters";
import Comics from "./pages/Comics";
import User from "./pages/User";
import Header from "./components/Header";

import "./App.scss";

function App() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState();
  const [error, setError] = useState();

  return (
    <>
      <Header />
      <main className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/comics" element={<Comics />} />
          <Route path="/characters" element={<Characters />} />
          <Route path="/user" element={<User />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
