import React from "react";
import { ErrorMessage, Field } from "formik";
import { Box } from "@mui/system";
// import { useTheme } from '@mui/material/styles';
import { FormControlLabel, Checkbox} from "@mui/material";

const MuiCheckbox = ({ label, value, ...props }) =>{ 
  // console.log('value: ', value)
  // console.log('!!value: ', !!value)
  // console.log('value?.lenght: ', value?.length)
  // console.log('props: ', props)

  return (
    <FormControlLabel
      control={<Checkbox checked={!!value?.length} {...props} />}
      label={label}
      {...props}
    />
  )};

const FormikMuiCheckbox = ({
  name,
  label = "",
  ...props
}) => {

  return (
    <Box sx={{ mt: 2, mb: 1 }}>
      <Field
        name={name}
        as={MuiCheckbox}
        label={label}
        {...props}
      />
    </Box>
  );
};

export default FormikMuiCheckbox;