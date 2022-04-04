import React, { useEffect, useState } from 'react';
import Wrapper from './styles';
import { useParams } from 'react-router';
import { ImageList, ImageListItem, makeStyles } from '@material-ui/core';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import ListModal from './ListModal/index'
import NftModal from './NftModal/index'
import OnSaleModal from './OnSaleModal/index'
import FollowerModal from './FollowerModal/index'
import FollowModal from './FollowModal/index'
import { UserPost } from '../../api/list';
import { Profile as Profile2 } from '../../api/user';
import { User } from '../../States/User';
import { useRecoilValue } from 'recoil';
import { ReadAllNft, ReadAllSaleNft } from '../../api/nft';


const Profile = (props) => {

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

  const user = useRecoilValue(User);
  const params = useParams().id;
  const [posts, setPosts] = useState('');
  const [nfts, setNfts] = useState('');
  const [sales, setSales] = useState('');
  const [userData, setUserData] = useState('');
  const [myProfile, setMyProfile] = useState('');
  const [followCheck, setFollowCheck] = useState('');

  // 내 게시글 조회
  const getPosts = async () => {
    const response = await UserPost(params).then((res) => { setPosts(res.data.data)});
    
  }

  const getProfile = async () => {
    const res = await Profile2(params)
    setUserData(res.data.data)
  };


  // 보유한 NFT 조회
  const getNfts = async () => {
    const response = await ReadAllNft(params).then((res) => { setNfts(res.data.data)});
}

  // 판매중인 NFT 조회
  const getSales = async () => {
    const response = await ReadAllSaleNft(params).then((res) => { setSales(res.data.data)});
  }


  // 첫 렌더링 1회 진행
  useEffect(() => {
    getPosts();
    getProfile();
    if (user === params){
      setMyProfile(true)
    }
    else {
      setMyProfile(false)
    }

    if (userData.isFollowing === true){
      setFollowCheck(true)
    }
    else{
      setFollowCheck(false)
    }
  }, []);

  const classes = useStyles();
  const [alignment, setAlignment] = React.useState('1');
  const handleAlignment = (event, newAlignment) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
    }

    // 문제점: 탭을 반복해서 이동시 매번 API 요청을 보낸다.
    if (newAlignment === '2') {
      // 보유한 NFT 함수 호출
      getNfts();
    }

    if (newAlignment === '3') {
      // 판매중인 NFT 함수 호출
      getSales();
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
                <ImageListItem className="myimg" key={post.postSeq}>
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
              {nfts ? nfts.map((nft) => (
                <ImageListItem className="myimg" key={nft.nftSeq}>
                  <NftModal  item={nft}>
                  </NftModal>
                </ImageListItem>
              )) : <span>보유한 NFT가 없습니다.</span>}
            </ImageList>
          </Grid>
        </Grid>
      </div>
    )
  }

  const Sale = () => {

    return (
      <div>
        <Grid container className={classes.root} spacing={2}>
          <Grid item xs={12}>
            <ImageList cols={3} gap={16}>
              {sales ? sales.map((sale) => (
                <ImageListItem className="myimg" key={sale}>
                  <OnSaleModal  item={sale}>
                  </OnSaleModal>
                </ImageListItem>
              )) : <span>판매중인 NFT가 없습니다.</span>}
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
                    {myProfile === true ?  <a class="profile_edit_btn" href="/profileedit" tabIndex="0">프로필 편집</a>
                    : followCheck === true ? <Button variant="contained" >팔로우 해제</Button> : <Button variant="contained" >팔로우</Button>}
                  </div>
                </div>
              </div>
              <ul class="article_follow">
               <Button
                  sx={{justifyContent:'left'}}
                  style={{
                    font: "16px",
                    color : "black",
                    minWidth: "100px",
                    minHeight: "24px",
                    padding: "0 0 0 0px"
                  }}>
                  <Typography>게시글 0</Typography>
                </Button>
                  <FollowerModal item={userData}></FollowerModal>
                <li class="af_outer">
                  <FollowModal item={userData}></FollowModal>
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
          {alignment === '3' && <Sale></Sale>}
        </div>
      </main>
    </Wrapper>
  )
}

export default Profile;
