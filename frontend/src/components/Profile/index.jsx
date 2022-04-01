import React, { useEffect } from 'react';
import Wrapper from './styles';
import { ImageList, ImageListItem, makeStyles } from '@material-ui/core';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import ListModal from './ListModal/index'
import NftModal from './NftModal/index'
import { UserPost } from '../../api/list';


const Profile = () => {

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      height: 140,
      width: 100,
    },
    control: {
      padding: theme.spacing(2),
    },
  }));

  const [posts, setPosts] = React.useState();

  useEffect(() => {
    UserPost("ccc").then((res) => {
      setPosts(res.data.data);
    });
  }, []);

  const itemData = [
    {
      img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
      title: 'Breakfast',
    },
    {
      img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
      title: 'Burger',
    },
    {
      img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
      title: 'Camera',
    },
    {
      img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
      title: 'Coffee',
    },
    {
      img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
      title: 'Hats',
    },
    {
      img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
      title: 'Honey',
    },
    {
      img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
      title: 'Basketball',
    },
    {
      img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
      title: 'Fern',
    },
    {
      img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
      title: 'Mushrooms',
    },
    {
      img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
      title: 'Tomato basil',
    },
    {
      img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
      title: 'Sea star',
    },
    {
      img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
      title: 'Bike',
    },
  ]

  const itemData2 = [
    {
      img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
      title: 'Burger',
    },
    {
      img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
      title: 'Breakfast',
    },
    {
      img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
      title: 'Camera',
    },
    {
      img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
      title: 'Tomato basil',
    },
    {
      img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
      title: 'Sea star',
    },
    {
      img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
      title: 'Bike',
    },
    {
      img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
      title: 'Honey',
    },
    {
      img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
      title: 'Basketball',
    },
  ]

  // const [spacing, setSpacing] = React.useState(2);
  const classes = useStyles();
  const [alignment, setAlignment] = React.useState('1');


  const handleAlignment = (event, newAlignment) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
    }
  };

  // const handleChange = (event) => {
  //   setSpacing(Number(event.target.value));
  // }

  const My = () => {

    return (
      <div>
        <Grid container className={classes.root} spacing={2}>
          <Grid item xs={12}>
            <ImageList cols={3} gap={16}>
              {posts && posts.map((post) => (
                <ImageListItem className="myimg" key={post}>
                  <ListModal item={post}>
                  </ListModal>
                </ImageListItem>
              ))}
            </ImageList>
          </Grid>
        </Grid>
      </div>
    )
  }

  const Nft = () => {

    return (
      <div>
        <Grid container className={classes.root} spacing={2}>
          <Grid item xs={12}>
            <ImageList cols={3} gap={16}>
              {itemData2.map((item) => (
                <ImageListItem className="myimg">
                  <NftModal key={item.img} item={item}>
                  </NftModal>
                </ImageListItem>
              ))}
            </ImageList>
          </Grid>
        </Grid>
      </div>
    )
  }

  return (
    <Wrapper>
      <main class="profile_main" role="main">
        <div class="profile_body">
          <header class="profile_header">
            <div class="profile_image_outer">
              <div class="profile_image_mid">
                <div class="profile_image_inner">
                  <button class="profile_btn">
                    <img alt="프로필 사진" class="profile_image" src="/images/baseimg.jpg"></img>
                  </button>
                  <div>
                    <form encType="multipart/form-data" method="POST" role="presentation">
                      <input accept="image/jpeg,image/png" class="profile_upload" type="file" />
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <section class="profile_info">
              <div class="profile_info_header">
                <h2 class="profile_name">asdf123</h2>
                <div class="profile_edit edit_outer">
                  <div class="profile_edit edit_inner">
                    <a class="profile_edit_btn" href="/profileedit" tabIndex="0">프로필 편집</a>
                  </div>
                </div>
              </div>
              <ul class="article_follow">
                <li class="af_outer">
                  <div class="af_inner">
                    게시물
                    <span class="nums"> 0</span>
                  </div>
                </li>
                <li class="af_outer">
                  <a href="/userId/followers/" tabIndex="0">
                    <div class="af_inner">
                      팔로워
                      <span class="nums"> 0</span>
                    </div>
                  </a>
                </li>
                <li class="af_outer">
                  <a href="/userId/following/" tabIndex="0">
                    <div class="af_inner">
                      팔로우
                      <span class="nums"> 0</span>
                    </div>
                  </a>
                </li>
              </ul>
              <div class="si_box">
                <span class="si">Kim</span>
                <br />
              </div>
            </section>
          </header>
          <Box
            sx={{ display: 'flex', borderTop: 1, borderColor: 'grey.300', height: 50, mb: 3 }}>
            <ToggleButtonGroup
              value={alignment}
              exclusive
              onChange={handleAlignment}
              size={'small'}
              sx={{ mx: "auto", width: '40%' }}
            >
              <ToggleButton value="1" aria-label="left aligned"
                sx={{ width: '33%', border: 0 }}>
                내 게시글
              </ToggleButton>
              <ToggleButton value="2" aria-label="centered" sx={{ width: '33%', border: 0 }}>
                소유한 NFT
              </ToggleButton>
              <ToggleButton value="3" aria-label="right aligned" sx={{ width: '33%', border: 0 }}>
                판매중 NFT
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>
          {alignment === '1' && <My></My>}
          {alignment === '2' && <Nft></Nft>}
          {alignment === '3' && <Nft></Nft>}
        </div>
      </main>
    </Wrapper>
  )
}

export default Profile;
