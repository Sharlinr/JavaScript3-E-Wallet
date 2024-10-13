import React from "react";
import { Link, useNavigate } from "react-router-dom";
import CardForm from "../components/CardForm";

const AddCard = ({ cards = [], onAddCard }) => {
  const navigate = useNavigate();

  if (cards.length >= 4) {
    return (
      <main className="p-6 text-center">
        <header>
          <h1 className="text-2xl font-bold mb-6">Card limit reached</h1>
        </header>
        <nav>
          <Link to="/">
            <button className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300">
              Back to homepage
            </button>
          </Link>
        </nav>
      </main>
    );
  }

  const handleAddCard = (newCard) => {
    onAddCard(newCard);
    navigate("/");
  };
  return (
    <main className="mb-6">
      <header className="text-center">
        <h1 className="text-2xl font-bold mb-6">Add new card</h1>
      </header>

      <section>
        <CardForm onSubmit={handleAddCard} />
      </section>

      <nav className="mt-6 text-center">
        <Link to="/">
          <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300">
            Back to homepage
          </button>
        </Link>
      </nav>
    </main>
  );
};

export default AddCard;
