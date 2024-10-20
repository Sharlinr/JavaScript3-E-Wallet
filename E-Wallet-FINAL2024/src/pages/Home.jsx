import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Card from "../components/Card";
import { useSelector, useDispatch } from "react-redux";
import { deleteCard, activateCard } from "../redux/cardSlice";

const Home = () => {
  const cards = useSelector((state) => state.cards.cards);

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
    <main className="flex flex-col items-center p-4 bg-gray-100 min-h-screen">
      <div
        className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md"
        style={{
          backgroundColor: "var(--bg-color)",
          color: "var(--text-color)",
          minHeight: "100vh",
        }}
      >
        <header className="mb-4">
          <h1 className="text-3xl font-bold mb-4 text-center">Your Cards</h1>
        </header>
        {activeCard ? (
          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">Active Card</h2>
            <Card card={activeCard} showBtns={false} />
          </section>
        ) : (
          <p className="text-center text-muted">No active cards</p>
        )}
        <section>
          <h3 className="text-xl font-semibold  mb-2">Inactive Cards</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
              <p className="text-center ">No inactive cards</p>
            )}
          </div>
        </section>
        <nav className="mt-6 flex flex-col items-center">
          {cards.length < 4 ? (
            <Link to="/addcard" className="w-full">
              <button className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300">
                Add Card
              </button>
            </Link>
          ) : (
            <p className="text-red-500">You have reached your card limit</p>
          )}

          <button
            onClick={handleNavigateToSettings}
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300 w-full"
          >
            Settings
          </button>
        </nav>
      </div>
    </main>
  );
};

export default Home;
