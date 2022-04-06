import React, { useState, useEffect } from 'react';
import { 
  Button,
  Box, 
  Modal,
  CircularProgress, 
  TextField, 
  Avatar,
  Table,
  TableContainer,
  TableRow,
  Typography
 } 
from '@mui/material';
import { ReadNft, CellNft } from '../../../api/nft';
import { User } from '../../../States/User';
import { Wallet } from '../../../States/Wallet';
import { useRecoilValue } from 'recoil';
import { useParams } from 'react-router';
import { Profile}  from '../../../api/user';
import Web3 from 'web3';
import SaleFactory from '../../../abi/SaleFactory.json';
import SsafyNFT from '../../../abi/SsafyNFT.json';
import Swal from 'sweetalert2';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '65%',
  height: '90%',
  bgcolor: 'background.paper',
  boxShadow: 24,
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
  // borderRadius: 6,
  boxShadow: 24,
  p: 1,
};

const style3 = {
  display: 'flex',
  height: '70%',
  width: '100%',
  alignItems: 'center',
  justifyContent: 'center'
}

const Postmodal = ({ item, userData }) => {
  console.log("item:", item);
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const handleClose2 = () => setOpen2(false);
  const [onwerid, setOwnerid] = React.useState('소유자');
  const [id, setId] = React.useState('민팅한 사람');
  const [time, setTime] = React.useState('2022-03-30');
  const [title, setTtile] = React.useState('맛잇는 햄버거');
  const handleOpen = () => setOpen(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [nftDetail, setNftDetail] = useState('');
  const [saleInfo, setSaleInfo] = useState('');
  const wallet = useRecoilValue(Wallet);
  const user = useRecoilValue(User);
  const [price, setPrice] = useState('');
  const [web3, setWeb3] = React.useState();
  const [userSeq, setUserSeq] = useState('');
  const [userProfile, setUserProfile] = useState('');


  const handleClose = () => {
    if (isSaleLoaded === false) {
      return
    }
    setOpen(false);
  }

  const handleOpen2 = () => {
    if (open2 === false) {
      setOpen2(true)
    }
    else {
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
      setUserSeq(res.data.data.nftOwnerName)
      console.log("ReadNft:", res.data.data)
    });
    Profile(userData).then((res)=>{setUserProfile(res.data.data.userProfile)})
    console.log(userProfile)
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

      handleClose();
      Swal.fire({
        title: ' Success ',
        text: '판매 등록에 성공하였습니다. ✨',
        icon: 'success',
        confirmButtonText: '확인'
      })
    }

    catch (error) {
      handleClose();
      Swal.fire({
        title: ' Error ',
        text: '판매 등록에 실패하였습니다. 😢',
        icon: 'error',
        confirmButtonText: '확인',
      })
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

      <Box sx={{ display: 'flex', height: '20%', width: '100%', alignItems: 'center', justifyContent: 'center' }}>
        <Button
          sx={{ width: '30%' }}
          variant="contained"
          type="submit"
          onClick={handleSellButtonClick}
        >
          판매하기
        </Button></Box>
    </Box>
  );

  const newpost = (
      <Box sx={style} component="form">
        <Box sx={{ display: 'flex', height: '100%' }}>
          <Box sx={{ width: '68%', display: 'flex', justifyContent: 'center' }}>
            <Box sx={{ width: '100%', height: '100%' }}>
              <img src={item.nftPictureLink} alt={item.nftPictureLink} height="100%" width="100%"/>
            </Box>
          </Box>
          <Box sx={{ width: '32%' }}>
            <Box sx={{ height: '95%' }}>
              <Box sx={{ display: 'flex', height: '7%', alignItems: 'center' }} borderBottom={1} borderColor="#e3e3e3">
                <Box sx={{ display: 'flex', height: '50%' }}>
                {userProfile
                ? <Avatar sx={{ width: 30, height: 30, mx: 1.2 }} alt="User" src={userProfile}/> 
                : <Avatar sx={{ width: 30, height: 30 }} alt="User" src="/images/baseimg.jpg"/>}
                </Box>
                <Typography 
                  variant="h6" 
                  sx={{ mt: 0.2 }}
                >
                  {nftDetail.nftOwnerName}
                </Typography>
              </Box>
              <Box sx={{ width: '100%', mx: 1.2, mt: 2 }}>
                <Typography variant="h3" gutterBottom>
                    {nftDetail.nftTitle}
                </Typography>
              </Box>
              <Typography 
                variant="h6" 
                gutterBottom 
                component="div" 
                sx={{ mx: 1.2, mt: 1 }}
              >
                NFT 정보
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
                  {nftDetail.nftAuthorName}
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
                  {nftDetail.nftTitle}
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
                토큰 ID
                <Typography variant="h7">
                  {nftDetail.nftTokenId}
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
                        가나다라마바사아자차카타파하
                        가나다라마바사아자차카타파하
                        가나다라마바사아자차카타파하
                        가나다라마바사아자차카타파하
                        가나다라마바사아자차카타파하
                        가나다라마바사아자차카타파하
                        가나다라마바사아자차카타파하
                        가나다라마바사아자차카타파하
                        가나다라마바사아자차카타파하
                        가나다라마바사아자차카타파하
                        가나다라마바사아자차카타파하
                        가나다라마바사아자차카타파하
                        가나다라마바사아자차카타파하
                        가나다라마바사아자차카타파하
                        가나다라마바사아자차카타파하
                        가나다라마바사아자차카타파하
                        가나다라마바사아자차카타파하
                        가나다라마바사아자차카타파하
                        가나다라마바사아자차카타파하
                        가나다라마바사아자차카타파하
                        가나다라마바사아자차카타파하
                        가나다라마바사아자차카타파하
                        {nftDetail.nftDesc}
                      </Typography>
                    </Typography>
                  </TableRow>
                </Table>
              </TableContainer>
              <Typography 
                variant="body1"
                sx={{ mx: 1.2, my: 1 }}
              >
                Market 유의사항
                <Typography variant="body2" sx={{ mx: 0.1, my: 1 }}> 
                  1. 구매는 SSAFY WALLET 내 이더리움(ETH)이 차감되는 방식으로 진행됩니다.
                </Typography>
                <Typography variant="body2" sx={{ mx: 0.1, my: 1 }}>
                  2. 구매 거래가 체결되면 거래 취소가 불가하므로 신중하게 결정하여 진행해주세요.
                </Typography>
                <Typography variant="body2" sx={{ mx: 0.1, my: 1 }}>
                  3. 해당 NFT에 연계된 디지털상품 관련 분쟁 (지식재산권 분쟁 포함)이 발생한 경우 해당 NFT에 대한 거래지원이 종료될 수 있습니다.
                </Typography>
              </Typography>
            </Box>
            {
              // 판매자라면 보이게 끔 (로그인한 아이디와 현재 보는 프로필의 주인과 같다면)
              // 지갑주소와 ownerAddress가 동일한지 확인
              user !== params 
              ?
                <div></div> 
              :
                wallet === null 
                ?
                  <Button sx={{ ml: 0.5, width: '98%' }} variant="contained" color="error" >
                    지갑 연동 이후 이용이 가능합니다.
                  </Button> :
                  wallet !== nftDetail.nftOwnerAddress 
                  ?
                    <Button sx={{ ml: 0.5, width: '98%' }} variant="contained" color="error" >
                      지갑 주소가 일치하지 않습니다.
                      </Button> 
                  :
                    isSaleLoaded !== true 
                    ? 
                      <Box sx={{ textAlign: 'center' }}>
                        <CircularProgress />
                      </Box> 
                    :
                      item.nftForSale === true 
                      ?
                        <Button sx={{ ml: 0.5, width: '98%' }} variant="contained" color="warning" >
                          판매중
                        </Button> 
                      :
                        <Button sx={{ ml: 0.5, width: '98%' }} variant="contained" onClick={handleOpen2} disabled={!isSaleLoaded}>
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
        sx={{ width: '300px', height: '300px' }}
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