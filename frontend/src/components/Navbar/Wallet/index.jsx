import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { Wallet } from '../../../States/Wallet';
import { useRecoilState } from 'recoil';


export default function TemporaryDrawer() {
  const [wallet, setWallet] = useRecoilState(Wallet);
  const [state, setState] = React.useState({
    right: false
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  //나중에 기능 생기면 참조하기위해 필요
  // const list = (anchor) => (
  //   <Box
  //     sx={{ width:250 }}
  //     role="presentation"
  //     onClick={toggleDrawer(anchor, false)}
  //     onKeyDown={toggleDrawer(anchor, false)}
  //   >
  //   </Box>
  // );

  return (
    <div>
      {['right'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}
                style={{
                  maxWidth: "40px",
                  maxHeight: "60px",
                  minWidth: "40px",
                  minHeight: "60px"
                }}>
            <AccountBalanceWalletIcon sx={{ fontSize: 27, color : 'black' }}/>
          </Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            <Box sx={{ display: 'flex'}}>
              <Box sx={{ml:2, mt:1}}>
                <img src="/images/baseimg_nav.jpg" />
              </Box>
              <Box sx={{ml:3, mt:1}}>My Wallet</Box>
            </Box>
            <Button sx={{ width:250, mt:5 }}>지갑 연동하기</Button>
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
