import React, { useState, useEffect } from 'react';
import { Modal, Box, Button, InputBase, CircularProgress, TextField } from '@mui/material';
import Wrapper from './styles';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import Avatar from '@mui/material/Avatar';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import DeleteIcon from '@mui/icons-material/Delete';
import AutoFixNormalIcon from '@mui/icons-material/AutoFixNormal';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { ReadPost, ChangePost, DeletePost, WriteComment } from '../../../api/post'
import Web3 from 'web3';
import SsafyNFT from '../../../abi/SsafyNFT.json'
import { useRecoilValue } from 'recoil';
import { Wallet } from '../../../States/Wallet';
import { MintingNft } from '../../../api/nft';
import Swal from 'sweetalert2';
import { User } from '../../../States/User';
import { ReadCommnet, LikePost } from '../../../api/post';
import { useNavigate } from 'react-router-dom';

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
  width: '40%',
  height: '500px',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  borderRadius: 6,
  boxShadow: 24,
  p: 1,
};

const style3 = {
  display: 'flex',
  height: '20%',
  width: '100%',
  alignItems: 'center',
  justifyContent: 'center'
};

const style4 = {
  display: 'flex',
  height: '50%',
  width: '100%',
  alignItems: 'center',
  justifyContent: 'center'
};

const searchStyle = {
  bgcolor: 'white',
  border: '1px solid #dedede',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'auto',
};

const Postmodal = ({ item }) => {
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [like, setLike] = useState(item.postIsLike);
  const [likeCnt, setLikeCnt] = useState(item.postLikeCnt);
  const [change, setChange] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose2 = () => setOpen2(false);
  const [post, SetPost] = useState('');
  const userSeq = item.postSeq
  const [dialog, setDialog] = React.useState(false);
  const [content, SetContent] = useState('');
  const handleChange = () => { setChange(true); SetContent(post.postContent) }
  const [mintContent, setMintContent] = useState('');
  const [mintArtist, setMintArtist] = useState('');
  const [mintTitle, setMintTitle] = useState('');
  const [comment, setComment] = useState('');
  const user = useRecoilValue(User);
  const [count, setCount] = useState(1);
  const [commentContent, setCommentContent] = useState('');
  const navigate = useNavigate();

  const displayedAt = (createdAt) => {
    var d = new Date(createdAt);
    const milliSeconds = new Date() - d - 32400000
    console.log(createdAt)
    console.log(new Date())
    console.log(milliSeconds)
    const seconds = milliSeconds / 1000
    if (seconds < 60) return `방금 전`
    const minutes = seconds / 60
    if (minutes < 60) return `${Math.floor(minutes)}분 전`
    const hours = minutes / 60
    if (hours < 24) return `${Math.floor(hours)}시간 전`
    const days = hours / 24
    if (days < 7) return `${Math.floor(days)}일 전`
    const weeks = days / 7
    if (weeks < 5) return `${Math.floor(weeks)}주 전`
    const months = days / 30
    if (months < 12) return `${Math.floor(months)}개월 전`
    const years = days / 365
    return `${Math.floor(years)}년 전`
  }

  const handleKeypress = e => {
    if (e.key === 'Enter') {
      onSubmit(e);
    }
  };

  const onChange = event => {
    setCommentContent(event.target.value);
  }  

  const onSubmit = event => {
    event.preventDefault();
    if (commentContent.trim() === '') {
      return;
    }
    const body = {
      commentContent : commentContent
    }
    WriteComment(item.postSeq, body).then(
      getComment(),
      setCommentContent(''),
      setCount(count => count + 1),
    )
  };

  const getComment = async() => {
    const res = await ReadCommnet(item.postSeq)
    setComment(res.data.data)
  }


  const handleOpen2 = () => {
    if (open2 === false) {
      setOpen2(true)
    }
    else {
      return;
    }
  }

  const handleClose = () => {
    if (isMintingLoaded === false) {
      return
    }
    setOpen(false); 
    setChange(false);
  }

  const handelLike = (e) => {
    sendLike()
    if (like === true) {
      setLike(false)
      setLikeCnt(count => count - 1)
    }
    else {
      setLike(true)
      setLikeCnt(count => count + 1)
    }
  }

  const sendLike = async() => {
    const res = await LikePost(item.postSeq)
  }


  const Read = async () => {
    const res = await ReadPost(userSeq)
    SetPost(res.data.data)
    const res2 = await ReadCommnet(userSeq)
    setComment(res2.data.data)
  }

  const onChangeContent = (e) => {
    SetContent(e.target.value);
  };

  const onSendChange = (e) => {
    Change()
  };


  const handleClickDialog = () => {
    setDialog(true);
  };

  const handleDialogClose = () => {
    setDialog(false);
  };

  const handleDialogClose2 = async () => {
    const res = await Delete()
    setDialog(false);
    setOpen(false);
  }

  const Change = async () => {
    const body = {
      postContent: content
    }
    const res = await ChangePost(userSeq, body)
    Read()
    setChange(false)
  };

  const Delete = async () => {
    const res = await DeletePost(userSeq)
    handleClose()
    window.location.reload()
  };
  const onClickRedirectPathHandler = name => e => {
    window.scrollTo(0, 0);
    navigate(`${name}`);
    window.location.reload()
  };


  useEffect(() => {
    Read()
  }, []);

  useEffect(() => {
    getComment()
  }, [count]);

  /* 민팅 및 판매하기 관련 */
  const [web3, setWeb3] = React.useState();
  const wallet = useRecoilValue(Wallet);
  const userId = useRecoilValue(User);

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
    handleClose2();
    setIsMintingLoaded(false);

    const tokenContract = await new web3.eth.Contract(SsafyNFT.abi, "0x6c5BC9afdFf1E7354A1A03E7f8683d78EEe231E2"); // 컨트랙트의 ABI와 주소로 *컨트랙트 객체 생성*
    try {
      const { events } = await tokenContract.methods
        .create(wallet, "https://i.pinimg.com/564x/60/fa/f8/60faf812aad673133e698150b87f4373.jpg")
        .send({ from: wallet });

      const tempTokenId = events.Transfer.returnValues.tokenId;
      setTokenId(tempTokenId);

      await mintingOnServer(tempTokenId);

      handleClose();
      Swal.fire({
        title: ' Success ',
        text: '민팅에 성공하였습니다. ✨',
        icon: 'success',
        confirmButtonText: '확인'
      })

    }
    catch (error) {
      handleClose();
      Swal.fire({
        title: ' Error ',
        text: '민팅에 실패하였습니다. 😢',
        icon: 'error',
        confirmButtonText: '확인',
      })
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
      "nftAuthorName": mintArtist,
      "nftTitle": mintTitle,
      "nftDesc": mintContent,
      "nftPictureLink": item.postPictureLink,
      "nftTokenId": tempTokenId,
      "nftOwnerAddress": wallet
    };

    const { data: { data } } = await MintingNft(request);
    setNftSeq(data);
  }

  const Mint = (
    <Box sx={style2} >
      <Box sx={style3}><Typography>작가 이름  </Typography>
        <TextField
          id="outlined-start-adornment"
          sx={{ ml: 5, width: '50ch' }}
          onChange={(event) => setMintArtist(event.target.value)}
        /></Box>
      <Box sx={style3}><Typography>작품 제목 </Typography>
        <TextField
          id="outlined-start-adornment"
          sx={{ ml: 5, width: '50ch' }}
          onChange={(event) => setMintTitle(event.target.value)}
        /></Box>
      <Box sx={style4}><Typography>작품 설명  </Typography>
        <TextField
          multiline
          rows={7}
          id="outlined-start-adornment"
          sx={{ ml: 5, width: '50ch' }}
          onChange={(event) => setMintContent(event.target.value)}
        /></Box>
      <Box sx={{ display: 'flex', height: '10%', width: '100%', alignItems: 'center', justifyContent: 'center' }}>
        <Button
          sx={{ width: '30%' }}
          variant="contained"
          type="submit"
          onClick={handleMintingButtonClick}
        >
          민팅하기
        </Button></Box>

    </Box>
  );


  const viewMyPost = (
    
    <Wrapper>
      <Box sx={style}
        component="form"
      >
        <Box className="box_header" sx={{ display: 'flex', height: '100%' }}>
          <Box sx={{ width: '68.3%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Box sx={{ width: '100%', height: '100%' }}>
              <img src={item.postPictureLink} height="100%" width="100%" />
            </Box>
          </Box>
          <Box sx={{ mx: 1, width: '31.7%', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', height: '5%', alignItems: 'center' }}>
              {item.userProfile 
                ? <Avatar sx={{ width: 30, height: 30 }} alt="User" src={item.userProfile }/> 
                : <Avatar sx={{ width: 30, height: 30 }} alt="User" src="/images/baseimg.jpg"/>}
                <h4 className="post_article_comment" onClick={onClickRedirectPathHandler(`/profile/${item.userId}`)}>
                    <strong className="cur1">
                      {item.userId}
                    </strong>
                  </h4>
              {/* <Box sx={{ width: '100%' }}><Typography sx={{ ml: 2, mt: 0.2 }}>{item.userId}</Typography></Box> */}
            {item.userId === user ? 
                        <Box sx={{display: 'flex'}}>
                        <Button onClick={handleChange} sx={{  minHeight: 0, minWidth: 40 }}><AutoFixNormalIcon sx={{ color: 'black' }}></AutoFixNormalIcon></Button>
                        <Button
                          onClick={handleClickDialog}
                          sx={{  minWidth: 40 }}>
                          <DeleteIcon sx={{ color: 'black' }}></DeleteIcon>
                        </Button>
                        <Dialog
                          open={dialog}
                          onClose={handleDialogClose}
                          aria-labelledby="alert-dialog-title"
                          aria-describedby="alert-dialog-description"
                        >
                          <DialogTitle id="alert-dialog-title">
                            {"게시물을 삭제할까요?"}
                          </DialogTitle>
                          <DialogActions>
                            <Button onClick={handleDialogClose2} autoFocus>삭제</Button>
                            <Button onClick={handleDialogClose}>취소</Button>
                          </DialogActions>
                        </Dialog>
                        </Box>
                        : null} 
            </Box>
            <Box sx={{ height: '81%' }} style={searchStyle}>
              <Box sx={{display: 'flex', alignItems: 'baseline'}}>
                <h4 className="post_text" onClick={onClickRedirectPathHandler(`/profile/${item.userId}`)}>
                  <strong className="cur1">
                    {item.userId}
                  </strong>
                  <span>&nbsp;</span>
                    {post && post.postContent.split(/(#[^\s]+)/g).map((v) => {
                    if (v.match(/#[^\s]+/)) {
                      return (
                        <a href={"/search/tags/" + v.slice(1)}>{v}</a>
                      );
                    }
                    return v;
                  })}
                </h4>
              </Box>
              { comment && comment.map((data) => 
                <Box sx={{display: 'flex', alignItems: 'baseline'}}>
                  <h4 className="post_article_comment" onClick={onClickRedirectPathHandler(`/profile/${data.userId}`)}>
                    <strong className="cur1">
                      {data.userId}
                    </strong>
                    <span>&nbsp;</span>
                    {data.commentContent}
                    <span>&nbsp;</span>
                    <Typography variant='caption' style={{color:'#28C6B3'}}>{displayedAt(data.commentWritingTime)}</Typography>
                  </h4>
                </Box>
              )}
            </Box>
            <Box sx={{ height: '8.5%', mb: 1 }} style={searchStyle}>
              <div className="post__likeCnt">
                {like === true ?       
                  <Button onClick={handelLike} sx={{minWidth:'24px'}} style={{padding:'0px'}}>     
                  <FavoriteIcon 
                    className="post_like"
                    sx = {{color:'red'}}
                  />
                  </Button> :
                  <Button onClick={handelLike} sx={{minWidth:'24px'}} style={{padding:'0px'}}>        
                  <FavoriteBorderIcon 
                    className="post_like"
                    sx = {{color:'black'}}
                  />
                  </Button>
                }
                좋아요 {likeCnt}개
              </div>
              <div className="commentContainer" >
                <div className="commentWrap" onSubmit="return false">
                  <InputBase
                    placeholder="내용 입력"
                    onChange={onChange}
                    onKeyPress={handleKeypress}
                    sx={{width:'80%', ml:1}}
                    value={commentContent}
                  />
                  <Button>
                    <Typography onClick={onSubmit}>게시</Typography>
                  </Button>
                </div>
              </div> 

            </Box> 
            {
              item.userId !== userId ? <div></div> : item.postIsNft 
              ? <Button sx={{ width: '100%' }} variant="contained" color="error" >
                  이미 민팅된 게시물입니다.
                </Button>
              : isMintingLoaded !== true 
                ? <Box sx={{ textAlign: 'center' }}>
                    <CircularProgress />
                  </Box> 
                : wallet === null 
                  ? <Button sx={{ width: '100%' }} variant="contained" color="error" >
                      지갑 연동 이후 이용이 가능합니다.
                    </Button> 
                  : <Button sx={{ width: '100%' }} variant="contained" onClick={handleOpen2} disabled={!isMintingLoaded}>
                      민팅하기
                      <Modal
                        open={open2}
                        onClose={handleClose2}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                        closeAfterTransition
                      >
                        {Mint}
                      </Modal>
                    </Button>
            }
          </Box>
        </Box>
      </Box >
    </Wrapper>
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
          <Box sx={{ display: 'flex', height: '7%', alignItems: 'center' }}>
            {item.userProfile 
              ? <Avatar sx={{ width: 30, height: 30 }} alt="User" src={item.userProfile }/> 
              : <Avatar sx={{ width: 30, height: 30 }} alt="User" src="/images/baseimg.jpg"/>}
          <Box sx={{ width: '80%' }}><Typography sx={{ ml: 2, mt: 0.2 }}>{item.userId}</Typography></Box></Box>
          <Box sx={{ height: '89%' }}><InputBase onChange={onChangeContent} multiline={true} fullWidth defaultValue={content} sx={{ height: '3%' }}></InputBase></Box>
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