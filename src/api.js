import axios from "axios";

export const fetchCurrencyConversion = async (
  codeFromCurrency,
  codeToCurrency,
  firstAmount
) => {
  const response = await axios.get(
    "https://api.freecurrencyapi.com/v1/latest",
    {
      params: {
        apikey: "fca_live_njDVy9gTFUx87AMVh7q8Ar6whfSRusOPsmJstbmz",
        base_currency: codeFromCurrency,
        currencies: codeToCurrency,
      },
    }
  );
  const rate = response.data.data[codeToCurrency];
  const convertedAmountRounded = Math.round(rate * firstAmount * 100) / 100;
  return convertedAmountRounded;
};
