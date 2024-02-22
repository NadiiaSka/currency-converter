import { Autocomplete, Grid, TextField } from "@mui/material";

const SelectCountry = () => {
  return (
    <Grid item xs={12} md={3}>
      <Autocomplete
        options={["USA", "Vietnam", "New Zealand"]}
        id="country"
        disableClearable
        renderInput={(params) => <TextField {...params} label="to" />}
      />
    </Grid>
  );
};

export default SelectCountry;
