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
import { User } from '../../../States/User';
import { Wallet } from '../../../States/Wallet';
import { MintingNft } from '../../../api/nft';
import { TokenOutlined } from '@mui/icons-material';
import SaleFactory from '../../../abi/SaleFactory.json';
import { CellNft } from '../../../api/nft';
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
  const user = useRecoilValue(User);
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
  const [isMintingLoaded, setIsMintingLoaded] = useState(true);

  // 민팅 : 블록체인
  const handleMintingButtonClick = async () => {
    setIsMintingLoaded(false);

    const tokenContract = await new web3.eth.Contract(SsafyNFT.abi, "0x6c5BC9afdFf1E7354A1A03E7f8683d78EEe231E2"); // 컨트랙트의 ABI와 주소로 *컨트랙트 객체 생성*
    try {
      const { events } = await tokenContract.methods
        .create(wallet, "https://i.pinimg.com/564x/60/fa/f8/60faf812aad673133e698150b87f4373.jpg")
        .send({ from: wallet });

      const tempTokenId = events.Transfer.returnValues.tokenId;
      setTokenId(tempTokenId);

      await mintingOnServer(tempTokenId);
    }
    catch (error) {
      console.log("error:", error);
    }

    finally {
      setIsMintingLoaded(true);
    }

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

  const params = useParams().id;

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
            user !== params ?
              <div></div> :
              wallet === null ?
                <Button sx={{ width: '100%' }} variant="contained" color="error" >지갑 연동 이후 이용이 가능합니다.</Button> :
                item.postIsNft ?
                  <Button sx={{ width: '100%' }} variant="contained" color="error" >이미 민팅된 게시물입니다.</Button> :
                  isMintingLoaded !== true ? <Box sx={{ textAlign: 'center' }}><CircularProgress /></Box> :
                    <Button sx={{ width: '100%' }} variant="contained" onClick={handleMintingButtonClick} disabled={!isMintingLoaded}>
                      민팅하기
                    </Button>
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
        sx={{ width: '300px', height: '300px' }}
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