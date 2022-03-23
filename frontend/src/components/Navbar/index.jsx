import React, { useState, useEffect } from 'react';
import Wrapper from './styles';
import { Link } from 'react-router-dom'
import Search from './Search/index'

// MUI
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate , withRouter } from 'react-router-dom';

const UserHeader = (props) => {
  const navigate = useNavigate(); // for redirect
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };  
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const onClickRedirectPathHandler = name => e => {
    window.scrollTo(0, 0);
    navigate(`${name}`);
  };

  return (
    <Wrapper>
      <AppBar position="fixed" color="inherit" sx={{ width : '100%',boxShadow:0, borderBottom:1.5, borderColor: 'grey.200'}}>
        <Container sx={{ display: 'flex', justifyContent : 'center', height : 60}}>
          <Box sx={{ display: 'flex', width : 950, justifyContent : 'space-between'}}>
              <Button
                sx={{ my : "auto", fontSize: 20, color : 'black'}}
                onClick={onClickRedirectPathHandler('/')}
              >
                I SAW YOU
              </Button>
              <Box sx={{ display: 'flex', mt : 1.5}}>
                <Search>
                  
                </Search>
              </Box>
              

              <Box sx={{ display: 'flex'}}>
                <Button 
                  key={"home"}
                  onClick={onClickRedirectPathHandler('/')}
                  style={{
                    maxWidth: "60px",
                    maxHeight: "60px",
                    minWidth: "30px",
                    minHeight: "30px"
                  }}
                  >
                    <HomeIcon sx={{ fontSize: 27, color : 'black' }}/>
                </Button>

                <Button
                  key={"add"}
                  onClick={onClickRedirectPathHandler('/add')}
                  style={{
                    maxWidth: "60px",
                    maxHeight: "60px",
                    minWidth: "30px",
                    minHeight: "30px"
                  }}
                  >
                    <AddBoxOutlinedIcon sx={{ fontSize: 27, color : 'black' }}/>
                </Button>

                <Button
                  key={"trade"}
                  onClick={onClickRedirectPathHandler('/trade')}
                  style={{
                    maxWidth: "60px",
                    maxHeight: "60px",
                    minWidth: "30px",
                    minHeight: "30px"
                  }}
                  >
                  <img src="/images/eth.png" />
                </Button>

                <Button 
                  onClick={handleOpenUserMenu}
                  style={{
                    maxWidth: "60px",
                    maxHeight: "60px",
                    minWidth: "30px",
                    minHeight: "30px"
                  }}  >
                  <img src="/images/baseimg_nav.jpg" />
                </Button>
                <Menu
                  sx={{ mt: '40px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                    <MenuItem key={"profile"} onClick={onClickRedirectPathHandler('/')}>
                      <Typography textAlign="center">프로필</Typography>
                    </MenuItem>

                    {/* <MenuItem key={"logout"} onClick={onClickLogout}> */}
                    <MenuItem key={"logout"}>
                      <Typography textAlign="center">로그아웃</Typography>
                    </MenuItem>    
                </Menu>
                <Button
                  key={"wallet"}
                  onClick={onClickRedirectPathHandler('/wallet')}
                  style={{
                    maxWidth: "60px",
                    maxHeight: "60px",
                    minWidth: "30px",
                    minHeight: "30px"
                  }}
                  >
                    <AccountBalanceWalletIcon sx={{ fontSize: 27, color : 'black' }}/>
                </Button>

            </Box>

          </Box>
        </Container>
      </AppBar>
    </Wrapper>
  )
}

export default UserHeader;