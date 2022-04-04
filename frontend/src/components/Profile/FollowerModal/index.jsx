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
import {ReadFollowerUser} from "../../../api/user"
import CloseIcon from '@mui/icons-material/Close';
import { SettingsInputAntennaTwoTone } from '@mui/icons-material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '400px',
  height: '400px',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  borderRadius : 6,
  boxShadow: 24,
  p: 1,
  display: 'flex',
  flexDirection: 'column',
  overflow: 'auto',
};

const Postmodal = (props) => {
  const [open, setOpen] = React.useState(false);
  const data = props.item;
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [follower, setFollower] = useState('');

  useEffect(() => {
    Read()
    console.log(data)
  }, [open]);

  const Read = async () => {
    const res = await ReadFollowerUser(data.userSeq).then((res) => setFollower(res.data.data))
  }



  const newpost = (
    <Box sx={style}
    component="form"
    >
        <Box
          sx = {{height:'5%', display: 'flex', justifyContent:'space-between'}}
        >
        <Box
          sx={{ color : 'black' }}>
        </Box>
        <Typography sx={{ my:'auto'}}>
          팔로워
        </Typography>
        <Button onClick={handleClose}
          sx={{ color : 'black' ,minWidth:'30px'}}
          style={{padding: '0px'}}>
          <CloseIcon></CloseIcon>
        </Button>
      </Box>
      <Button sx={{justifyContent:'left'}}>
        <img class="img2" src="/images/baseimg_nav.jpg" />
        <Box sx={{ml:2}}><Typography>test</Typography></Box>
      </Button>
      {follower && follower.map((item) =>
        <Button sx={{justifyContent:'left'}}>
        <img class="img2" src="/images/baseimg_nav.jpg" />
        <Box sx={{ml:2}}><Typography>{item.userId}</Typography></Box>
      </Button>)
      }

    </Box>
  );
  return (
    <div>
      <Button
        sx={{justifyContent:'left'}}
        key={"add"}
        onClick={handleOpen}
        style={{
          font: "16px",
          color : "black",
          minWidth: "100px",
          minHeight: "24px",
          padding: "0 0 0 0px"
        }}>
          <Typography>팔로워 {data.followerCnt}</Typography>
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