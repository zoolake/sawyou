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
  const handleOpen = () => setOpen(true);
  const handleClose = () => (setOpen(false));
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    if (selectedImage) {
      setImageUrl(URL.createObjectURL(selectedImage));
    }
  }, [selectedImage]);


  const newpost = (
    <Box sx={style}
    component="form"
    >
      <Box sx={{ display: 'flex',height:'100%'}}>
        <Box sx = {{width:'68.3%',display: 'flex', justifyContent:'center', alignItems:'center'}}>
          <Box sx={{width:'100%',height:'100%'}}>
            <img src={props.item.img} alt={props.item.img} height="100%" width="100%" />
          </Box>
        </Box>
        <Box sx={{mx: 1,width:'31.7%', justifyContent:'space-between'}}>
          <Box sx={{ display: 'flex'}}>
            <img src="/images/baseimg_nav.jpg"></img>
            <Typography sx={{ml:2,mt:0.2}}>아이디</Typography>
          </Box>
          <Box sx = {{height:'92%'}}>45</Box>
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
        {newpost}
      </Modal>
    </div>
  )
}

export default Postmodal;