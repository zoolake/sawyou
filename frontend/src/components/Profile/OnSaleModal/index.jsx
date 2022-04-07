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
  // border: '2px solid #000',
  // borderRadius: 6,
  boxShadow: 24,
  // p: 1,
};

const Postmodal = (item) => {
  console.log("이상해요!!!!", item.item);

  const [open, setOpen] = React.useState(false);
  const [onwerid, setOwnerid] = React.useState('소유자');
  const [id, setId] = React.useState('민팅한 사람');
  const [time, setTime] = React.useState('2022-03-30');
  const [title, setTtile] = React.useState('맛잇는 햄버거');
  const handleOpen = () => setOpen(true);
  const handleClose = () => (setOpen(false));
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [nftDetail, setNftDetail] = useState('');
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
        console.log(err);
      }
    } else {
      console.log("ethereum is not defined")
    }
    ReadCellNft(item.item.nftSeq).then((r) => {
      console.log("saleInfo", r.data.data)
      setSaleInfo(r.data.data);
    })


  }, [])

  /*
- 판매중인 NFT에서 선택 
- 지금 구매
- 판매 table에서 NFT의 tokenId와 Sale Contract Address를 얻어온다.
- 불러온 Sale CA를 통해 instance를 만들어 `purchase()` 를 호출한다.
  - `purchase()` 호출 전에 해당 Sale Contract가 구매자의 돈을 사용할 수 있게 구매가격만큼 approve 해준다.
- 구매 성공시 판매 테이블에서 판매여부Y/N을 업데이트 해준다.
- tokenID를 활용하여 해당 NFT의 소유자를 변경해준다. (NFT 테이블)
  - 유저 일련번호 업데이트
  - 소유자 지갑 주소 업데이트
*/
/*
  시나리오
  1. 판매중인 nft 사진을 누른다
  2-1. 나의 판매중인 nft라면 "판매 취소"버튼이 활성화
  2-2. 상대방의 판매중인 nft라면 "구매하기" 버튼이 활성화
  3. "구매하기"를 누르면 구매가 완료될때까지 loading 

*/
  // send purchase to blockchain network
  const handlePurchaseButtonClick = async () => {

    setIsPurchaseLoaded(true);
    console.log("saleContractAddress : ", saleInfo)
    const saleContractAddress = saleInfo.saleContractAddress;

    const salePrice = saleInfo.salePrice;
    console.log("salePrice : ", saleInfo.salePrice)

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
          console.log(err);
        }
      } else {
        console.log("ethereum is not defined")
      }
      //saleContractAddress로 delete하자
      const saleContractAddress = saleInfo.saleContractAddress;

      console.log(saleContractAddress);
      const saleContract = await new web3.eth.Contract(Sale.abi, saleContractAddress)

      const cancelSales = await saleContract.methods.cancelSales().send({ from: wallet }).then(() => { });
      console.log(saleContractAddress);

      //send cancelInfo to backend
      const request = ({
        "saleContractAddress": saleContractAddress
      })
      const cancelSale = await CancelSale(request);

      handleClose();
      Swal.fire({
        title: ' Success ',
        text: '판매 취소에 성공하였습니다. ✨',
        icon: 'success',
        confirmButtonText: '확인'
      })
    }
    catch (error) {
      handleClose();
      Swal.fire({
        title: ' Error ',
        text: '판매 취소에 실패하였습니다. 😢',
        icon: 'error',
        confirmButtonText: '확인',
      })
      console.log("error:", error);
    }
    finally {
      setIsPurchaseLoaded(false);
      window.location.reload()
    }
  }

  const loading = (
    wallet === null ?
      <Button sx={{ ml: 0.5, width: '98%' }} variant="contained" color="error" >지갑 연동 이후 이용이 가능합니다.</Button> :
      isPurchaseLoaded ?
        <Box sx={{ textAlign: 'center' }}><CircularProgress /></Box> :
        userId !== saleInfo.sellerId ?
          <Button sx={{ ml: 0.5, width: '98%' }} variant="contained" onClick={onClickRedirectPathHandler()}>
            구매하기
          </Button> :
          wallet !== saleInfo.nftOwnerAddress ?
            <Button sx={{ ml: 0.5, width: '98%' }} variant="contained" color="error" >지갑 주소가 일치하지 않습니다.</Button> :
            <Button sx={{ ml: 0.5, width: '98%' }} variant="contained" onClick={handleCancelButtonClick}>
              판매 취소
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
                판매 정보
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
                      작가명
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
                      작품명
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
                    >
                      작품 내용
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
                      판매 가격
                      <Typography variant="h7">
                        {saleInfo.salePrice}
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
                      판매 시작
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
                      판매 종료
                      <Typography variant="h7">
                        {saleInfo.endDate}
                      </Typography>
                    </Typography>                
                  </TableRow>
                </Table>
              </TableContainer>
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
