import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import CardDetails from "./pages/CardDetails";
import AddCard from "./pages/AddCard";
import Settings from "./pages/Settings";
import Home from "./pages/Home";
import CardSettings from "./pages/CardSettings";

function App() {
  const [cards, setCards] = useState([]);

  const handleAddCard = (newCard) => {
    if (cards.length < 4) {
      setCards([
        ...cards,
        { ...newCard, id: cards.length + 1, isActive: false },
      ]);
    }
  };

  const handleUpdateCard = (id, updatedCard) => {
    setCards(
      cards.map((card) =>
        card.id === parseInt(id) ? { ...card, ...updatedCard } : card
      )
    );
  };

  const handleActivateCard = (id) => {
    setCards(
      cards.map((card) =>
        card.id === id
          ? { ...card, isActive: true }
          : { ...card, isActive: false }
      )
    );
  };

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
