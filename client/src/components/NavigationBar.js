import React, { useContext, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';

import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import { UserContext } from './UserContext.js';
import { useNavigate } from 'react-router-dom';

const NavigationBar = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);
  const handleLogOut = () => {
    fetch('/api/logout', {
      method: 'DELETE'
    })
      .then(res => {
        if (res.ok) {
          setLoggedInUser(null)
          navigate('/')
        }
      })
  }
  const navigate = useNavigate();
  const pages = [{pageName: 'About Us', pageFunction: () => navigate(`/aboutus`)}, 
  loggedInUser ? {pageName: 'Community WorkOuts', pageFunction: () => navigate(`/users/${loggedInUser.id}/communityworkouts`)} : ''
];
  const settings = [{settingName: 'Workouts',settingFunction:() => navigate(`/users/${loggedInUser.id}`)}, {settingName: 'Logout',settingFunction: handleLogOut }];


  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  // console.log(loggedInUser);
  return (
    <>

      <AppBar position="sticky" sx={{ backgroundColor: "#db3a2c" }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <FitnessCenterIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href='/'
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              GymBud
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page.pageName} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page.pageName}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <FitnessCenterIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              GymBud
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page) => (
                <Button
                  key={page.pageName}
                  onClick={page.pageFunction}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {page.pageName}
                </Button>
              ))}
            </Box>



            {loggedInUser ?
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar src={loggedInUser.profile_pic_url} alt="Remy Sharp" />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map(({settingName, settingFunction}) => (
                    <MenuItem key={settingName} onClick={settingFunction}>
                      <Typography textAlign="center">{settingName}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
              :
              <Button 
              variant='contained'
              onClick={() => navigate('/login')}> LogIn</Button>}


          </Toolbar>
        </Container>
      </AppBar>
    </>

  );
}
export default NavigationBar;