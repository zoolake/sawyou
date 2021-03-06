import React, { useState, useEffect } from 'react';
import { 
  CircularProgress,
  Modal,
  Box,
  Avatar,
  Button,
  Table,
  TableContainer,
  TableRow,
  Typography
 } 
from '@mui/material';
import { ReadCellNft, CancelSale, BuyNft } from '../../../api/nft';
import { useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { Profile}  from '../../../api/user';
import { Wallet } from '../../../States/Wallet';
import { User } from '../../../States/User';
import Sale from '../../../abi/Sale.json';
import SsafyToken from '../../../abi/SsafyToken.json';
import Web3 from 'web3';
import Swal from 'sweetalert2'


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '65%',
  height: '90%',
  bgcolor: 'background.paper',
  };

const Postmodal = (item) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => (setOpen(false));
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [saleInfo, setSaleInfo] = useState('abc');
  const wallet = useRecoilValue(Wallet);
  const userId = useRecoilValue(User);
  const [web3, setWeb3] = React.useState();
  const [isPurchaseLoaded, setIsPurchaseLoaded] = useState(false);
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState('');

  const onClickRedirectPathHandler = name => e => {
    window.scrollTo(0, 0);
    navigate(`/nft/${item.item.nftSeq}`);
    handleClose()
  };

  useEffect(() => {
    if (selectedImage) {
      setImageUrl(URL.createObjectURL(selectedImage));
    }
    Profile(item.userData).then((res)=>{setUserProfile(res.data.data.userProfile)})
  }, [selectedImage]);


  useEffect(() => {
    if (typeof window.ethereum != "undefined") {
      try {
        const web = new Web3(window.ethereum);
        setWeb3(web);
      } catch (err) {
      }
    } else {
    }
    ReadCellNft(item.item.nftSeq).then((r) => {
      setSaleInfo(r.data.data);
    })


  }, [])

  /*
- ???????????? NFT?????? ?????? 
- ?????? ??????
- ?????? table?????? NFT??? tokenId??? Sale Contract Address??? ????????????.
- ????????? Sale CA??? ?????? instance??? ????????? `purchase()` ??? ????????????.
  - `purchase()` ?????? ?????? ?????? Sale Contract??? ???????????? ?????? ????????? ??? ?????? ?????????????????? approve ?????????.
- ?????? ????????? ?????? ??????????????? ????????????Y/N??? ???????????? ?????????.
- tokenID??? ???????????? ?????? NFT??? ???????????? ???????????????. (NFT ?????????)
  - ?????? ???????????? ????????????
  - ????????? ?????? ?????? ????????????
*/
/*
  ????????????
  1. ???????????? nft ????????? ?????????
  2-1. ?????? ???????????? nft?????? "?????? ??????"????????? ?????????
  2-2. ???????????? ???????????? nft?????? "????????????" ????????? ?????????
  3. "????????????"??? ????????? ????????? ?????????????????? loading 

*/
  // send purchase to blockchain network
  const handlePurchaseButtonClick = async () => {

    setIsPurchaseLoaded(true);
    const saleContractAddress = saleInfo.saleContractAddress;
    const salePrice = saleInfo.salePrice;
    const erc20Contract = await new web3.eth.Contract(
      SsafyToken.abi,
      "0x6C927304104cdaa5a8b3691E0ADE8a3ded41a333"
    );

    const saleContract = await new web3.eth.Contract(Sale.abi, saleContractAddress);
    const approve = await erc20Contract.methods.approve(saleContractAddress, salePrice).send({ from: wallet });
    const purchase = await saleContract.methods.purchase().send({ from: wallet });

    // send purchaseinfo to backend
    const buyNft = await BuyNft({
      "nftSeq": item.item.nftSeq,
      "nftOwnerAddress": wallet
    });
    setIsPurchaseLoaded(false);
  }


  // send cancel to blockchain network
  const handleCancelButtonClick = async () => {
    setIsPurchaseLoaded(true);

    try {
      if (typeof window.ethereum != "undefined") {
        try {
          const web = new Web3(window.ethereum);
          setWeb3(web);
        } catch (err) {
        }
      } else {
      }
      //saleContractAddress??? delete??????
      const saleContractAddress = saleInfo.saleContractAddress;
      const saleContract = await new web3.eth.Contract(Sale.abi, saleContractAddress)
      const cancelSales = await saleContract.methods.cancelSales().send({ from: wallet }).then(() => { });

      //send cancelInfo to backend
      const request = ({
        "saleContractAddress": saleContractAddress
      })
      const cancelSale = await CancelSale(request);

      handleClose();
      Swal.fire({
        title: ' Success ',
        text: '?????? ????????? ?????????????????????. ???',
        icon: 'success',
        confirmButtonText: '??????'
      })
    }
    catch (error) {
      handleClose();
      Swal.fire({
        title: ' Error ',
        text: '?????? ????????? ?????????????????????. ????',
        icon: 'error',
        confirmButtonText: '??????',
      })
    }
    finally {
      setIsPurchaseLoaded(false);
      window.location.reload()
    }
  }

  const loading = (
    wallet === null ?
      <Button sx={{ ml: 0.5, width: '98%' }} variant="contained" color="error" >?????? ?????? ?????? ????????? ???????????????.</Button> :
      isPurchaseLoaded ?
        <Box sx={{ textAlign: 'center' }}><CircularProgress /></Box> :
        userId !== saleInfo.sellerId ?
          <Button sx={{ ml: 0.5, width: '98%' }} variant="contained" onClick={onClickRedirectPathHandler()}>
            ????????????
          </Button> :
          wallet !== saleInfo.nftOwnerAddress ?
            <Button sx={{ ml: 0.5, width: '98%' }} variant="contained" color="error" >?????? ????????? ???????????? ????????????.</Button> :
            <Button sx={{ ml: 0.5, width: '98%' }} variant="contained" onClick={handleCancelButtonClick}>
              ?????? ??????
            </Button>
  )


  const newpost = (
    <Box sx={style} component="form">
      <Box sx={{ display: 'flex', height: '100%' }}>
        <Box sx={{ width: '68%', display: 'flex', justifyContent: 'center' }}>
          <Box sx={{ width: '100%', height: '100%' }}>
            <img src={item.item.nftPictureLink} alt={item.nftPictureLink} height="100%" width="100%"/>
          </Box>
        </Box>
        <Box sx={{ width: '32%' }}>
          <Box sx={{ height: '95%' }}>
            <Box sx={{ display: 'flex', height: '7%', alignItems: 'center' }} borderBottom={1} borderColor="#e3e3e3">
              <Box sx={{ display: 'flex', height: '50%' }}>
              {userProfile
              ? <Avatar sx={{ width: 30, height: 30, mx: 1.2 }} src={userProfile}/>
              : <Avatar sx={{ width: 30, height: 30 }} alt="User" src={userProfile}/>}
              </Box>
              <Typography 
                variant="h6" 
                sx={{ mt: 0.2 }}
              >
                {saleInfo.sellerName}
              </Typography>
            </Box>
            <Box sx={{ mx: 1}}>
              <Box sx={{ width: '100%', mx: 1.2, mt: 2 }}>
                <Typography variant="h3" gutterBottom>
                    {saleInfo.nftTitle}
                </Typography>
              </Box>
              <Typography 
                variant="h6" 
                gutterBottom 
                component="div" 
                sx={{ mx: 1.2, mt: 1 }}
              >
                ?????? ??????
              </Typography>
              <TableContainer>
                <Table>
                  <TableRow sx={{ border: 1, borderColor:"#e3e3e3" }}>
                    <Typography 
                      variant="h7" 
                      gutterBottom 
                      display='flex' 
                      justifyContent='space-between'
                      alignItems='center'
                      sx={{ mx: 1.2, my: 1 }}
                    >
                      ?????????
                      <Typography variant="h7">
                        {saleInfo.nftAuthorName}
                      </Typography>
                    </Typography>
                    <Typography 
                      variant="h7"
                      gutterBottom 
                      display='flex' 
                      justifyContent='space-between'
                      alignItems='center'
                      sx={{ mx: 1.2, my: 1 }}
                    >
                      ?????????
                      <Typography variant="h7"> 
                        {saleInfo.nftTitle}
                      </Typography>
                    </Typography>
                  </TableRow>
                </Table>
              </TableContainer>
              <br/>
              <TableContainer>
                <Table>
                  <TableRow sx={{ border: 1, borderColor:"#e3e3e3" }}>
                    <Typography 
                      variant="h6" 
                      gutterBottom
                      sx={{ mx: 1.2, my: 1 }}
                      fontWeight={600}
                      fontSize="1rem"
                    >
                      ?????? ??????
                      <Typography 
                        variant="body2"
                      >
                        {saleInfo.nftDesc}
                      </Typography>
                    </Typography>
                  </TableRow>
                </Table>
              </TableContainer>
              <br/>
              <TableContainer>
                <Table>
                  <TableRow sx={{ border: 1, borderColor:"#e3e3e3" }}>
                    <Typography 
                      variant="h7" 
                      gutterBottom 
                      display='flex' 
                      justifyContent='space-between'
                      alignItems='center'
                      sx={{ mx: 1.2, my: 1 }}
                    >
                      ?????? ??????
                      <Typography variant="h7">
                        {saleInfo.salePrice} SSF
                      </Typography>
                    </Typography>
                    <Typography 
                      variant="h7" 
                      gutterBottom 
                      display='flex' 
                      justifyContent='space-between'
                      alignItems='center'
                      sx={{ mx: 1.2, my: 1 }}
                    >
                      ?????? ??????
                      <Typography variant="h7">
                        {saleInfo.startDate}
                      </Typography>
                    </Typography>  
                    <Typography 
                      variant="h7" 
                      gutterBottom 
                      display='flex' 
                      justifyContent='space-between'
                      alignItems='center'
                      sx={{ mx: 1.2, my: 1 }}
                    >
                      ?????? ??????
                      <Typography variant="h7">
                        {saleInfo.endDate}
                      </Typography>
                    </Typography>                
                  </TableRow>
                </Table>
              </TableContainer>
              <Typography 
                variant="body1"
                fontWeight={600}
                sx={{ mx: 1.2, my: 1 }}
              >
                Market ????????????
                <Typography variant="body2" sx={{ mx: 0.1, my: 1 }}> 
                  1. ????????? SSAFY WALLET ??? ????????????(ETH)??? ???????????? ???????????? ???????????????.
                </Typography>
                <Typography variant="body2" sx={{ mx: 0.1, my: 1 }}>
                  2. ?????? ????????? ???????????? ?????? ????????? ??????????????? ???????????? ???????????? ??????????????????.
                </Typography>
                <Typography variant="body2" sx={{ mx: 0.1, my: 1 }}>
                  3. ?????? NFT??? ????????? ??????????????? ?????? ?????? (??????????????? ?????? ??????)??? ????????? ?????? ?????? NFT??? ?????? ??????????????? ????????? ??? ????????????.
                </Typography>
                <Typography variant="body2" sx={{ mx: 0.1, my: 1 }}>
                  4. ?????? NFT ?????? ????????? ????????? ???????????????.
                </Typography>
              </Typography>
            </Box>
          </Box>
          {loading}
        </Box>
      </Box>
    </Box>
  );


  return (
    <div class='div2'>
      <Button
        key={"add"}
        onClick={handleOpen}
        sx={{ width: '300px', height: '300px' }}
      >
        <img
          class={"img2"}
          src={item.item.nftPictureLink}
          srcSet={item.item.nftPictureLink}
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
