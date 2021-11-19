import React, { useEffect } from 'react';
import { styled, alpha } from "@mui/material/styles";
import { useTheme } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { Alert, Button, Typography } from '@mui/material';
import { Box } from '@mui/system';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const Notice = ({ open, handleClose, message, severity, autoHide }) => {
  const theme = useTheme();

  useEffect(() => {
    console.log('Notice useEffect called')
    if (open) {
      setTimeout(() => {
        handleClose()
        }, autoHide);
      // }, 200000);
    }
  }, [open])

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      transitionDuration={{ appear: 500, enter: 500, exit: 500 }}
      sx={{ border: '1px solid white' }}
    >
      <DialogTitle>{"Notice!"}</DialogTitle>
      <DialogContent >
        <Alert severity={severity} sx={{
          width: '500px',
          '& .MuiAlert-message': {
            flex: 1,
          }
        }}>
          <Typography variant="h5" >
            {message}
          </Typography>
        </Alert>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} sx={{ mr: 2 }}>I got it</Button>
      </DialogActions>
    </Dialog>
  );
};

export default Notice;
