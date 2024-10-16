import React from "react";
import Card from "./Card";

const CardPreview = ({
  issuer = "Visa",
  cardNumber = "1234 5678 9012 3456",
  cardholder = "Firstname Lastname",
  expireMonth = "MM",
  expireYear = "YYYY",
  ccv = "***",
}) => {
  // Vi skickar dessa props vidare till Card-komponenten för att undvika kodduplicering.
  return (
    <div className="mb-6">
      <Card
        card={{
          issuer,
          cardNumber,
          cardholder,
          expireMonth,
          expireYear,
          ccv,
          isActive: false, // Förhandsvisningen ska aldrig visa ett aktivt kort
        }}
        showBtns={false} // Vi vill inte visa några knappar i förhandsvisningen
      />
    </div>
  );
};

export default CardPreview;

/*const CardPreview = ({
  issuer,
  cardNumber,
  cardholder,
  expireMonth,
  expireYear,
  ccv,
}) => {
  return (
    <Card
      card={{
        issuer,
        cardNumber,
        cardholder,
        expireMonth,
        expireYear,
        ccv,
        isActive: false,
      }}
      showBtns={false}
      onActivate={null}
      onEdit={null}
      onDelete={null}
    />
  );
};

export default CardPreview;

{*/
/*
      <div className="bg-gray-100 border border-gray-300 rounded-lg shadow-lg p-6 mb-6 max-w-sm mx-auto">
      <h2 className="text-lg font-bold mb-4 text-gray-800">{issuer}</h2>
      <p className="mb-2">
        <span className="font-semibold">Card number:</span>{" "}
        {cardNumber ? cardNumber : "XXX XXX XXX"}
      </p>

      <p className="mb-2">
        <span className="font-semibold">Card holder: </span>{" "}
        {cardholder ? cardholder : "Firstname Lastname"}
      </p>

      <p className="mb-2">
        <span className="font-semibold">Valid: </span>{" "}
        {expireMonth ? expireMonth : "MM"}/{expireYear ? expireYear : "YYYY"}
      </p>
      <p className="mb-2">
        <span className="font-semibold">CCV:</span> {ccv ? ccv : "***"}
      </p>
    </div>
  );
  */
//}
