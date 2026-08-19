import React, { createContext, useEffect, useMemo, useState } from "react";
export const CurrencyContext = createContext();

const readStoredCountry = (storageKey) => {
  if (typeof window === "undefined") {
    return null;
  }

  const storedValue = window.localStorage.getItem(storageKey);

  if (!storedValue) {
    return null;
  }

  try {
    return JSON.parse(storedValue);
  } catch {
    return null;
  }
};

const CurrencyProvider = ({ children }) => {
  const [fromCurrency, setFromCurrency] = useState(() =>
    readStoredCountry("selectedFromCountry"),
  );
  const [toCurrency, setToCurrency] = useState(() =>
    readStoredCountry("selectedToCountry"),
  );
  const [firstAmount, setFirstAmount] = useState(null);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    if (fromCurrency) {
      window.localStorage.setItem(
        "selectedFromCountry",
        JSON.stringify(fromCurrency),
      );
    } else {
      window.localStorage.removeItem("selectedFromCountry");
    }
  }, [fromCurrency]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    if (toCurrency) {
      window.localStorage.setItem(
        "selectedToCountry",
        JSON.stringify(toCurrency),
      );
    } else {
      window.localStorage.removeItem("selectedToCountry");
    }
  }, [toCurrency]);

  const value = useMemo(
    () => ({
      fromCurrency,
      setFromCurrency,
      toCurrency,
      setToCurrency,
      firstAmount,
      setFirstAmount,
    }),
    [fromCurrency, toCurrency, firstAmount],
  );

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
};

export default CurrencyProvider;
