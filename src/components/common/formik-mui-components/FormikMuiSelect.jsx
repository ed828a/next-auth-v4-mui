import React from "react";
import { ErrorMessage, Field } from "formik";
import { useTheme } from '@mui/material/styles';
import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from "@mui/material";
import { Box } from "@mui/system";


const MaterialUISelectField = ({
  errorString,
  label,
  children,
  value,
  name,
  onChange,
  onBlur,
  required,
  ...props
}) => (
  <FormControl
    fullWidth
    {...props}
    styles={{
      "& > *": {
        margin: "16px",
        width: "25ch",
      },
    }}
  >
    <InputLabel id="formik-mui-select-label" required={required}>
      {label}
    </InputLabel>
    <Select
      labelId="formik-mui-select-label"
      label={label}
      name={name}
      onChange={onChange}
      onBlur={onBlur}
      value={value}
    >
      {children}
    </Select>
    <FormHelperText>{errorString}</FormHelperText>
  </FormControl>
);

const FormikMuiSelect = ({
  name,
  options,
  label,
  required = false,
  ...props
}) => {
  const theme = useTheme();

  return (
    <Box sx={{ mt: 10 }}>
      <Field
        name={name}
        as={MaterialUISelectField}
        label={label}
        errorString={<ErrorMessage name={name} />}
        required={required}
        {...props}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Field>
    </Box>
  );
};

export default FormikMuiSelect;
