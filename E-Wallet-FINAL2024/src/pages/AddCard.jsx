import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CardPreview from "../components/CardPreview";
import { addCard } from "../redux/cardSlice";
import { useDispatch, useSelector } from "react-redux";
import CardForm from "../components/CardForm";

const AddCard = () => {
  const [newCard, setNewCard] = useState({
    issuer: "Visa",
    cardNumber: "",
    cardholder: "",
    expireMonth: "",
    expireYear: "",
    ccv: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  /*  const handleAddCard = (newCard) => {
    onAddCard(newCard);
    navigate("/");
};*/

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCard({ ...newCard, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = Math.random();
    dispatch(addCard({ ...newCard, id, isActive: false }));
    navigate("/");
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Add New Card</h1>
      <CardPreview {...newCard} />

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Formulärfält */}
        <label>Card Issuer</label>
        <select name="issuer" value={newCard.issuer} onChange={handleChange}>
          <option value="Visa">Visa</option>
          <option value="Mastercard">Mastercard</option>
          <option value="American Express">American Express</option>
        </select>

        <label>Card Number</label>
        <input
          type="text"
          name="cardNumber"
          maxLength="16"
          onChange={handleChange}
          required
        />

        <label>Cardholder</label>
        <input type="text" name="cardholder" onChange={handleChange} required />

        <label>Expire Month</label>
        <input
          type="text"
          name="expireMonth"
          onChange={handleChange}
          required
        />

        <label>Expire Year</label>
        <input type="text" name="expireYear" onChange={handleChange} required />

        <label>CCV</label>
        <input
          type="text"
          name="ccv"
          maxLength="3"
          onChange={handleChange}
          required
        />

        <button className="bg-blue-500 text-white py-2 px-4 rounded-lg">
          Add Card
        </button>
      </form>
    </div>
  );
};

/* return (
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
};*/

export default AddCard;
