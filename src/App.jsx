import { Button, Container, Typography, Grid } from "@mui/material";
import InputAmount from "./components/InputAmount";
import SelectCountry from "./components/SelectCountry";
import SwitchCurrency from "./components/SwitchCurrency";

function App() {
  return (
    <Container maxWidth="md" sx={{ background: "#fdfdfd" }}>
      <Typography variant="h5" sx={{ marginBottom: "2rem" }}>
        Stay ahead with Accurate Conversions
      </Typography>
      <Grid container spacing={2}>
        <InputAmount />
        <SelectCountry />
        <SwitchCurrency />
        <SelectCountry />
      </Grid>
    </Container>
  );
}

export default App;
