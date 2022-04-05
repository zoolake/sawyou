import React, { useState, useEffect } from 'react';
import { Modal, Box, Input, Button, InputBase, Grid, CircularProgress } from '@mui/material';
import Wrapper from '../styles';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import { ImageList, ImageListItem, makeStyles } from '@material-ui/core';
import Typography from '@mui/material/Typography';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteIcon from '@mui/icons-material/Delete';
import AutoFixNormalIcon from '@mui/icons-material/AutoFixNormal';
import { ReadPost, ChangePost, DeletePost } from '../../../api/post'
import Web3 from 'web3';
import SsafyNFT from '../../../abi/SsafyNFT.json'
import { useRecoilValue } from 'recoil';
import { Wallet } from '../../../States/Wallet';
import { MintingNft } from '../../../api/nft';
import { TokenOutlined } from '@mui/icons-material';
import SaleFactory from '../../../abi/SaleFactory.json';
import { CellNft } from '../../../api/nft';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '65%',
  height: '90%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  borderRadius: 6,
  boxShadow: 24,
  p: 1,
};

const Postmodal = ({ item }) => {
  const [open, setOpen] = React.useState(false);
  const [change, setChange] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => { (setOpen(false)); setChange(false) };
  const [post, SetPost] = useState('');
  const userSeq = item.postSeq
  const [content, SetContent] = useState('');
  const handleChange = () => { setChange(true); SetContent(post.postContent) }

  const Read = async () => {
    const res = await ReadPost(userSeq)
    SetPost(res.data.data)
  }

  const onChangeContent = (e) => {
    SetContent(e.target.value);
  };

  const onSendChange = (e) => {
    Change()
  };

  const onSendDelete = (e) => {
    Delete()
  };

  const Change = async () => {
    const body = {
      postContent: content
    }
    const res = await ChangePost(userSeq, body)
    Read()
    setChange(false)
  };

  useEffect(() => {
    Read()
  }, []);

  const Delete = async () => {
    const res = await DeletePost(userSeq)
    handleClose()
    window.location.reload()
  };

  useEffect(() => {
    Read()
  }, []);

  /* 민팅 및 판매하기 관련 */
  const [web3, setWeb3] = React.useState();
  const wallet = useRecoilValue(Wallet);

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

  /* 민팅 */
  const [tokenId, setTokenId] = useState();
  const [nftSeq, setNftSeq] = useState();
  const [isMintingLoaded, setIsMintingLoaded] = useState(false);

  // 민팅 : 블록체인
  const handleMintingButtonClick = async () => {
    setIsMintingLoaded(true);

    const tokenContract = await new web3.eth.Contract(SsafyNFT.abi, "0x6c5BC9afdFf1E7354A1A03E7f8683d78EEe231E2"); // 컨트랙트의 ABI와 주소로 *컨트랙트 객체 생성*
    const { events } = await tokenContract.methods
      .create(wallet, "https://i.pinimg.com/564x/60/fa/f8/60faf812aad673133e698150b87f4373.jpg")
      .send({ from: wallet });

    const tempTokenId = events.Transfer.returnValues.tokenId;
    setTokenId(tempTokenId);

    await mintingOnServer(tempTokenId);

    setIsMintingLoaded(false);
  };

  // 민팅 : 백엔드
  const mintingOnServer = async (tempTokenId) => {
    const request = {
      "userSeq": item.userSeq,
      "postSeq": item.postSeq,
      "nftAuthorName": "작가명",
      "nftTitle": "제목",
      "nftDesc": "설명",
      "nftPictureLink": item.postPictureLink,
      "nftTokenId": tempTokenId,
      "nftOwnerAddress": wallet
    };

    const { data: { data } } = await MintingNft(request);
    setNftSeq(data);
  }

  /* 판매 (민팅 + 판매) */
  const handleSellButtonClick = async () => {

    // 먼저 민팅 진행
    await handleMintingButtonClick();

    // SaleFactory Contract
    const saleFactoryContract = await new web3.eth.Contract(
      SaleFactory.abi,
      "0x0922ea92B9C3f3C580127BE07aeEfDad9CBc3540",
      { from: wallet }
    );

    const now = Math.floor(new Date().getTime() / 1000);

    // SaleFactory를 통해 createSale 진행
    await saleFactoryContract.methods
      .createSale(
        tokenId,
        1,
        10,
        now,
        now + 3600,
        "0x6C927304104cdaa5a8b3691E0ADE8a3ded41a333",
        "0x6c5BC9afdFf1E7354A1A03E7f8683d78EEe231E2"
      )
      .send({ from: wallet });
    // .then(function (receipt) {
    //   console.log("create Sale", receipt);
    // });

    // 방금 생성한 Sale 컨트랙트 주소 추출
    const sales = await saleFactoryContract.methods.allSales().call();
    const saleContractAddress = sales[sales.length - 1];
    console.log(saleContractAddress);

    // ERC-721 Contract
    const erc721Contract = await new web3.eth.Contract(
      SsafyNFT.abi,
      "0x6c5BC9afdFf1E7354A1A03E7f8683d78EEe231E2"
    );

    // Sale 컨트랙트에게 wallet이 갖고있는 token의 권한을 넘겨준다.
    await erc721Contract.methods
      .approve(saleContractAddress, tokenId)
      .send({ from: wallet })
      .then(() => {
        console.log("권한 이전");
      });

    // wallet으로 부터 Sale 컨트랙트로 토큰을 옮긴다.
    await erc721Contract.methods
      .transferFrom(wallet, saleContractAddress, tokenId)
      .send({ from: wallet })
      .then(() => {
        console.log("토큰 이전");
      });

    // TODO : 백엔드 판매 API 

  }



  const viewMyPost = (
    <Box sx={style}
      component="form"
    >
      <Box sx={{ display: 'flex', height: '100%' }}>
        <Box sx={{ width: '68.3%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Box sx={{ width: '100%', height: '100%' }}>
            <img src={item.postPictureLink} height="100%" width="100%" />
            {/* <img src={props.item.img} alt={props.item.img} height="100%" width="100%" /> */}
          </Box>
        </Box>
        <Box sx={{ mx: 1, width: '31.7%', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', height: '5%', alignItems: 'center' }}>
            <img src="/images/baseimg_nav.jpg"></img>
            <Box sx={{ width: '80%' }}><Typography sx={{ ml: 2, mt: 0.2 }}>{item.userId}</Typography></Box>
            <Button onClick={handleChange} sx={{ width: '5%', minHeight: 0, minWidth: 40 }}><AutoFixNormalIcon sx={{ color: 'black' }}></AutoFixNormalIcon></Button>
            <Button onClick={onSendDelete} sx={{ width: '5%', minWidth: 40 }}><DeleteIcon sx={{ color: 'black' }}></DeleteIcon></Button>
          </Box>
          <Box sx={{ height: '90%' }}>{post.postContent}</Box>
          {
            isMintingLoaded === true ? <Box sx={{ textAlign: 'center' }}><CircularProgress /></Box> :
              <div>
                <Button sx={{ width: '50%' }} onClick={handleMintingButtonClick} disabled={isMintingLoaded}>
                  민팅하기
                </Button>
                <Button sx={{ width: '50%' }} onClick={handleSellButtonClick}>
                  판매하기
                </Button>
              </div>
          }
        </Box>

      </Box>

    </Box >

  );

  const ChangeModal = (
    <Box sx={style}
      component="form"
    >
      <Box sx={{ display: 'flex', height: '100%' }}>
        <Box sx={{ width: '68.3%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Box sx={{ width: '100%', height: '100%' }}>
            <img src={item.postPictureLink} height="100%" width="100%" />
            {/* <img src={props.item.img} alt={props.item.img} height="100%" width="100%" /> */}
          </Box>
        </Box>
        <Box sx={{ mx: 1, width: '31.7%', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', height: '5%', alignItems: 'center' }}>
            <img src="/images/baseimg_nav.jpg"></img>
            <Box sx={{ width: '80%' }}><Typography sx={{ ml: 2, mt: 0.2 }}>{item.userId}</Typography></Box>
          </Box>
          <Box sx={{ height: '90%' }}><InputBase onChange={onChangeContent} multiline={true} fullWidth defaultValue={content} sx={{ height: '3%' }}></InputBase></Box>
          <Button onClick={onSendChange} sx={{ width: '100%' }}>수정하기</Button>
        </Box>
      </Box>
    </Box>

  );


  return (
    <div class='div2'>
      <Button
        key={"add"}
        onClick={handleOpen}
        sx={{ width: '100%', height: '100%' }}
      >
        <img
          class={"img2"}
          src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
          srcSet={item.postPictureLink}
          alt={item.title}
          loading="lazy"
        />
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        closeAfterTransition
      >
        {change ? ChangeModal : viewMyPost}

      </Modal>
    </div>
  )
}

export default Postmodal;