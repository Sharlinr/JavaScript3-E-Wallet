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
          isActive: false,
        }}
        showBtns={false}
      />
    </div>
  );
};

export default CardPreview;
