import { Grid } from "@mui/material";

const CurrencyOption = ({ countryName, currencyName, flagUrl }) => (
  <Grid
    container
    alignItems="center"
    sx={{
      whiteSpace: "nowrap",
      marginLeft: 0.1,
    }}
  >
    <Grid
      item
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textOverflow: "clip",
        marginBottom: 1,
        marginLeft: 1,
      }}
    >
      <img
        src={flagUrl}
        alt={countryName}
        style={{
          width: 24,
          height: 24,
          borderRadius: "50%",
          marginRight: 3,
        }}
      />
      <span style={{ marginLeft: 5, fontSize: "14px" }}>
        {currencyName} - {countryName}
      </span>
    </Grid>
  </Grid>
);

export default CurrencyOption;
