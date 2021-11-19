import { styled, alpha } from "@mui/material/styles";
import {
  MenuItem,
  InputBase,
  SvgIcon,
  IconButton,
  Button,
} from "@mui/material";
import { Box } from "@mui/system";

export const Search = styled("form")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  // display: 'flex',
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

export const SearchIconWrapper = styled(IconButton)(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  right: 0,
  top: 0,
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 100,
  backgroundColor: "transparent",
  "&:hover": {
    cursor: "pointer",
  },
}));

export const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 1),
    // vertical padding + font size from searchIcon
    paddingRight: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",

    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export const StyledDropdownMenuItem = styled(MenuItem)(({ theme }) => ({
  color: theme.palette.secondary.main,
  "&:hover": {
    color: theme.palette.common.white,
    backgroundColor: theme.palette.secondary.main,
  },
}));

export const StyledMobileMenuItem = styled(Box)(({ theme }) => ({
  height: "64px",
  width: "200px",
  display: `grid`,
  placeItems: "center",
  "&:hover": {
    cursor: "pointer",
    backgroundColor: theme.palette.secondary.main,
    "& .MuiTypography-root": {
      color: theme.palette.common.white,
    },
  },
}));

// const StyledCircle = styled('circle')(({
//   fill:'none',
//   stroke:'#000000',
//   strokeWidth:2,
//   strokeLinecap:'round',
//   strokeLinejoin:'round',
//   strokeMiterlimit:10
// }))

// const StyledPath = styled('path')(({
//   fill:'none',
//   stroke:'#000000',
//   strokeWidth:2,
//   strokeLinecap:'round',
//   strokeLinejoin:'round',
//   strokeMiterlimit:10
// }))

// const StyledPolygon = styled('polygon')(({
//   fill:'none',
//   stroke:'#000000',
//   strokeWidth:2,
//   strokeLinecap:'round',
//   strokeLinejoin:'round',
//   strokeMiterlimit:10
// }))

// const StyledPolyline = styled('polyline')(({
//   fill:'none',
//   stroke:'#000000',
//   strokeWidth:2,
//   strokeLinecap:'round',
//   strokeLinejoin:'round',
//   strokeMiterlimit:10
// }))

// export const MovieIconSvg = ({ color, width, height }) => {
//   return (
//     <svg
//       x="0px"
//       y="0px"
//       viewBox="0 0 32 32"
//       style="enable-background:new 0 0 32 32;"
//     >
      
//       <StyledCircle cx="9" cy="7" r="5" />
//       <StyledCircle cx="19" cy="7" r="5" />
//       <StyledPath
//         d="M21,25H7c-1.1,0-2-0.9-2-2v-6c0-1.1,0.9-2,2-2h14c1.1,0,2,0.9,2,2v6C23,24.1,22.1,25,21,25z"
//       />
//       <StyledPolygon className="st0" points="29,25 23,22 23,18 29,15 " />
//       <StyledPolyline className="st0" points="10,31 14,25 18,31 " />
//       <StyledCircle cx="9" cy="7" r="1" />
//       <StyledCircle cx="19" cy="7" r="1" />
//     </svg>
//   );
// };

export const StyledModeBox = styled(Box)(({ theme }) => ({
  display: "flex",
  width: "50px",
  alignItems: "center",
  justifyContent: "center",
  // backgroundColor: theme.palette.background.default,
  color: theme.palette.secondary.main,
  borderRadius: 1 * theme.shape.borderRadius,
  // padding: theme.spacing(3),
}));

export const StyledCartDropdownContaner = styled(Box)(({ theme }) => ({
  width: "300px",
  maxHeight: "450px",
  display: "flex",
  flexDirection: "column",
  padding: "20px",
  backgroundColor: theme.palette.mode === "dark" ? "black" : "white",
  // border: '1px solid white',
}));
