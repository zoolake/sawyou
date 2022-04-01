import React, { useState, useEffect }  from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import InputBase from "@mui/material/InputBase";
import Grid from '@mui/material/Grid';
import Wrapper from '../styles';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import { ImageList, ImageListItem, makeStyles } from '@material-ui/core';
import Typography from '@mui/material/Typography';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteIcon from '@mui/icons-material/Delete';
import AutoFixNormalIcon from '@mui/icons-material/AutoFixNormal';
import {ReadPost, ChangePost, DeletePost} from '../../../api/post'

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

const Postmodal = (props) => {
  const [open, setOpen] = React.useState(false);
  const [change, setChange] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {(setOpen(false)); setChange(false)};
  const [post, SetPost] = useState('');
  const userSeq = props.item.postSeq
  const [content, SetContent] = useState('');
  const handleChange = () => {setChange(true); SetContent(post.postContent)}
  
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
      postContent : content
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
  };

  useEffect(() => {
    Read()
  }, []);


  const viewMyPost = (
    <Box sx={style}
    component="form"
    >
      <Box sx={{ display: 'flex',height:'100%'}}>
        <Box sx = {{width:'68.3%',display: 'flex', justifyContent:'center', alignItems:'center'}}>
          <Box sx={{width:'100%',height:'100%'}}>
            <img src="/images/baseimg_nav.jpg" height="100%" width="100%" />
            {/* <img src={props.item.img} alt={props.item.img} height="100%" width="100%" /> */}
          </Box>
        </Box>
        <Box sx={{mx: 1,width:'31.7%', justifyContent:'space-between'}}>
          <Box sx={{ display: 'flex', height:'5%', alignItems:'center'}}>
            <img src="/images/baseimg_nav.jpg"></img>
            <Box sx={{width:'80%'}}><Typography sx={{ml:2,mt:0.2}}>{post.userId}</Typography></Box>
            <Button onClick={handleChange} sx={{width:'5%',minHeight: 0,minWidth: 40}}><AutoFixNormalIcon sx={{color : 'black'}}></AutoFixNormalIcon></Button>
            <Button onClick={onSendDelete} sx={{width:'5%',minWidth: 40 }}><DeleteIcon sx={{color : 'black'}}></DeleteIcon></Button>
          </Box>
          <Box sx={{height:'90%'}}>{post.postContent}</Box>
          <Button sx={{width:'50%'}}>
          민팅하기
          </Button>
          <Button sx={{width:'50%'}}>
          판매하기
          </Button>
        </Box>

        </Box>

    </Box>

  );

  const ChangeModal = (
    <Box sx={style}
    component="form"
    >
      <Box sx={{ display: 'flex',height:'100%'}}>
        <Box sx = {{width:'68.3%',display: 'flex', justifyContent:'center', alignItems:'center'}}>
          <Box sx={{width:'100%',height:'100%'}}>
            <img src="/images/baseimg_nav.jpg" height="100%" width="100%" />
            {/* <img src={props.item.img} alt={props.item.img} height="100%" width="100%" /> */}
          </Box>
        </Box>
        <Box sx={{mx: 1,width:'31.7%', justifyContent:'space-between'}}>
          <Box sx={{ display: 'flex', height:'5%', alignItems:'center'}}>
            <img src="/images/baseimg_nav.jpg"></img>
            <Box sx={{width:'80%'}}><Typography sx={{ml:2,mt:0.2}}>{post.userId}</Typography></Box>
          </Box>
          <Box sx={{height:'90%'}}><InputBase onChange={onChangeContent} multiline={true} fullWidth defaultValue={content} sx={{height:'3%'}}></InputBase></Box>
          <Button onClick={onSendChange} sx={{width:'100%'}}>수정하기</Button>
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
            src={`${props.item.img}?w=164&h=164&fit=crop&auto=format`}
            srcSet={`${props.item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            alt={props.item.title}
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