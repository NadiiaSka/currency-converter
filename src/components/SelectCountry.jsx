import { Autocomplete, Box, Grid, TextField } from "@mui/material";
import useAxios from "../hooks/useAxios";
import { useQuery } from "react-query";
import { useEffect, useState } from "react";

const SelectCountry = (props) => {
  const { value, setValue, label } = props;
  //next step is to implement using previous value on reload
  const fetchData = useAxios();

  const { data, isLoading, isError } = useQuery("countries", () =>
    fetchData("https://restcountries.com/v3.1/all").then((data) => {
      // Sort the list of countries to display the commonly used ones first
      data.sort((a, b) => {
        const order = {
          "United States": 1,
          "United Kingdom": 2,
          "New Zealand": 3,
        };

        // Compare countries based on their order
        const orderA = order[a.name.common] || Infinity;
        const orderB = order[b.name.common] || Infinity;

        // Sort countries based on their order
        if (orderA !== orderB) {
          return orderA - orderB;
        } else {
          // If countries have the same order, sort them alphabetically
          return a.name.common.localeCompare(b.name.common);
        }
      });

      return data;
    })
  );

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
        isOptionEqualToValue={(option, value) =>
          option.name.common === value.name.common
        }
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
                  srcSet={option.flags.png}
                  src={option.flags.png}
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
                  srcSet={value.flags.png}
                  src={value.flags.png}
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
