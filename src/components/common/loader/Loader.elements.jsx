import React from 'react'
import { styled, alpha } from '@mui/material/styles'
import { Box } from '@mui/system'
import Image from 'next/image';

const PREFIX = 'MuiLoaderComponent'
const classes = {
  container: `${PREFIX}-container`
}

export const StyledBox = styled(Box)(({ theme }) => ({
  [`&.${classes.container}`]: {
    position: 'absolute',
    top: props => `calc(50% - ${props.size / 2}px)`,
    left: props => `calc(50% - ${props.size / 2}px)`,
    display: props => props.open ? 'block' : "none",
    zIndex: 200,
  }
}))

export const SpinningImage = styled(Image)(({ theme }) => ({
  animation: 'nfLoaderSpin infinite 700ms linear',
  
  "@keyframes nfLoaderSpin": {
    from: {
      transform: "rotate(0deg)"
    },
    to: {
      transform: "rotate(360deg)"
    },
  }
}))

export const Spinner = ({ color, size }) => (
  <svg ref={ref} version="1.0" 
    width={size} height={size} viewBox="0 0 150.000000 150.000000"
    preserveAspectRatio="xMidYMid meet">

    <g transform="translate(0.000000,150.000000) scale(0.100000,-0.100000)"
      fill={color} stroke="none">
      <path d="M520 1476 c-240 -84 -422 -277 -492 -522 -29 -102 -31 -276 -4 -374
58 -214 197 -384 390 -479 80 -40 187 -71 236 -70 14 0 -2 6 -35 14 -328 71
-556 354 -556 688 0 122 16 191 73 307 33 68 58 102 127 171 73 73 101 93 181
132 52 25 111 48 130 52 72 14 100 53 64 89 -20 21 -35 20 -114 -8z"/>
      <path d="M708 23 c12 -2 32 -2 45 0 12 2 2 4 -23 4 -25 0 -35 -2 -22 -4z" />
    </g>
  </svg>
);

export const StyledSpinner = styled(Spinner)(({ theme }) => ({
  animation: 'LoaderSpin infinite 700ms linear',
  transformBox:'fill-box',

  "@keyframes LoaderSpin": {
    from: {
      transform: "rotate(0deg)"
    },
    to: {
      transform: "rotate(360deg)"
    },
  }
}))