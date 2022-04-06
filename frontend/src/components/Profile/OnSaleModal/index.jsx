import React, { useState, useEffect } from 'react';
import { CircularProgress } from '@mui/material';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Wrapper from '../styles';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import { ImageList, ImageListItem, makeStyles } from '@material-ui/core';
import Typography from '@mui/material/Typography';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { ReadNft, ReadCellNft, CancelSale, BuyNft } from '../../../api/nft';
import Sale from '../../../abi/Sale.json';
import SsafyToken from '../../../abi/SsafyToken.json';
import { Wallet } from '../../../States/Wallet';
import { User } from '../../../States/User';
import { useRecoilValue } from 'recoil';
import Web3 from 'web3';
import { textAlign } from '@mui/system';
import { useParams } from 'react-router';
import { useNavigate  } from 'react-router-dom';


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

const Postmodal = (item) => {
  console.log("이상해요!!", item.item);


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

  const onClickRedirectPathHandler = name => e => {
    window.scrollTo(0, 0);
    navigate(`/nft/${item.item.nftSeq}`);
    handleClose()
  };
  

 
  useEffect(() => {
    if (selectedImage) {
      setImageUrl(URL.createObjectURL(selectedImage));
    }
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
    console.log("saleContractAddress : ", saleInfo)

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

    setIsPurchaseLoaded(false);
  }




  const loading = (

    wallet === null ?
      <Button sx={{ width: '100%' }} variant="contained" color="error" >지갑 연동 이후 이용이 가능합니다.</Button> :
      isPurchaseLoaded ?
        <Box sx={{ textAlign: 'center' }}><CircularProgress /></Box> :
        userId !== saleInfo.sellerId ?
          <Button sx={{ width: '100%' }} onClick={onClickRedirectPathHandler()}>
            구매하기
          </Button> :
          wallet !== saleInfo.nftOwnerAddress ?
            <Button sx={{ width: '100%' }} variant="contained" color="error" >지갑 주소가 일치하지 않습니다.</Button> :
            <Button sx={{ width: '100%' }} onClick={handleCancelButtonClick}>
              판매 취소
            </Button>
  )





  const newpost = (
    <Box sx={style}
      component="form"
    >
      <Box sx={{ display: 'flex', height: '100%' }}>
        <Box sx={{ width: '68.3%', display: 'flex', justifyContent: 'center' }}>
          <Box sx={{ width: '100%', height: '100%' }}>
            <img src={item.item.nftPictureLink} alt={item.nftPictureLink} height="100%" width="100%" />
          </Box>
        </Box>
        <Box sx={{ mx: 1, width: '31.7%' }}>
          <Box sx={{ height: '95%' }}>
            <Box sx={{ display: 'flex', height: '8%', alignItems: 'center' }}>
              <Box sx={{ display: 'flex', height: '50%' }}>
                <img src="/images/baseimg_nav.jpg"></img>
              </Box>
              <Typography variant="h6" sx={{ml:2,mt:0.2}}>{saleInfo.sellerName}</Typography>
            </Box>

          <Box><Typography>작가 이름 : {saleInfo.nftAuthorName} </Typography></Box>
          <Box><Typography>작품 제목 : {saleInfo.nftTitle} </Typography></Box>
          <Box><Typography>작품 내용 : {saleInfo.nftDesc} </Typography></Box>
          <Box><Typography>판매 가격 : {saleInfo.salePrice} </Typography></Box>
          <Box><Typography>판매 시작 : {saleInfo.startDate} </Typography></Box>
          <Box><Typography>판매 종료 : {saleInfo.endDate} </Typography></Box>
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
