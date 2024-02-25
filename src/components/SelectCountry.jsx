import { Autocomplete, Box, Grid, Skeleton, TextField } from "@mui/material";
import useAxios from "../hooks/useAxios";
import { useQuery } from "react-query";

const SelectCountry = (props) => {
  const { value, setValue, label } = props;
  const fetchData = useAxios();

  const { data, isLoading, isError } = useQuery("countries", () =>
    fetchData("https://restcountries.com/v3.1/all")
  );

  if (isLoading) {
    return (
      <Grid item xs={12} md={3}>
        <Skeleton variant="rounded" height={60} />
      </Grid>
    );
  }
  if (isError) {
    return "Something went wrong!";
  }

  const dataFilter = data.filter((item) => "currencies" in item);

  return (
    <Grid item xs={12} md={4}>
      <Autocomplete
        value={value}
        disableClearable
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        options={dataFilter}
        getOptionLabel={(option) => option.name.common}
        renderOption={(props, option) => {
          if (option.altSpellings[0] && option.altSpellings[0].length <= 2) {
            return (
              <Box
                component="li"
                sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                {...props}
              >
                <img
                  loading="lazy"
                  width="20"
                  srcSet={`https://flagcdn.com/w40/${option.altSpellings[0].toLowerCase()}.png 2x`}
                  src={`https://flagcdn.com/w20/${option.altSpellings[0].toLowerCase()}.png`}
                  alt=""
                />
                {Object.keys(option.currencies)[0]} - {option.name.common}
              </Box>
            );
          }
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            sx={{
              "& .MuiOutlinedInput-notchedOutline": {
                borderWidth: "1px",
                borderColor: "#333",
              },
            }}
          />
        )}
      />
    </Grid>
  );
};

export default SelectCountry;
