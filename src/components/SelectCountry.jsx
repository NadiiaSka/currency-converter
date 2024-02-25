import { Autocomplete, Grid, TextField } from "@mui/material";
import useAxios from "../hooks/useAxios";
import CurrencyOption from "./CurrencyOption";

const SelectCountry = () => {
  const [data] = useAxios("https://restcountries.com/v3.1/all");

  const dataFilter = data.filter((country) => "currencies" in country);
  const dataCountries = dataFilter.map((country) => {
    return `${country.flag} ${Object.keys(country.currencies)[0]} - ${
      country.name.common
    }`;
  });

  const currencyOptions = dataFilter.map((country, index) => {
    return {
      id: index,
      countryName: country.name.common,
      currencyName: Object.keys(country.currencies)[0],
      flagUrl: country.flags.png,
    };
  });

  console.log(currencyOptions);

  return (
    <Grid item xs={12} md={4}>
      <Autocomplete
        options={currencyOptions}
        getOptionLabel={(option) => option.countryName}
        renderOption={(props, option) => (
          <CurrencyOption key={option.id} {...option} />
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Select a country"
            sx={{
              "& .MuiOutlinedInput-notchedOutline": {
                borderWidth: "1px",
                borderColor: "#333",
              },
            }}
          />
        )}
      />
      {/* <Autocomplete
        options={currencyOptions}
        disableClearable
        getOptionLabel={(option) => option.countryName}
        renderOption={(option) => currencyOption(option)}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            sx={{
              "& .MuiOutlinedInput-notchedOutline": {
                borderWidth: "1px",
                borderColor: "#333",
              },
            }}
            placeholder="Select a country"
          />
        )}
      /> */}
    </Grid>
  );
};

export default SelectCountry;
