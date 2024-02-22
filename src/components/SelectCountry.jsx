import { Autocomplete, Grid, TextField } from "@mui/material";

const SelectCountry = () => {
  return (
    <Grid item xs={12} md={3}>
      <Autocomplete
        options={["USA", "Vietnam", "New Zealand"]}
        id="country"
        disableClearable
        renderInput={(params) => (
          <TextField
            {...params}
            label="to"
            InputProps={{
              sx: {
                "& .MuiOutlinedInput-notchedOutline": {
                  borderWidth: "1px",
                  borderColor: "#333",
                },
              },
            }}
          />
        )}
      />
    </Grid>
  );
};

export default SelectCountry;
