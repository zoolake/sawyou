import React, { useState, useEffect } from 'react';
import { Input, Button, Grid, Alert, Box, Modal, CircularProgress, TextField } from '@mui/material';
import Wrapper from '../styles';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import { ImageList, ImageListItem, makeStyles } from '@material-ui/core';
import Typography from '@mui/material/Typography';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { ReadNft, ReadCellNft, CellNft } from '../../../api/nft';
import Sale from '../../../abi/Sale.json';
import { User } from '../../../States/User';
import { Wallet } from '../../../States/Wallet';
import { useRecoilValue } from 'recoil';
import Web3 from 'web3';
import SaleFactory from '../../../abi/SaleFactory.json';
import SsafyNFT from '../../../abi/SsafyNFT.json';
import { useParams } from 'react-router';

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

const style2 = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '600px',
  height: '200px',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  borderRadius : 6,
  boxShadow: 24,
  p: 1,
};

const style3 ={
  display:'flex',
  height:'70%',
  width:'100%',
  alignItems: 'center',
  justifyContent:'center'
}

const Postmodal = ({ item }) => {
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const handleClose2 = () => setOpen2(false);
  const [onwerid, setOwnerid] = React.useState('소유자');
  const [id, setId] = React.useState('민팅한 사람');
  const [time, setTime] = React.useState('2022-03-30');
  const [title, setTtile] = React.useState('맛잇는 햄버거');
  const handleOpen = () => setOpen(true);
  const handleClose = () => (setOpen(false));
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [nftDetail, setNftDetail] = useState('');
  const [saleInfo, setSaleInfo] = useState('');
  const wallet = useRecoilValue(Wallet);
  const user = useRecoilValue(User);
  const [price, setPrice] = useState('');
  const [web3, setWeb3] = React.useState();
  
  const handleOpen2 = () => {
    if (open2 === false){
      setOpen2(true)
    }
    else{
      return;
    }
  }
  useEffect(() => {
    if (typeof window.ethereum != "undefined") {
      try {
        const web = new Web3(window.ethereum);
        setWeb3(web);
      } catch (err) {
        console.log(err);
      }
    }
  }, []);

  useEffect(() => {
    if (selectedImage) {
      setImageUrl(URL.createObjectURL(selectedImage));
    }
    ReadNft(item.nftSeq).then((res) => {
      setNftDetail(res.data.data)
      console.log("ReadNft:", res.data.data)
    });
  }, [selectedImage]);

  /* 판매 관련 */

  const [isSaleLoaded, setIsSaleLoaded] = useState(true);

  const handleSellButtonClick = async () => {
    handleClose2();
    setIsSaleLoaded(false);

    try {
      const saleFactoryContract = await new web3.eth.Contract(
        SaleFactory.abi,
        "0x0922ea92B9C3f3C580127BE07aeEfDad9CBc3540",
        { from: wallet }
      );

      const now = Math.floor(new Date().getTime() / 1000);

      // SaleFactory를 통해 createSale 진행
      await saleFactoryContract.methods
        .createSale(
          nftDetail.nftTokenId,
          1,
          price,
          now,
          now + 3600 * 72,
          "0x6C927304104cdaa5a8b3691E0ADE8a3ded41a333",
          "0x6c5BC9afdFf1E7354A1A03E7f8683d78EEe231E2"
        )
        .send({ from: wallet });

        // 2자리에다가 가격설정한거 넣게 한다

      // 방금 생성한 Sale 컨트랙트 주소 추출
      const sales = await saleFactoryContract.methods.allSales().call();
      const saleContractAddress = sales[sales.length - 1];
      console.log("sales.length:", sales.length);
      console.log(saleContractAddress);

      // ERC-721 Contract
      const erc721Contract = await new web3.eth.Contract(
        SsafyNFT.abi,
        "0x6c5BC9afdFf1E7354A1A03E7f8683d78EEe231E2"
      );

      // Sale 컨트랙트에게 wallet이 갖고있는 token의 권한을 넘겨준다.
      await erc721Contract.methods
        .approve(saleContractAddress, nftDetail.nftTokenId)
        .send({ from: wallet })
        .then(() => {
          console.log("권한 이전");
        });

      // wallet으로 부터 Sale 컨트랙트로 토큰을 옮긴다.
      await erc721Contract.methods
        .transferFrom(wallet, saleContractAddress, nftDetail.nftTokenId)
        .send({ from: wallet })
        .then(() => {
          console.log("토큰 이전");
        });

      // 백엔드 판매 API 호출
      await sellOnServer(saleContractAddress);

    }

    catch (error) {
      console.log("error:", error);
    }

    finally {
      setIsSaleLoaded(true);
    }
  }

  // 판매 : 백엔드
  const sellOnServer = async (saleContractAddress) => {

    const request = {
      "nftSeq": item.nftSeq,
      "salePrice": 2,
      "saleContractAddress": saleContractAddress,
    }

    await CellNft(request);
  }

  const params = useParams().id;

  const pricemodal = (
    <Box sx={style2}>
        <Box sx={style3}><Typography>판매 가격  </Typography>
          <TextField
          id="outlined-start-adornment"
          sx={{ ml: 5, width: '50ch' }}
          onChange={(event) => setPrice(event.target.value)}
        /></Box>

        <Box sx={{display:'flex', height:'20%', width:'100%', alignItems: 'center', justifyContent:'center'}}>        
          <Button
          sx={{width:'30%'}}
          variant="contained" 
          type="submit"
          onClick={handleSellButtonClick}
            >
              판매하기
          </Button></Box>
    </Box>
  );
  const newpost = (
    <Box sx={style}
      component="form"
    >
      <Box sx={{ display: 'flex', height: '100%' }}>
        <Box sx={{ width: '68.3%', display: 'flex', justifyContent: 'center' }}>
          <Box sx={{ width: '100%', height: '100%' }}>
            <img src={item.nftPictureLink} alt={item.nftPictureLink} height="100%" width="100%" />
          </Box>
        </Box>
        <Box sx={{ mx: 1, width: '31.7%' }}>
          <Box sx={{ height: '95%' }}>
            <Box sx={{ display: 'flex', height: '8%', alignItems: 'center' }}>
              <Box sx={{ display: 'flex', height: '50%' }}>
                <img src="/images/baseimg_nav.jpg"></img>
              </Box>
              <Typography variant="h6" sx={{ ml: 2, mt: 0.2 }}>{onwerid}</Typography>
            </Box>
            <Box><Typography>작성자 : {nftDetail.nftOwnerName} </Typography></Box>
            <Box><Typography>제작 시간 : {nftDetail.nftCreatedAt} </Typography></Box>
            <Box><Typography>작품 제목 : {nftDetail.nftTitle} </Typography></Box>
          </Box>
          {
            // 판매자라면 보이게 끔 (로그인한 아이디와 현재 보는 프로필의 주인과 같다면)
            // 지갑주소와 ownerAddress가 동일한지 확인
            user !== params ?
              <div></div> :
              wallet === null ?
                <Button sx={{ width: '100%' }} variant="contained" color="error" >지갑 연동 이후 이용이 가능합니다.</Button> :
                wallet !== nftDetail.nftOwnerAddress ?
                  <Button sx={{ width: '100%' }} variant="contained" color="error" >지갑 주소가 일치하지 않습니다.</Button> :
                  isSaleLoaded !== true ? <Box sx={{ textAlign: 'center' }}><CircularProgress /></Box> :
                    <Button sx={{ width: '100%' }} variant="contained" onClick={handleOpen2} disabled={!isSaleLoaded}>
                      판매하기
                      <Modal
                        open={open2}
                        onClose={handleClose2}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                        closeAfterTransition
                        >
                          {pricemodal}
                        </Modal>
                    </Button>

          }
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
          src={item.nftPictureLink}
          srcSet={item.nftPictureLink}
          alt={item.nftPictureLink}
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
        {newpost}
      </Modal>
    </div>
  )
}

export default Postmodal;