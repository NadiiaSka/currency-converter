import { Container, Typography, Grid, Box } from "@mui/material";
import InputAmount from "./components/InputAmount";
import SelectCountry from "./components/SelectCountry";
import SwitchCurrency from "./components/SwitchCurrency";

function App() {
  const boxStyles = {
    backgroundColor: "#f0f0f0",
    boxShadow: "0px 10px 15px 10px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
    padding: "3rem 2rem 4rem 2rem",
    textAlign: "center",
    color: "#222",
    minHeight: "20rem",
    position: "relative",
  };
  return (
    <Container maxWidth="md">
      <Box sx={boxStyles}>
        <Typography variant="h5" sx={{ marginBottom: "2rem" }}>
          Currency Converter
        </Typography>
        <Grid container spacing={2}>
          <InputAmount />
          <SelectCountry />
          <SwitchCurrency />
          <SelectCountry />
        </Grid>
      </Box>
    </Container>
  );
}

export default App;
