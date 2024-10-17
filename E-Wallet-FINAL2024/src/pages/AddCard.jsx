import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addCard } from "../redux/cardSlice";
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

  const handleSubmit = (cardDetails) => {
    const id = Math.random();
    dispatch(addCard({ ...cardDetails, id, isActive: false }));
    navigate("/");
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Add New Card</h1>

      <CardForm
        onSubmit={handleSubmit}
        initialValues={newCard}
        submitText="Add Card"
      />
    </div>
  );
};

export default AddCard;
