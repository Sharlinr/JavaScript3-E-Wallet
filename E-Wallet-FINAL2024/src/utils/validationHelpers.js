export const isValidCardNumber = (cardNumber) => {
  if (!/^\d{16}$/.test(cardNumber)) {
    return "Cardnumber must be 16 digits";
  }
  return "";
};

export const isValidCardholder = (cardholder) => {
  if (!/^[a-zA-Z]+ [a-zA-Z]+$/.test(cardholder)) {
    return "Cardholder must be first- and lastname. No numbers or special signs";
  }
  return "";
};

export const isValidDate = (expireMonth, expireYear, isActive) => {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;
  const year = parseInt(expireYear, 10);
  const month = parseInt(expireMonth, 10);

  if (isNaN(year) || isNaN(month)) {
    return "Invalid expiration date";
  }

  const expirationDate = new Date(year, month - 1);
  const today = new Date(currentYear, currentMonth - 1);

  if (!isActive) {
    return "";
  }

  if (expirationDate < today) {
    return "Expiration date must be in the future";
  }
  return "";
};

export const isValidDateForEditMode = (expireMonth, expireYear) => {
  const year = parseInt(expireYear, 10);
  const month = parseInt(expireMonth, 10);

  if (isNaN(year) || isNaN(month)) {
    return "Invalid expiration date";
  }
  return "";
};

export const isValidCCV = (ccv) => {
  if (!/^\d{3}$/.test(ccv)) {
    return "CCV must be 3 digits";
  }
  return "";
};

export const getFormErrors = (
  { cardNumber, cardholder, expireMonth, expireYear, ccv },
  isActive = false
) => {
  console.log("Running validation with isActive:", isActive);
  return {
    cardNumber: isValidCardNumber(cardNumber),
    cardholder: isValidCardholder(cardholder),
    expireDate: isActive
      ? isValidDateForEditMode(expireMonth, expireYear)
      : isValidDate(expireMonth, expireYear),
    ccv: isValidCCV(ccv),
  };
};
