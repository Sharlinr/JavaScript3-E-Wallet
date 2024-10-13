import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Card from "../components/Card";
import CardForm from "../components/CardForm";
import CardPreview from "../components/CardPreview";

const CardDetails = ({ cards, onUpdateCard, onDeleteCard }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const card = cards.find((card) => card.id === parseInt(id));

  const [editMode, setEditMode] = useState(false);
  const [updatedCard, setUpdatedCard] = useState({ ...card });

  const {
    issuer,
    cardNumber,
    cardholder,
    expireMonth,
    expireYear,
    ccv,
    isActive,
  } = card || {};

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedCard({
      ...updatedCard,
      [name]: value,
    });
  };

  const handleSave = () => {
    onUpdateCard(card.id, updatedCard);
    setEditMode(false);
    navigate("/");
  };

  const handleActive = () => {
    onUpdateCard(card.id, { ...card, isActive: true });
    navigate("/");
  };

  const handleDelete = () => {
    onDeleteCard(card.id);
    navigate("/");
  };

  if (!card) {
    <p>Card not found</p>;
  }

  return (
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

  /*<main>
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
    </main>*/
};

export default CardDetails;
