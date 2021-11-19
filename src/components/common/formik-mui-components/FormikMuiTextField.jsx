import React from "react";
import { ErrorMessage, Field } from "formik";
import { Box } from "@mui/system";
import { TextField } from "@mui/material";
import { useTheme } from '@mui/material/styles';


const FormikMuiTextField = ({
  name,
  label,
  type = "text",
  required = false,
  ...props
}) => {

  const theme = useTheme();

  return (
    <Box sx={{ mt: 2, mb: 1, width: 400 }}>
      <Field
        name={name}
        as={TextField}
        label={label}
        required={required}
        fullWidth
        type={type}
        helperText={<ErrorMessage name={name} />}
        inputProps={{
          autoComplete: { name },
          form: {
            autoComplete: 'off',
          }
        }}
        {...props}

      />
    </Box>
  );
};

export default FormikMuiTextField;
