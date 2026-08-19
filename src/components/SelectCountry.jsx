import { Autocomplete, Box, Grid, TextField } from "@mui/material";
import { useQuery } from "react-query";
import PropTypes from "prop-types";

const POPULAR_COUNTRY_ORDER = {
  "United States": 1,
  Australia: 2,
  Ukraine: 3,
};

const normalizeCountry = (country) => {
  const currencies = Array.isArray(country?.currencies)
    ? country.currencies.reduce((acc, currency) => {
        if (currency?.code) {
          acc[currency.code] = {
            name: currency.name || currency.code,
            symbol: currency.symbol || "",
          };
        }
        return acc;
      }, {})
    : country?.currencies && !Array.isArray(country.currencies)
      ? country.currencies
      : {};

  const countryCode = (
    country?.cca2 ||
    country?.codes?.alpha_2 ||
    ""
  ).toLowerCase();

  return {
    ...country,
    name: country?.name || {
      common: country?.names?.common || "",
      official: country?.names?.official || country?.names?.common || "",
    },
    flags:
      country?.flags ||
      (countryCode
        ? {
            png: `https://flagcdn.com/w40/${countryCode}.png`,
            svg: `https://flagcdn.com/${countryCode}.svg`,
          }
        : { png: "", svg: "" }),
    currencies,
    altSpellings: country?.altSpellings || [],
  };
};

const getCurrencyCode = (country) =>
  Object.keys(country?.currencies || {})[0] || "";

const isCompleteCountry = (country) =>
  Boolean(
    country?.name?.common && country?.flags?.png && getCurrencyCode(country),
  );

const sortCountries = (countries) =>
  [...countries].sort((a, b) => {
    const orderA = POPULAR_COUNTRY_ORDER[a.name.common] || Infinity;
    const orderB = POPULAR_COUNTRY_ORDER[b.name.common] || Infinity;

    if (orderA !== orderB) {
      return orderA - orderB;
    }

    return a.name.common.localeCompare(b.name.common);
  });

const SelectCountry = (props) => {
  const { value, setValue, label } = props;

  SelectCountry.propTypes = {
    value: PropTypes.object,
    setValue: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
  };

  const { data, isLoading, isError } = useQuery("countries", async () => {
    const { default: countries } = await import("world-countries");

    return sortCountries(
      countries.map(normalizeCountry).filter(isCompleteCountry),
    );
  });

  if (isLoading) {
    return <Grid item xs={12} md={3}></Grid>;
  }
  if (isError) {
    return "Something went wrong!";
  }

  const dataFilter = Array.isArray(data) ? data : [];

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
        getOptionLabel={(option) =>
          option?.name?.common
            ? `${getCurrencyCode(option)} - ${option.name.common}`
            : ""
        }
        isOptionEqualToValue={(option, value) =>
          option.name.common === value.name.common
        }
        renderOption={(props, option) => (
          <Box
            component="li"
            sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
            {...props}
          >
            <img
              loading="lazy"
              src={option.flags.png}
              alt=""
              style={{
                width: "24px",
                height: "16px",
                objectFit: "cover",
                marginRight: "8px",
                marginLeft: "-8px",
                borderRadius: "2px",
                display: "inline-block",
              }}
            />
            {getCurrencyCode(option)} - {option.name.common}
          </Box>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
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
                  style={{
                    width: "24px",
                    height: "16px",
                    marginRight: "8px",
                    marginLeft: "4px",
                    borderRadius: "2px",
                  }}
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
