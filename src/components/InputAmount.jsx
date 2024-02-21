import { Grid, InputAdornment, TextField } from "@mui/material";
import { forwardRef, useState } from "react";
import PropTypes from "prop-types";
import { NumericFormat } from "react-number-format";

const InputAmount = () => {
  const [amount, setAmount] = useState(1320);

  return (
    <Grid item>
      <TextField
        label="Amount"
        value={amount}
        onChange={(event) => {
          setAmount(event.target.value);
        }}
        fullWidth
        InputProps={{
          inputComponent: NumericFormatCustom,
        }}
      />
      {/* <TextField
        label="react-number-format"
        value={values.numberformat}
        onChange={handleChange}
        name="numberformat"
        id="formatted-numberformat-input"
        InputProps={{
          inputComponent: NumericFormatCustom,
        }}
        variant="standard"
      /> */}
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
      prefix="$"
    />
  );
});

NumericFormatCustom.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default InputAmount;
