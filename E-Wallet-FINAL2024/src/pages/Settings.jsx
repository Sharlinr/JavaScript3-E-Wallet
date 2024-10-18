import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteInactiveCards } from "../redux/cardSlice";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { setTheme } from "../redux/themeSlice";

const Settings = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentTheme = useSelector((state) => state.theme.theme);

  const handleThemeChange = (theme) => {
    dispatch(setTheme(theme));
  };

  const cards = useSelector((state) => state.cards.cards);
  const inactiveCards = cards.filter((card) => !card.isActive);

  const handleDeleteInactive = () => {
    dispatch(deleteInactiveCards());
    navigate("/");
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Settings</h1>
      <h2 className="text-xl font-semibold mb-4">Choose a Theme:</h2>
      <div className="flex space-x-4">
        <button
          onClick={() => handleThemeChange("light")}
          className={`py-2 px-4 rounded-lg ${
            currentTheme === "light" ? "bg-blue-500 text-white" : "bg-gray-300"
          }`}
        >
          Light Theme
        </button>
        <button
          onClick={() => handleThemeChange("dark")}
          className={`py-2 px-4 rounded-lg ${
            currentTheme === "dark" ? "bg-blue-500 text-white" : "bg-gray-300"
          }`}
        >
          Dark Theme
        </button>
        <button
          onClick={() => handleThemeChange("green")}
          className={`py-2 px-4 rounded-lg ${
            currentTheme === "green" ? "bg-blue-500 text-white" : "bg-gray-300"
          }`}
        >
          Green Theme
        </button>
      </div>

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
