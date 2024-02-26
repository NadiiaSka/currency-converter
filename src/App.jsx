import { Container, Typography, Grid, Box, Hidden } from "@mui/material";
import InputAmount from "./components/InputAmount";
import SelectCountry from "./components/SelectCountry";
import SwitchCurrency from "./components/SwitchCurrency";
import backgroundImage from "./assets/images/exchange.jpg";
import { useContext, useState } from "react";
import { CurrencyContext } from "./context/CurrencyContext";

function App() {
  const { fromCurrency, setFromCurrency, toCurrency, setToCurrency } =
    useContext(CurrencyContext);

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
      </Box>
      <Hidden smDown>
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
      </Hidden>
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
