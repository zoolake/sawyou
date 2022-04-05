import React, { useState, useEffect }  from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import Wrapper from '../styles';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import Typography from '@mui/material/Typography';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import InputBase from "@mui/material/InputBase";
import {WritePost} from "../../../api/post"

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '45%',
  height: '65%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  borderRadius : 6,
  boxShadow: 24,
  p: 1,
};

const Postmodal = (props) => {
  const [open, setOpen] = React.useState(false);
  const [content, setContent] = React.useState('');
  const handleOpen = () => setOpen(true);
  const handleClose = () => (setOpen(false), setContent(''), setSelectedImage(''));
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    if (selectedImage) {
      setImageUrl(URL.createObjectURL(selectedImage));
    }
  }, [selectedImage]);

  const handlePost = () => {
    const body = new FormData();
    body.append('image', selectedImage);
    body.append('postContent', content);

    WritePost(body)
    .then(res => {
      handleClose()
      window.location.reload()
    })
    .catch(err => {
      console.log(err)
    })
  }
  
  const onChangeContent = (e) => {
    setContent(e.target.value);
  };




  const newpost = (
    <Box sx={style}
    component="form"
    >
        <Box
          sx = {{height:'5%', display: 'flex', justifyContent:'space-between'}}
        >
        <Button
          onClick={handleClose}
          sx={{ color : 'black' }}>
        <ArrowBackIcon ></ArrowBackIcon>
        </Button>
        <Typography sx={{ my:'auto'}}>
          새 게시물 만들기
        </Typography>
        <Button onClick={handlePost}>
          공유하기
        </Button>
      </Box>

      <Box sx={{ display: 'flex',height:'95%'}}>
        <Box sx = {{width:'70%',display: 'flex', justifyContent:'center', alignItems:'center'}}>

        {(imageUrl && selectedImage) ? (
          <Box sx={{width:'100%',height:'100%'}}>
            <img src={imageUrl} alt={selectedImage.name} height="100%" width="100%" />
          </Box>
        ) : <Box>
              <input
              accept="image/*"
              type="file"
              id="select-image"
              style={{ display: 'none' }}
              onChange={e => setSelectedImage(e.target.files[0])}
              />
            <label htmlFor="select-image">
              <Button sx={{my:'auto',width:150,height:30}} variant="contained" component="span" color="primary">
                <Typography variant="h7">
                  컴퓨터에서 선택
                </Typography>
              </Button>
            </label>
            </Box> }
        </Box>
        <Box sx = {{mx: 1,width:'28%', justifyContent:'space-between'}}>
          <Box sx={{ display: 'flex'}}>
            <img src="/images/baseimg_nav.jpg"></img>
            <Typography sx={{ml:2,mt:0.2}}>아이디</Typography>
          </Box>
          <InputBase
            placeholder="내용 입력"
            onChange={onChangeContent}
          />
        </Box>
        </Box>
    </Box>
  );


  return (
    <div>
            
      <Button
        key={"add"}
        onClick={handleOpen}
        style={{
          maxWidth: "40px",
          maxHeight: "60px",
          minWidth: "40px",
          minHeight: "60px"
        }}>
          <AddBoxOutlinedIcon sx={{ fontSize: 25, color : 'black' }}/>
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