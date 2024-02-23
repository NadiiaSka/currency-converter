import { Autocomplete, Grid, TextField } from "@mui/material";
import useAxios from "../hooks/useAxios";

const SelectCountry = () => {
  const [data] = useAxios("https://restcountries.com/v3.1/all");

  const dataFilter = data.filter((country) => "currencies" in country);
  console.log(dataFilter);

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
