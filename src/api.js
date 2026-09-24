import axios from "axios";

const exchangeRateUrl =
  import.meta.env.VITE_EXCHANGE_RATE_URL ?? "https://api.fxratesapi.com/latest";

export const fetchCurrencyConversion = async (
  codeFromCurrency,
  codeToCurrency,
  firstAmount,
) => {
  const response = await axios.get(exchangeRateUrl, {
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
