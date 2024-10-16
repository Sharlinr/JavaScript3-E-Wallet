import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateCard, deleteCard, activateCard } from "../redux/cardSlice";

import CardForm from "../components/CardForm";
import CardPreview from "../components/CardPreview";

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

  const [editMode, setEditMode] = useState(false);
  const [updatedCard, setUpdatedCard] = useState({ ...card });

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
        onSubmit={handleSave} // Skickar uppdaterade data tillbaka
        initialValues={card} // Skickar nuvarande kortvärden som initialvärden
        submitText="Save"
      />

      {/* Visa aktivera- och raderaknappen om kortet är inaktivt */}
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

  {
    /* 


      <form className="space-y-4">
        <label>Card Issuer</label>
        <input
          type="text"
          name="issuer"
          value={updatedCard.issuer}
          onChange={handleChange}
          required
        />

        <label>Card Number</label>
        <input
          type="text"
          name="cardNumber"
          value={updatedCard.cardNumber}
          onChange={handleChange}
          maxLength="16"
          required
        />

        <label>Cardholder</label>
        <input
          type="text"
          name="cardholder"
          value={updatedCard.cardholder}
          onChange={handleChange}
          pattern="^[a-zA-Z]+ [a-zA-Z]+$"
          required
        />

        <label>Expire Month</label>
        <input
          type="text"
          name="expireMonth"
          value={updatedCard.expireMonth}
          onChange={handleChange}
          required
        />

        <label>Expire Year</label>
        <input
          type="text"
          name="expireYear"
          value={updatedCard.expireYear}
          onChange={handleChange}
          required
        />

        <label>CCV</label>
        <input
          type="text"
          name="ccv"
          value={updatedCard.ccv}
          onChange={handleChange}
          required
        />

        <button
          onClick={handleSave}
          className="bg-blue-500 text-white py-2 px-4 rounded-lg"
        >
          Save Changes
        </button>
      </form>

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
  */
  }
};

export default CardDetails;

/* return (
    <div className="max-w-md mx-auto p-4">
      <h1>Kortdetaljer</h1>

      <CardPreview
        issuer={updatedCard.issuer}
        cardNumber={updatedCard.cardNumber}
        cardholder={updatedCard.cardholder}
        expireMonth={updatedCard.expireMonth}
        expireYear={updatedCard.expireYear}
        ccv={updatedCard.ccv}
      />

      {editMode ? (
        <div>
          <label>Kortutgivare:</label>
          <input
            type="text"
            name="issuer"
            value={updatedCard.issuer}
            onChange={handleChange}
          />
          <label>Kortnummer:</label>
          <input
            type="text"
            name="cardNumber"
            value={updatedCard.cardNumber}
            onChange={handleChange}
            maxLength="16"
          />
          <label>Innehavare:</label>
          <input
            type="text"
            name="cardholder"
            value={updatedCard.cardholder}
            onChange={handleChange}
          />
          <label>Utgångsmånad:</label>
          <input
            type="text"
            name="expireMonth"
            value={updatedCard.expireMonth}
            onChange={handleChange}
            maxLength="2"
          />
          <label>Utgångsår:</label>
          <input
            type="text"
            name="expireYear"
            value={updatedCard.expireYear}
            onChange={handleChange}
            maxLength="4"
          />
          <label>CCV:</label>
          <input
            type="text"
            name="ccv"
            value={updatedCard.ccv}
            onChange={handleChange}
            maxLength="3"
          />

          <button onClick={handleSave}>Spara ändringar</button>
          <button onClick={() => setEditMode(false)}>Avbryt</button>
        </div>
      ) : (
        <div>
          <p>Kortutgivare: {issuer}</p>
          <p>Kortnummer: {cardNumber}</p>
          <p>Innehavare: {cardholder}</p>
          <p>
            Utgångsdatum: {expireMonth}/{expireYear}
          </p>
          <p>CCV: {ccv}</p>

          {isActive ? (
            <p>Detta kort är aktivt och kan inte ändras eller raderas.</p>
          ) : (
            <div>
              <button onClick={() => setEditMode(true)}>Redigera kort</button>
              <button onClick={handleActivate}>Aktivera kort</button>
              <button onClick={handleDelete}>Radera kort</button>
            </div>
          )}
        </div>
      )}
    </div>
  );

  <main>
      <header>
        <h1>Card Details</h1>
      </header>

      <section>
        <Card card={card} />
      </section>

      {!card.isActive && (
        <section>
          <h2>Edit card</h2>
          <CardForm onSubmit={handleUpdateCard} card={card} />
        </section>
      )}

      <nav>
        <Link to="/">
          <button>Back to homepage</button>
        </Link>
      </nav>
    </main>
};

export default CardDetails;*/
