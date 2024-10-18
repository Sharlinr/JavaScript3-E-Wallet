import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateCard, deleteCard, activateCard } from "../redux/cardSlice";
import CardForm from "../components/CardForm";
import { getFormErrors } from "../utils/validationHelpers";

const CardDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const card = useSelector((state) =>
    state.cards.cards.find((c) => c.id === parseInt(id))
  );

  if (!card) {
    return <p>Card not found</p>;
  }

  const handleSave = (newCardDetails) => {
    //const formErrors = getFormErrors(newCardDetails, true);

    //const hasErrors = Object.values(formErrors).some((error) => error !== "");

    if (!card.isActive) {
      const formErrors = getFormErrors(newCardDetails, card.isActive); // Passa in card.isActive
      const hasErrors = Object.values(formErrors).some((error) => error !== "");
      //dispatch(updateCard({ id: card.id, updatedCard: newCardDetails }));
      //navigate("/");

      if (!hasErrors) {
        dispatch(updateCard({ id: card.id, updatedCard: newCardDetails }));
        navigate("/");
      } else {
        console.log("Validation errors (carddetails.jsx)", formErrors);
      }
    } else {
      //const formErrors = getFormErrors(newCardDetails, card.isActive);  // Passa in card.isActive
      //const hasErrors = Object.values(formErrors).some((error) => error !== "");
      console.log("Kortet är aktivt och kan inte redigeras.");
    }
  };

  const handleActivate = () => {
    dispatch(activateCard(card.id));
    navigate("/");
  };

  const handleDelete = () => {
    dispatch(deleteCard(card.id));
    navigate("/");
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Card</h1>

      <CardForm
        onSubmit={handleSave}
        initialValues={card}
        submitText="Save Changes"
        isActive={card.isActive}
      />

      {!card.isActive && (
        <div className="mt-4">
          <button
            onClick={handleActivate}
            className="bg-green-500 text-white py-2 px-4 rounded-lg"
          >
            Activate Card
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white py-2 px-4 rounded-lg ml-4"
          >
            Delete Card
          </button>
        </div>
      )}
    </div>
  );
};

export default CardDetails;
