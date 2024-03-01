import axios from "axios";

export const fetchCurrencyConversion = async (
  codeFromCurrency,
  codeToCurrency,
  firstAmount
) => {
  const response = await axios.get("https://api.fxratesapi.com/latest", {
    params: {
      amount: firstAmount,
      base: codeFromCurrency,
      currencies: codeToCurrency,
      resolution: "1m",
      places: 6,
      format: "json",
    },
  });
  const convertedAmount = response.data.rates[codeToCurrency];
  const convertedAmountRounded = Math.round(convertedAmount * 100) / 100;
  return convertedAmountRounded;
};
