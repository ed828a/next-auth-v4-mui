import React from 'react';
import { Field } from "formik";
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/system';
import { TextareaAutosize } from '@mui/material';

const FormikMuiTextArea = ({
  name,
  label,
  type = "text",
  required = false,
  ...props
}) => {
  const theme = useTheme();

  return (
    <Box sx={{ my: 10, width: 1, border: 1 }}>
      <Field
        name={name}
        as={TextareaAutosize}
        label={label}
        required={required}
        type={type}


        minRows={5}
        {...props}
      />
    </Box>
  );
};

export default FormikMuiTextArea;
