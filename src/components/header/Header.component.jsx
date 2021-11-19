import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { styled, alpha } from "@mui/material/styles";

import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';

import MoreIcon from '@mui/icons-material/MoreVert';
import { useTheme } from '@mui/material/styles';

import Image from 'next/image'
import { Search, SearchIconWrapper, StyledDropdownMenuItem, StyledInputBase, StyledMobileMenuItem, StyledModeBox, StyledCartDropdownContaner, } from './Header.elements';
import { useGlobalStateValues } from '../common/ContextThemeProvider';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Link from '../common/Link'

import axios from 'axios';
import MenuIcon from '@mui/icons-material/Menu';
import { useRouter } from 'next/router'
import { signIn, signOut, useSession } from "next-auth/react"

const Header = () => {

  const theme = useTheme();
  const router = useRouter()

  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [genresAnchorEl, setGenresAnchorEl] = useState(null);

  const [search, setSearch] = useState('')
  const [state, dispatch, colorMode] = useGlobalStateValues()

  const { data: session, status } = useSession()
  const loading = status === "loading"

  const { user } = state

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const isGenresMenuOpen = Boolean(genresAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log('search: ', search)
  }

  const logout = async (e) => {
    handleMenuClose()

    console.log('e.target: ', e.target)
    // e.preventDefault();
    try {
      // this will remove the cookie of auth
      const response = await axios.post('/api/users/logout', { user: state.user });
      console.log('logout response.data', response.data);
      dispatch({
        type: "SET_USER_LOGOUT",
      })
      localStorage.removeItem('user')

    } catch (error) {
      console.log('logout error: ', error);
    }
  }

  const menuId = 'primary-search-account-menu';
  const dropdownMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <StyledDropdownMenuItem onClick={(e) => {
        e.preventDefault();
        signOut()
      }}
      >
        Log Out
      </StyledDropdownMenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (user) => (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <Box>
        {
          !!user ? (
            <MenuItem
              onClick={handleProfileMenuOpen}
              sx={{
                '& .MuiTypography-root': {
                  color: theme.palette.secondary.main,
                },
                '& .MuiIconButton-root': {
                  color: theme.palette.secondary.main,
                },
                '&:hover': {
                  bgcolor: 'secondary.main',
                  '& .MuiIconButton-root': {
                    color: theme.palette.common.white,
                  },
                  '& .MuiTypography-root': {
                    color: theme.palette.common.white,
                  }
                }
              }}>
              <IconButton
                size="large"
                color="secondary"
              >
                <AccountCircle fontSize="large" />
              </IconButton>
              <Typography variant="h6"
                align="center"
                color="secondary"
              >
                Profile
              </Typography>
            </MenuItem>
          ) : (
            <Box
              sx={{
                width: 200,
                height: 64,
                display: `grid`,
                placeItems: 'center',
                '& .MuiTypography-root': {
                  color: theme.palette.secondary.main,
                },
                '&:hover': {
                  bgcolor: 'secondary.main',
                  '& .MuiTypography-root': {
                    color: theme.palette.common.white,
                  }
                }
              }}
            >
              <Typography variant="h6"
                align="center"
                color="secondary"
              >
                SignIn
              </Typography>
            </Box>
          )
        }
      </Box>
    </Menu>
  );

  const handleGenresMenuOpen = (event) => {
    setGenresAnchorEl(event.currentTarget);
  };

  const handleGenresMenuClose = (event) => {
    setGenresAnchorEl(null);
  };

  const handleGenresMenuClick = (item) => {
    dispatch({
      type: "SET_CATEGORY",
      category: item,
    });
    handleGenresMenuClose();
    router.push(`/category/${item.name}`);
  };

  const genresMenuId = "genresMenuId";
  const genresMenu = (
    <Menu
      anchorEl={genresAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "left" }}
      id={genresMenuId}
      keepMounted
      transformOrigin={{ vertical: "bottom", horizontal: "left" }}
      open={isGenresMenuOpen}
      onClose={handleGenresMenuClose}
      sx={{ px: "32px" }}
      style={{ transform: "translateY(30px)", transition: "transform 0.5s" }}
    >
      {/* {genreses.map((item) => (
        <MenuItem
          key={item.name}
          onClick={() => handleGenresMenuClick(item)}
          color={theme.palette.secondary.main}
          sx={{
            color: theme.palette.secondary.main,
            '&:hover': {
              bgcolor: 'secondary.main',
              color: theme.palette.common.white,
            }
          }}
        >
          {item.name}
        </MenuItem>
      ))} */}
    </Menu>
  );

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      let searchUrl;
      if (search) {
        // axios calls here
      } else {
        searchUrl = "";
      }
      console.log("searchUrl: ", searchUrl);
      dispatch({
        type: "SET_SEARCH_URL",
        searchUrl,
      });
      setSearch("");
      if (searchUrl) {
        // history.push("/searchResults");
        router.push("/searchResults");
      }
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }} >
      <AppBar position="static">
        <Toolbar sx={{ bgcolor: theme.palette.mode === 'light' ? '#fff' : "default" }} >
          <IconButton
            edge="start"
            sx={{ mr: 2 }}
            color="secondary"
            onClick={handleGenresMenuOpen}
          >
            <MenuIcon />
          </IconButton>

          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              display: { xs: 'none', sm: 'block' },
              mr: 2,
              fontFamily: 'Akronim',
              fontSize: '2rem',
            }}
          >
            <Link href='/'
              sx={{ textDecoration: 'none', color: theme.palette.secondary.main }}
            >
              Website Name
            </Link>
          </Typography>
          <Search onSubmit={handleSearchSubmit}>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              value={search}
              onChange={(e) => { setSearch(e.target.value) }}
              onKeyDown={handleKeyDown}
            />

            <SearchIconWrapper type="submit" >
              <SearchIcon color={search.length > 0 ? 'white' : "secondary"} />
            </SearchIconWrapper>
          </Search>


          <Box sx={{ display: { xs: 'none', md: 'flex' }, ml: "auto", }}>
            {
              session ? (
                <IconButton
                  // size="large"
                  edge="end"
                  onClick={handleProfileMenuOpen}
                  color="secondary"
                  sx={{ '&:hover': { color: theme.palette.common.white, backgroundColor: theme.palette.secondary.main } }}
                >
                  <AccountCircle fontSize="large" />
                </IconButton>
              ) : (
                <Box
                  sx={{
                    width: 100,
                    display: `grid`,
                    placeItems: 'center',
                    '& .MuiTypography-root': {
                      color: theme.palette.secondary.main,
                      textDecoration: 'none',
                    },
                    '&:hover': {
                      // bgcolor: 'secondary.main',
                      cursor: 'pointer',
                      '& .MuiTypography-root': {
                        color: theme.palette.common.white,
                      }
                    }
                  }}
                >
                  <Link href='/auth/login'>
                    <Typography variant="h6" align="center" onClick={(e) => {
                      e.preventDefault();
                      signIn()
                    }} >
                      SignIn
                    </Typography>
                  </Link>
                </Box>
              )
            }

          </Box>
          <StyledModeBox sx={{
            '& .MuiIconButton-root': {
              color: theme.palette.secondary.main,
            },
            '&:hover': {
              '& .MuiIconButton-root': {
                color: theme.palette.common.white,
              },
            }
          }}
          >
            <IconButton
              sx={{
                ml: 2,
                '&:hover': { color: theme.palette.common.white, backgroundColor: theme.palette.secondary.main }
              }}
              onClick={colorMode.toggleColorMode}
              color="inherit"
            >
              {
                theme.palette.mode === 'dark' ?
                  <Brightness7Icon fontSize="large" /> :
                  <Brightness4Icon fontSize="large" />
              }
            </IconButton>
          </StyledModeBox>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="secondary"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu(user)}
      {dropdownMenu}
      {genresMenu}
    </Box>
  );
};

export default Header;
