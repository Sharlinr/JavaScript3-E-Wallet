import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import CardPreview from "./CardPreview";

/*
Högst upp ska en förhandsvisning av kortet finnas, som uppdateras automatiskt när användare fyller i informationen.
Fältet kortnummer måste innehålla 16 siffror.
Utgångsdatum får inte vara ett datum som redan passerat.
Namnet får inte innehålla siffror.
Varje kortutgivare ska ge kortet olika utseenden i form av kortets färg + namn eller logotyp för kortutgivaren. */

const CardForm = ({
  onSubmit,
  initialValues = {},
  submitText = "Add Card",
}) => {
  const [cardDetails, setCardDetails] = useState({
    cardNumber: initialValues.cardNumber || "",
    cardholder: initialValues.cardholder || "",
    expireMonth: initialValues.expireMonth || "",
    expireYear: initialValues.expireYear || "",
    ccv: initialValues.ccv || "",
    issuer: initialValues.issuer || "Visa",
  });

  const { cardNumber, cardholder, expireMonth, expireYear, ccv, issuer } =
    cardDetails;

  //DATE ISSUES
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;

  const isValidDate = () => {
    const year = parseInt(expireYear, 10);
    const month = parseInt(expireMonth, 10);
    const expirationDate = new Date(year, month - 1);
    const today = new Date(currentYear, currentMonth - 1);

    return expirationDate >= today;
  };
  //DATE ISSUES ENDS

  const handleChange = (e) => {
    setCardDetails({
      ...cardDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValidDate()) {
      onSubmit(cardDetails);
    }
  };

  const backHome = () => {};

  return (
    <>
      <CardPreview
        issuer={issuer}
        cardNumber={cardNumber}
        cardholder={cardholder}
        expireMonth={expireMonth}
        expireYear={expireYear}
        ccv={ccv}
      />

      <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-6">
        <div>
          <label className="block text-sm font-semibold mb-1">
            Card Number:
          </label>
          <input
            type="text"
            name="cardNumber"
            value={cardNumber}
            onChange={handleChange}
            placeholder="1234 5678 9012 3456"
            maxLength="16"
            minLength="16"
            pattern="\d{16}"
            title="Cardnumber must be 16 digits"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">
            Name of Cardholder:
          </label>
          <input
            type="text"
            name="cardholder"
            value={cardholder}
            onChange={handleChange}
            placeholder="Firstname Lastname"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            pattern="^[a-zA-Z]+ [a-zA-Z]+$" // Förnamn och efternamn
            title="Name must include first and last name"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold mb-1">
              Expire Month:
            </label>
            <select
              name="expireMonth"
              value={expireMonth}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Month</option>
              <option value="01">Jan</option>
              <option value="02">Feb</option>
              <option value="03">Mar</option>
              <option value="04">Apr</option>
              <option value="05">May</option>
              <option value="06">Jun</option>
              <option value="07">Jul</option>
              <option value="08">Aug</option>
              <option value="09">Sep</option>
              <option value="10">Oct</option>
              <option value="11">Nov</option>
              <option value="12">Dec</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">
              Expire Year:
            </label>
            <input
              type="number"
              name="expireYear"
              value={expireYear}
              onChange={handleChange}
              placeholder="YYYY"
              min={currentYear}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">CCV:</label>
          <input
            type="text"
            name="ccv"
            value={ccv}
            onChange={handleChange}
            placeholder="123"
            maxLength="3"
            minLength="3"
            pattern="\d{3}"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">
            Card Issuer:
          </label>
          <select
            name="issuer"
            value={issuer}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Visa">Visa</option>
            <option value="Mastercard">Mastercard</option>
            <option value="American Express">American Express</option>
          </select>
        </div>

        <button
          type="submit"
          className={`w-full py-2 px-4 rounded-lg transition duration-300 ${
            isValidDate() &&
            cardNumber.length === 16 &&
            ccv.length === 3 &&
            /^[a-zA-Z]+ [a-zA-Z]+$/.test(cardholder)
              ? "bg-blue-500 text-white hover:bg-blue-600"
              : "bg-blue-200 text-blue-400 cursor-not-allowed"
          }`}
          disabled={
            !isValidDate() ||
            cardNumber.length !== 16 ||
            ccv.length !== 3 ||
            !/^[a-zA-Z]+ [a-zA-Z]+$/.test(cardholder)
          }
        >
          {submitText}
        </button>
      </form>
      <nav className="mt-6 text-center">
        <Link to="/">
          <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300">
            Back to homepage
          </button>
        </Link>
      </nav>
    </>
  );
};

export default CardForm;
