import React from 'react';
import { useTheme } from '@mui/material/styles';
import { SpinningImage, StyledBox, StyledSpinner } from './Loader.elements';
import { Box } from '@mui/system';


const Loader = ({ open, size }) => {

  const theme = useTheme();

  return (
    <Box sx={{
      position: 'absolute',
      top: `calc(50% - ${size / 2}px)`,
      left: `calc(50% - ${size / 2}px)`,
      display: open ? 'block' : "none",
      zIndex: 200,
    }}>
      <SpinningImage
        src='/assets/site-spinner-svg.svg'
        width={`${size}px`}
        height={`${size}px`}
      />
      {/* <StyledSpinner
        color={theme.palette.secondary.main}
        size={300}
      /> */}
    </Box>
  );
};

export default Loader;
