import { Autocomplete, Box, Grid, TextField } from "@mui/material";
import useAxios from "../hooks/useAxios";
import { useQuery } from "react-query";
import { useEffect, useState } from "react";

const SelectCountry = (props) => {
  const { value, setValue, label } = props;
  //next step is to implement using previous value on reload
  const [previousValue, setPreviousValue] = useState(null);
  const fetchData = useAxios();

  useEffect(() => {
    const savedValue = localStorage.getItem("selectedCountry");
    if (savedValue) {
      setPreviousValue(JSON.parse(savedValue));
    }
  }, []);

  const { data, isLoading, isError } = useQuery("countries", () =>
    fetchData("https://restcountries.com/v3.1/all")
  );

  useEffect(() => {
    if (value) {
      localStorage.setItem("selectedCountry", JSON.stringify(value));
    }
  }, [value]);

  if (isLoading) {
    return <Grid item xs={12} md={3}></Grid>;
  }
  if (isError) {
    return "Something went wrong!";
  }

  const dataFilter = data.filter((item) => "currencies" in item);

  return (
    <Grid item xs={12} md={4}>
      <Autocomplete
        value={
          value &&
          dataFilter.some((option) => option.name.common === value.name.common)
            ? value
            : null
        }
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
            value={
              value
                ? `${Object.keys(value.currencies)[0]} - ${value.name.common}`
                : ""
            }
            label={label}
            InputProps={{
              ...params.InputProps,
              startAdornment: value ? (
                <img
                  loading="lazy"
                  width="20"
                  srcSet={`https://flagcdn.com/w40/${value.altSpellings[0].toLowerCase()}.png 2x`}
                  src={`https://flagcdn.com/w20/${value.altSpellings[0].toLowerCase()}.png`}
                  alt=""
                  style={{ marginRight: "8px" }}
                />
              ) : null,
            }}
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
