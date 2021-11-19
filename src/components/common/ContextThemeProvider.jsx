import React, { createContext, useContext, useEffect, useMemo, useReducer, useState } from "react";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';
import { darkScrollbar } from "@mui/material";
import { SessionProvider } from "next-auth/react"

const StateContext = createContext();
export const useGlobalStateValues = () => useContext(StateContext);

const StateThemeProvider = ({ children, session }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [mode, setMode] = useState('dark')

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))
    console.log('user: ', user)
    dispatch({
      type: 'SET_USER',
      user,
    })
  }, [])

  const colorMode = useMemo(() => ({
    toggleColorMode: () => {
      setMode(prevMode => prevMode === 'light' ? 'dark' : 'light')
    }
  }), [])

  const theme = useMemo(() => createTheme({
    palette: {
      mode: mode,
      primary: {
        main: mode === 'dark' ? '#ffffff' : '#cfd7e0',
      },
      secondary: {
        light: mode === 'dark' ? '#90887C' : '#90887C',
        main: mode === 'dark' ? '#886735' : '#886735',
        dark: mode === 'dark' ? '#845F2E' : '#845F2E'
      },
      error: {
        main: red.A400,
      },
      common: {
        slidebar: '#D9AB27',
        hoverbackground: '#8F2626'
      }
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: mode === 'dark' ? darkScrollbar({
            track: '#2b2b2b',
            thumb: '#6b6b6b',
            active: '#959595',
          }) : null,
        },
      },
    },
  }), [mode])

  // displayName is for React-Context-Devtool of Chrome
  return (
    <SessionProvider session={session} refetchInterval={5 * 60}>
    <StateContext.Provider
      value={[state, dispatch, colorMode]}
      displayName="AppGlobalStateContext"
    >
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </StateContext.Provider>
    </SessionProvider>
  );
};

export default StateThemeProvider;

// reducer function
export const initialState = {
  user: null,
  cart: [],
  message: {
    show: false,
    text: '',
    severity: 'success', // 'error'|'info'|'success'|'warning'
  },
  loading: false, // used for _app down components
};

export const reducer = (state, action) => {
  console.log('action.type: ', action.type)

  switch (action.type) {
    case "SET_USER":
      // should localStorage operation here
      return {
        ...state,
        user: action.user,
      }

    case 'UPDATE_USER':
      const user = { ...state.user, ...action.profile }
      if (window) {
        localStorage.setItem('user', JSON.stringify(user))
      }
      return {
        ...state,
        user,
      }

    case "SET_USER_LOGOUT":
      return {
        ...state,
        user: null,
      }

    case 'UPDATE_CART':
      return {
        ...state,
        cart: action.cart,
      }

    case 'SHOW_MESSAGE':
      return {
        ...state,
        message: {
          show: true,
          text: action.text,
          severity: action.severity,
        },
        loading: false,
      }

    case 'CLOSE_MESSAGE':
      return {
        ...state,
        message: {
          show: false,
          text: '',
          severity: 'success',
        },
        loading: false,
      }

    case 'SET_LOADING':
      return {
        ...state,
        loading: action.loading,
      }


    default:
      return state;
  }
};
