import {
  Container,
  Typography,
  Grid,
  Box,
  formGroupClasses,
} from "@mui/material";
import InputAmount from "./components/InputAmount";
import SelectCountry from "./components/SelectCountry";
import SwitchCurrency from "./components/SwitchCurrency";
import backgroundImage from "./assets/images/exchange.jpg";
import { useContext, useEffect } from "react"; // Import useEffect and useState
import { CurrencyContext } from "./context/CurrencyContext";
import { useQuery } from "react-query";
import { fetchCurrencyConversion } from "./api";

function App() {
  const {
    fromCurrency,
    setFromCurrency,
    toCurrency,
    setToCurrency,
    firstAmount,
  } = useContext(CurrencyContext);

  const codeFromCurrency = fromCurrency
    ? Object.keys(fromCurrency.currencies)[0]
    : null;
  const codeToCurrency = toCurrency
    ? Object.keys(toCurrency.currencies)[0]
    : null;

  const shouldFetchData = codeFromCurrency && codeToCurrency && firstAmount;

  const { data: resultCurrency } = useQuery(
    ["currencyConversion", codeFromCurrency, codeToCurrency, firstAmount],
    () =>
      shouldFetchData
        ? fetchCurrencyConversion(codeFromCurrency, codeToCurrency, firstAmount)
        : Promise.resolve(null)
  );

  const handleSetFromCurrency = (value) => {
    setFromCurrency(value);
    localStorage.setItem("selectedFromCountry", JSON.stringify(value));
  };

  const handleSetToCurrency = (value) => {
    setToCurrency(value);
    localStorage.setItem("selectedToCountry", JSON.stringify(value));
  };

  useEffect(() => {
    const storedFromCountry = localStorage.getItem("selectedFromCountry");
    const storedToCountry = localStorage.getItem("selectedToCountry");
    setFromCurrency(storedFromCountry ? JSON.parse(storedFromCountry) : null);
    setToCurrency(storedToCountry ? JSON.parse(storedToCountry) : null);
  }, []);

  return (
    <Container maxWidth="md">
      <Box sx={boxStyles}>
        <Typography variant="h5" sx={{ marginBottom: "2rem" }}>
          Currency Converter
        </Typography>
        <Grid container spacing={2}>
          <InputAmount />
          <SelectCountry
            value={
              localStorage.getItem("selectedFromCountry")
                ? JSON.parse(localStorage.getItem("selectedFromCountry"))
                : fromCurrency
            }
            setValue={handleSetFromCurrency}
            label="from"
          />
          <SwitchCurrency />
          <SelectCountry
            value={
              localStorage.getItem("selectedToCountry")
                ? JSON.parse(localStorage.getItem("selectedToCountry"))
                : toCurrency
            }
            setValue={handleSetToCurrency}
            label="to"
          />
        </Grid>
        {firstAmount ? (
          <Box
            sx={{ display: "flex", alignItems: "center", marginTop: "1rem" }}
          >
            <Typography variant="h5">
              {Number(firstAmount).toLocaleString()} {codeFromCurrency} =
            </Typography>
            {resultCurrency && (
              <Typography
                variant="h5"
                sx={{ marginLeft: "0.5rem", fontWeight: 600 }}
              >
                {Number(resultCurrency).toLocaleString()} {codeToCurrency}
              </Typography>
            )}
          </Box>
        ) : (
          ""
        )}
      </Box>

      <Box
        sx={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "fixed",
          bottom: 0,
          width: "100%",
          height: "100%",
          zIndex: -1,
          right: 0,
        }}
      />
    </Container>
  );
}

const boxStyles = {
  backgroundColor: "rgba(240, 240, 240, 0.85)",
  boxShadow: "0px 10px 15px 10px rgba(0, 0, 0, 0.2)",
  borderRadius: "8px",
  padding: "3rem 2rem 4rem 2rem",
  textAlign: "center",
  color: "#222",
  minHeight: "10rem",
  position: "relative",
};

export default App;
