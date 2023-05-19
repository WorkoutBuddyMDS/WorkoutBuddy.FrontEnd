import * as React from 'react';
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
import AdbIcon from '@mui/icons-material/Adb';
import { StyledBasicButton, StyledLink } from '@/styles/styled-components';
import { styled } from '@mui/system';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FitnessCenter } from '@mui/icons-material';
import Link from 'next/link';
import { accountActions } from '@/store/reducers/account';
import { RootState } from '@/store';
import LanguageSwitch from '@/components/LanguageSwitch/LanguageSwitch';

const pages = [
  <StyledLink href="/exercises">Exercises</StyledLink>,
  <StyledLink href="/splits">Splits</StyledLink>,
  <StyledLink href="/caloriesCalculator">Calories Calculator</StyledLink>,
];

const StyledButtonBox = styled(Box)`
  margin-left: 10px;
`;

function NavigationLayout({ children }: { children: React.ReactElement }) {
  const router = useRouter();
  const dispatcher = useDispatch();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const accountState = useSelector((state: RootState) => state.account);
  const [username, setUsername] = useState(accountState.username);
  const [isAdmin, setisAdmin] = useState<boolean | undefined>(false);
  const [jwtToken, setJwtToken] = useState<string | null>('');
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    setJwtToken(token);
    if (token) {
      setIsLoggedIn(true);
      setUsername(sessionStorage.getItem('username') ?? 'User');
      setisAdmin(sessionStorage.getItem('roles')?.includes('Admin'));
    } else {
      setIsLoggedIn(false);
    }
  }, [accountState]);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const settings = [
    <Link href={`/user/edit`}>Profile</Link>,
    <Button
      onClick={() => {
        dispatcher(accountActions.signOut());
        router.reload();
      }}
    >
      Logout
    </Button>,
  ];

  if (isAdmin) {
    settings.unshift(
      <Link href={`/admin/pending-exercises`}>Admin</Link>
    );
  }

  return (
    <>
      <AppBar position="static">
        <Container maxWidth={false}>
          <Toolbar disableGutters>
            <FitnessCenter
              sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}
            />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.15rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              Workout Buddy
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
                {pages.map((page, index) => (
                  <Typography textAlign="center" key={index}>
                    {page}
                  </Typography>
                ))}
              </Menu>
            </Box>
            <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
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
              Workout Buddy
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page) => (
                <Typography sx={{ my: 2, color: 'white', display: 'block' }}>
                  {page}
                </Typography>
              ))}
            </Box>

            <LanguageSwitch locale={router.locale} />

            {isLoggedIn ? (
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar>
                      {username.replace(/[a-z]/g, '') ||
                        username.toUpperCase()[0]}
                    </Avatar>
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
                  {settings.map((setting) => (
                    <MenuItem onClick={handleCloseUserMenu}>
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            ) : (
              <StyledButtonBox>
                <StyledBasicButton onClick={() => router.push('/login')}>
                  Sign in
                </StyledBasicButton>
                <StyledBasicButton onClick={() => router.push('/register')}>
                  Register
                </StyledBasicButton>
              </StyledButtonBox>
            )}
          </Toolbar>
        </Container>
      </AppBar>
      {children}
    </>
  );
}
export default NavigationLayout;
