import { Button, Grid } from "@mui/material";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import { CurrencyContext } from "../context/CurrencyContext";
import { useContext } from "react";

const SwitchCurrency = () => {
  const { fromCurrency, setFromCurrency, toCurrency, setToCurrency } =
    useContext(CurrencyContext);

  const handleSwitch = () => {
    // Update local storage values
    localStorage.setItem("selectedFromCountry", JSON.stringify(toCurrency));
    localStorage.setItem("selectedToCountry", JSON.stringify(fromCurrency));

    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  return (
    <Grid item xs={12} md="auto">
      <Button onClick={handleSwitch} sx={{ borderRadius: 1, height: "100%" }}>
        <CompareArrowsIcon sx={{ fontSize: 30 }} />
      </Button>
    </Grid>
  );
};

export default SwitchCurrency;
