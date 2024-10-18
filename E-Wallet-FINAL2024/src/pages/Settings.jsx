import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteInactiveCards } from "../redux/cardSlice";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Settings = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cards = useSelector((state) => state.cards.cards);
  const inactiveCards = cards.filter((card) => !card.isActive);

  const handleDeleteInactive = () => {
    dispatch(deleteInactiveCards());
    navigate("/");
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Settings</h1>
      <p>There are {inactiveCards.length} inactive cards.</p>
      {inactiveCards.length > 0 ? (
        <button
          onClick={handleDeleteInactive}
          className="bg-red-500 text-white py-2 px-4 rounded-lg"
        >
          Delete All Inactive Cards
        </button>
      ) : (
        <p>No inactive cards to delete.</p>
      )}
      <div className="mt-6">
        <Link to="/">
          <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300">
            Back to Homepage
          </button>
        </Link>
      </div>
    </div>
  );
};
export default Settings;
