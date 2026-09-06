import { Container, Typography, Grid, Box } from "@mui/material";
import InputAmount from "./components/InputAmount";
import SelectCountry from "./components/SelectCountry";
import SwitchCurrency from "./components/SwitchCurrency";
import backgroundImage from "./assets/images/exchange.jpg";
import { useContext } from "react";
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

  const hasValidAmount =
    firstAmount !== null && firstAmount !== undefined && firstAmount !== "";
  const shouldFetchData = Boolean(
    codeFromCurrency &&
    codeToCurrency &&
    hasValidAmount &&
    Number(firstAmount) !== 0,
  );

  const { data: resultCurrency, isError } = useQuery(
    ["currencyConversion", codeFromCurrency, codeToCurrency, firstAmount],
    () =>
      fetchCurrencyConversion(codeFromCurrency, codeToCurrency, firstAmount),
    {
      enabled: shouldFetchData,
    },
  );

  return (
    <Container maxWidth="md">
      <Box sx={boxStyles}>
        <Typography variant="h5" sx={{ marginBottom: "2rem" }}>
          Currency Converter
        </Typography>
        <Grid container spacing={2}>
          <InputAmount />
          <SelectCountry
            value={fromCurrency}
            setValue={setFromCurrency}
            label="from"
          />
          <SwitchCurrency />
          <SelectCountry
            value={toCurrency}
            setValue={setToCurrency}
            label="to"
          />
        </Grid>
        {isError ? (
          <Box sx={{ marginTop: "1rem" }}>
            <Typography variant="body1" color="error">
              Something went wrong while fetching the conversion. Please try
              again.
            </Typography>
          </Box>
        ) : hasValidAmount ? (
          <Box
            sx={{ display: "flex", alignItems: "center", marginTop: "1rem" }}
          >
            <Typography variant="h5">
              {Number(firstAmount).toLocaleString()} {codeFromCurrency} =
            </Typography>
            {Number(firstAmount) === 0 ? (
              <Typography
                variant="h5"
                sx={{ marginLeft: "0.5rem", fontWeight: 600 }}
              >
                0 {codeToCurrency}
              </Typography>
            ) : resultCurrency !== undefined && resultCurrency !== null ? (
              <Typography
                variant="h5"
                sx={{ marginLeft: "0.5rem", fontWeight: 600 }}
              >
                {Number(resultCurrency).toLocaleString()} {codeToCurrency}
              </Typography>
            ) : null}
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
