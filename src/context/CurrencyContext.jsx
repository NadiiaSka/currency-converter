import React, { createContext, useState } from "react";
export const CurrencyContext = createContext();

const CurrencyProvider = ({ children }) => {
  const [fromCurrency, setFromCurrency] = useState({
    name: {
      common: "Vietnam",
      official: "Socialist Republic of Vietnam",
    },
    cca2: "VN",
    currencies: {
      VND: {
        name: "Vietnamese đồng",
        symbol: "₫",
      },
    },
    altSpellings: ["VN"],
    latlng: [16.16666666, 107.83333333],
    flags: {
      png: "https://flagcdn.com/w320/vn.png",
      svg: "https://flagcdn.com/vn.svg",
      alt: "The flag of Vietnam features a large five-pointed yellow star on a red field.",
    },
  });
  const [toCurrency, setToCurrency] = useState({
    name: {
      common: "United States",
      official: "United States of America",
    },
    currencies: {
      USD: {
        name: "United States dollar",
        symbol: "$",
      },
    },
    altSpellings: ["US", "USA", "United States of America"],
    latlng: [38, -97],
    flags: {
      png: "https://flagcdn.com/w320/us.png",
      svg: "https://flagcdn.com/us.svg",
      alt: "The flag of the United States of America is composed of thirteen equal horizontal bands of red alternating with white. A blue rectangle, bearing fifty small five-pointed white stars arranged in nine rows where rows of six stars alternate with rows of five stars, is superimposed in the canton.",
    },
  });
  const [firstAmount, setFirstAmount] = useState(null);

  const value = {
    fromCurrency,
    setFromCurrency,
    toCurrency,
    setToCurrency,
    firstAmount,
    setFirstAmount,
  };
  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
};

export default CurrencyProvider;
