import React, { useState, useEffect }  from 'react';
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
import {ReadNft} from '../../../api/nft';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '65%',
  height: '90%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  borderRadius : 6,
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

  useEffect(() => {
    if (selectedImage) {
      setImageUrl(URL.createObjectURL(selectedImage));
    }
    console.log("변해요")
    ReadNft(item.item.nftSeq).then((res) => {setNftDetail(res.data.data)});
  }, [selectedImage]); 
  
  const upDate = () => {
    setId(nftDetail.nftOwnerName);
  }


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
  // 구매 : 블록체인
  const handleBuyButtonClick = async () => {
    const tokenId = item.item.tokenId;
    const saleContractAddress = item.item.saleContractAddress;
  }
  


  const newpost = (
    <Box sx={style}
    component="form"
    >
      <Box sx={{ display: 'flex',height:'100%'}}>
        <Box sx = {{width:'68.3%',display: 'flex', justifyContent:'center'}}>
          <Box sx={{width:'100%',height:'100%'}}>
            <img src={item.item.nftPictureLink} alt={item.nftPictureLink} height="100%" width="100%" />
          </Box>
        </Box>
        <Box sx={{mx: 1,width:'31.7%'}}>
        <Box sx={{height:'95%'}}>
          <Box sx={{ display: 'flex', height:'8%', alignItems:'center'}}>
            <Box sx={{ display: 'flex', height:'50%'}}>
              <img src="/images/baseimg_nav.jpg"></img>
            </Box>
            <Typography variant="h6" sx={{ml:2,mt:0.2}}>{onwerid}</Typography>
          </Box>
          <Box><Typography>작성자 : {nftDetail.nftOwnerName} </Typography></Box>
          <Box><Typography>제작 시간 : {nftDetail.nftCreatedAt} </Typography></Box>
          <Box><Typography>작품 제목 : {nftDetail.nftTitle} </Typography></Box>
        </Box>
        <Button sx={{width:'100%'}}>
      
          구매하기
          </Button>
          
        </Box>

        </Box>

    </Box>

  );


  return (
    <div class='div2'>
      <Button
        key={"add"}
        onClick={handleOpen}
        sx={{width:'100%', height:'100%'}}
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