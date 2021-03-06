import React, { useState, useEffect }  from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Wrapper from './styles';
import Typography from '@mui/material/Typography';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { ProfileImage, Profile  } from "../../../api/user"
import { useParams } from 'react-router';
import { useRecoilState, useRecoilValue } from 'recoil';
import { UserImage } from '../../../States/UserImage';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '400px',
  height: '400px',
  bgcolor: 'background.paper'
};

const ImageModal = (props) => {
  const [open, setOpen] = React.useState(false);
  const [content, setContent] = React.useState('');
  const handleOpen = () => setOpen(true);
  const handleClose = () => (setOpen(false), setContent(''), setSelectedImage(''));
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const forImage = props.item.userProfile
  const params = useParams().id;
  const [userImage, setuserImage] = useRecoilState(UserImage);

  useEffect(() => {
    if (selectedImage) {
      setImageUrl(URL.createObjectURL(selectedImage));
    }
  }, [selectedImage]);

  const handlePost = () => {
    const body = new FormData();
    body.append('userImage', selectedImage);

    ProfileImage(body)
    .then(res => {
      Profile(params).then((res) => setuserImage(res.data.data.userProfile))
      handleClose()
      window.location.reload()
    })
    .catch(err => {
    })
  } 

  const newpost = (
    <Wrapper>
      <Box sx={style} component="form">
        <Box sx = {{ height:'8%', display: 'flex', justifyContent:'space-between', borderBottom: '1px solid #d9d9d9' }}>
          <Button
            onClick={handleClose}
            sx={{ color : 'black' }}
          >
            <ArrowBackIcon ></ArrowBackIcon>
          </Button>
          <Typography sx={{ my:'auto'}}>
            ????????? ????????? ??????
          </Typography>
          <Button onClick={handlePost}>
            ????????????
          </Button>
        </Box>
        <Box sx={{ display: 'flex', height: '92%' }}>
          <Box sx = {{width:'100%',display: 'flex', justifyContent:'center', alignItems:'center'}}>
          {(imageUrl && selectedImage) 
          ? 
            (
              <Box sx={{width:'100%',height:'100%'}}>
                <img src={imageUrl} alt={selectedImage.name} height="100%" width="100%" />
              </Box>
            ) 
          :   <Box>
                <input
                  accept="image/*"
                  type="file"
                  id="select-image"
                  style={{ display: 'none' }}
                  onChange={e => setSelectedImage(e.target.files[0])}
                />
              <label htmlFor="select-image">
                <Button sx={{my:'auto',width:150,height:30}} variant="contained" component="span" className="btn_color">
                  <Typography variant="h7">
                    ??????????????? ??????
                  </Typography>
                </Button>
              </label>
            </Box> 
          }
          </Box>
        </Box>
      </Box>
    </Wrapper>

  );


  return (
    <div>
      {props.userData === params ? <Button
        key={"add"}
        onClick={handleOpen}
        style={{
          minWidth: "150px",
          minHeight: "150px",
          padding: '0 0 0 0px'
        }}>
        {forImage ? (
          <Box sx={{width:'100%',height:'100%'}}>
            <img src={forImage} alt={forImage} height="100%" width="100%" />
          </Box>
        ) : <img alt="????????? ??????" class="profile_image" src="/images/baseimg.jpg"></img> }
        </Button> : 
        <Button
        disabled
        key={"add"}
        onClick={handleOpen}
        style={{
          minWidth: "150px",
          minHeight: "150px",
          padding: '0 0 0 0px'
        }}>
        {forImage ? (
          <Box sx={{width:'100%',height:'100%'}}>
            <img src={forImage} alt={forImage} height="100%" width="100%" />
          </Box>
        ) : <img alt="????????? ??????" class="profile_image" src="/images/baseimg.jpg"></img> }
        </Button>}

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

export default ImageModal;