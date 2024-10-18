import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Card from "../components/Card";
import { useSelector, useDispatch } from "react-redux";
import { deleteCard, activateCard } from "../redux/cardSlice";

const Home = () => {
  const cards = useSelector((state) => state.cards.cards);
  //const activeCard = useSelector((state) => state.cards.activeCard);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const activeCard = cards.find((card) => card.isActive);
  const inactiveCards = cards.filter((card) => !card.isActive);

  const handleActivate = (id) => {
    dispatch(activateCard(id));
  };

  const handleDelete = (id) => {
    dispatch(deleteCard(id));
  };

  const handleEdit = (id) => {
    navigate(`/card/${id}`);
  };

  const handleNavigateToSettings = () => {
    navigate("/settings");
  };

  return (
    <main className="p-4">
      <header>
        <h1 className="text-2xl font-bold mb-6">Your Cards</h1>
      </header>

      {activeCard ? (
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Active Card</h2>
          <Card card={activeCard} showBtns={false} />
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
                  onActivate={() => handleActivate(card.id)}
                  onDelete={() => handleDelete(card.id)}
                  onEdit={() => handleEdit(card.id)}
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
          <p className="text-red-500">You have reached your card limit</p>
        )}

        <button
          onClick={handleNavigateToSettings}
          className="ml-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Settings
        </button>
      </nav>
    </main>
  );
};

export default Home;
