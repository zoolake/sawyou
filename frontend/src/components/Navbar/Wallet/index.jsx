import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { Wallet } from '../../../States/Wallet';
import { useRecoilState } from 'recoil';
import Web3 from "web3";
import SsafyToken from '../../../abi/SsafyToken.json';

export default function TemporaryDrawer() {
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


  /* 지갑 연동 관련 */
  const [wallet, setWallet] = useRecoilState(Wallet);
  const [web3, setWeb3] = React.useState();
  const [balance, setBalance] = React.useState(null);

  React.useEffect(() => {
    if (typeof window.ethereum != "undefined") {
      try {
        const web = new Web3(window.ethereum);
        setWeb3(web);
      } catch (err) {
        console.log(err);
      }
    }
  }, []);


  const connectWallet = async () => {
    // 메타마스크 지갑과 연결된 계정 정보를 받는 JSON-RPC Call API
    const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
    setWallet(accounts[0]);
  };

  const getBalance = async () => {
    // 잔액 확인을 위해 ERC-20 Contract 사용
    const erc20Contract = await new web3.eth.Contract(SsafyToken.abi, "0x6C927304104cdaa5a8b3691E0ADE8a3ded41a333");
    const temp = await erc20Contract.methods.balanceOf(wallet).call();
    console.log("balance:", temp);
    setBalance(temp);
  }


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
            <AccountBalanceWalletIcon sx={{ fontSize: 27, color: 'black' }} />
          </Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            <Box sx={{ display: 'flex' }}>
              <Box sx={{ ml: 2, mt: 1 }}>
                <img src="/images/baseimg_nav.jpg" />
              </Box>
              <Box sx={{ ml: 3, mt: 1 }}>My Wallet</Box>
            </Box>
            {
              wallet === null ?
                <Button sx={{ width: 250, mt: 5 }} onClick={connectWallet}>지갑 연동하기</Button> :
                <Button sx={{ width: 250, mt: 5 }}>{wallet.slice(0, 10)}  지갑과 연결되었습니다</Button>
            }
            {
              balance === null ?
                <Button onClick={getBalance}> 잔액 불러오기 </Button> :
                <Button>{balance} SSF</Button>
            }
          </Drawer>
        </React.Fragment>
      ))
      }
    </div >
  );
}
