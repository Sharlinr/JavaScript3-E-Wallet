import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { getFormErrors } from "../utils/validationHelpers";
import CardPreview from "./CardPreview";

const CardForm = ({
  onSubmit,
  initialValues = {},
  submitText = "Add Card",
  isEditMode = false,
}) => {
  const [cardDetails, setCardDetails] = useState({
    cardNumber: initialValues.cardNumber || "",
    cardholder: initialValues.cardholder || "",
    expireMonth: initialValues.expireMonth || "",
    expireYear: initialValues.expireYear || "",
    ccv: initialValues.ccv || "",
    issuer: initialValues.issuer || "Visa",
  });

  const [errors, setErrors] = useState({
    cardNumber: "",
    cardholder: "",
    expireDate: "",
    ccv: "",
  });

  useEffect(() => {
    //const formErrors = getFormErrors(cardDetails, isActive);
    setErrors(getFormErrors(cardDetails, isEditMode));
  }, [cardDetails, isEditMode]);

  const { cardNumber, cardholder, expireMonth, expireYear, ccv, issuer } =
    cardDetails;

  const handleChange = (e) => {
    setCardDetails({
      ...cardDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submit triggered!");

    const formErrors = getFormErrors(cardDetails, isEditMode);
    console.log("Form Errors before submit:", formErrors);

    if (Object.values(formErrors).every((error) => error === "")) {
      onSubmit(cardDetails);
    } else {
      setErrors(formErrors);
    }
  };

  return (
    <>
      {console.log("Rendering form with errors:", errors)}
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
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          {errors.cardNumber && (
            <p className="text-red-500 text-sm">{errors.cardNumber}</p>
          )}
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
            title="Name must include first and last name"
            required
          />
          {errors.cardholder && (
            <p className="text-red-500 text-sm">{errors.cardholder}</p>
          )}
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
              min={isEditMode ? 1900 : new Date().getFullYear()}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>
        {errors.expireDate && (
          <p className="text-red-500 text-sm">{errors.expireDate}</p>
        )}
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
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          {errors.ccv && <p className="text-red-500 text-sm">{errors.ccv}</p>}
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
        ------
        <button
          type="submit"
          className="w-full py-3 px-4 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition duration-300"
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
