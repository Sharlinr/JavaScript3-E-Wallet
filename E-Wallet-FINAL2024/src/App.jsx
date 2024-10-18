import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import "./App.css";
import CardDetails from "./pages/CardDetails";
import AddCard from "./pages/AddCard";
import Settings from "./pages/Settings";
import Home from "./pages/Home";
import CardSettings from "./pages/CardSettings";

function App() {
  const theme = useSelector((state) => state.theme.theme);

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <>
      <h1>E-WALLET</h1>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/addcard" element={<AddCard />} />
        <Route path="/cardsettings" element={<CardSettings />} />
        <Route path="/card/:id" element={<CardDetails />} />

        <Route path="/settings" element={<Settings />} />
      </Routes>
    </>
  );
}

export default App;
