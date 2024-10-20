import { useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  updateCard,
  deleteCard,
  activateCard,
  setEditMode,
} from "../redux/cardSlice";
import CardForm from "../components/CardForm";

const CardDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const card = useSelector((state) =>
    state.cards.cards.find((c) => c.id === parseInt(id, 10))
  );

  if (!card) {
    return (
      <div>
        <p>Card not found</p>
        <Link to="/">Back to homepage</Link>
      </div>
    );
  }

  useEffect(() => {
    dispatch(setEditMode(true));
    return () => {
      dispatch(setEditMode(false));
    };
  }, [dispatch]);

  const handleSave = (newCardDetails) => {
    dispatch(updateCard({ id: card.id, updatedCard: newCardDetails }));
    navigate("/");
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
        isEditMode={true}
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
