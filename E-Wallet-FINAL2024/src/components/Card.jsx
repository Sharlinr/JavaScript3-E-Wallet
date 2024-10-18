import React from "react";

const Card = ({ card, onActivate, onDelete, onEdit, showBtns = true }) => {
  const {
    issuer,
    cardNumber,
    cardholder,
    expireMonth,
    expireYear,
    ccv,
    isActive,
  } = card;

  const cardClasses = {
    visa: "bg-blue-800 text-white",
    mastercard: "bg-gradient-to-r from-yellow-500 to-red-600 text-gray-900",
    "american express": "bg-blue-400 text-white border-2 border-blue-900",
  };

  const cardClass =
    cardClasses[issuer.toLowerCase()] || "bg-gray-300 text-black";

  return (
    <>
      <div className="mb-6">
        <article
          className={`p-4 rounded-lg shadow-lg mb-4 ${cardClass}`}
          style={{
            width: "100%",
            maxWidth: "320px",
            aspectRatio: "1 / 1.6",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <header className="mb-4">
            <h2 className="text-xl font-semibold">{issuer}</h2>
          </header>

          <p className="text-sm">Card number: {cardNumber}</p>
          <p className="text-sm">Cardholder: {cardholder}</p>
          <p className="text-sm">
            Valid: {expireMonth}/{expireYear}
          </p>
          <p className="text-sm">CCV: {ccv ? ccv : "***"}</p>

          {isActive && (
            <p className="text-green-500 font-bold mt-4 text-sm">
              This card is active and can not be edited or deleted
            </p>
          )}
        </article>

        {showBtns && !isActive && (
          <div className="flex flex-wrap gap-2 justify-start mt-2">
            <button
              onClick={onEdit ? onEdit : () => {}}
              className="bg-blue-500 text-white py-1 px-2 md:px-4 rounded inline-flex items-center hover:bg-blue-600 transition"
              style={{ minWidth: "40%" }}
            >
              Edit card
            </button>

            <button
              onClick={onActivate ? onActivate : () => {}}
              className="bg-green-500 text-white py-1 px-2 md:px-4 rounded inline-flex items-center hover:bg-green-600 transition"
              style={{ minWidth: "40%" }}
            >
              Activate card
            </button>

            <button
              onClick={onDelete ? onDelete : () => {}}
              className="bg-red-500 text-white py-1 px-2 md:px-4 rounded inline-flex items-center hover:bg-red-600 transition"
              style={{ minWidth: "40%" }}
            >
              Delete card
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Card;
