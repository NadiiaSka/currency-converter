import { Grid, TextField } from "@mui/material";
import { forwardRef, useContext } from "react";
import PropTypes from "prop-types";
import { NumericFormat } from "react-number-format";
import { CurrencyContext } from "../context/CurrencyContext";

const InputAmount = () => {
  const { firstAmount, setFirstAmount } = useContext(CurrencyContext);

  return (
    <Grid item xs={12} md>
      <TextField
        label="Amount"
        value={firstAmount}
        name="Amount"
        onChange={(event) => {
          setFirstAmount(event.target.value);
        }}
        fullWidth
        InputProps={{
          inputComponent: NumericFormatCustom,
          sx: {
            "& .MuiOutlinedInput-notchedOutline": {
              borderWidth: "1px",
              borderColor: "#333",
            },
          },
        }}
      />
    </Grid>
  );
};

const NumericFormatCustom = forwardRef(function NumericFormatCustom(
  props,
  ref
) {
  const { onChange, ...other } = props;

  return (
    <NumericFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      valueIsNumericString
    />
  );
});

NumericFormatCustom.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default InputAmount;
