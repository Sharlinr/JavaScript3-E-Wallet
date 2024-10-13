import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Card from "../components/Card";
import { useSelector, useDispatch } from "react-redux";
import { deleteCard, activateCard } from "../redux/cardSlice";

const Home = ({ cards, onActivate, onDelete }) => {
  const activeCard = cards.find((card) => card.isActive);
  const inactiveCards = cards.filter((card) => !card.isActive);
  const navigate = useNavigate();

  return (
    <main className="p-4">
      <header>
        <h1 className="text-2xl font-bold mb-6">Your Cards</h1>
      </header>

      {activeCard ? (
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Active Cards</h2>
          <Card card={activeCard} onEdit={() => onEdit(activeCard.id)} />
        </section>
      ) : (
        <p>No active cards</p>
      )}

      <section>
        <h3 className="text-xl font-semibold mb-4">Inactive Cards</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {inactiveCards.length > 0 ? (
            inactiveCards.map((card) => (
              <div key={card.id}>
                <Card
                  card={card}
                  onActivate={() => onActivate(card.id)}
                  onDelete={() => onDelete(card.id)}
                  onEdit={() => navigate(`/card/${card.id}`)}
                  showBtns={true}
                />
              </div>
            ))
          ) : (
            <p>No inactive cards</p>
          )}
        </div>
      </section>

      <nav className="mt-6">
        {cards.length < 4 ? (
          <Link to="/addcard">
            <button className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300">
              Add Card
            </button>
          </Link>
        ) : (
          <p className="text-red-500">You have reached limit</p>
        )}
      </nav>
    </main>
  );
};

export default Home;
