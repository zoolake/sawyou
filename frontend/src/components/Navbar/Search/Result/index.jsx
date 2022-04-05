import React, { useEffect, useState } from 'react';
import Wrapper from './styles';
import { useParams } from 'react-router';
import { makeStyles } from '@material-ui/core';
import Grid from '@mui/material/Grid';
import ListModal from '../../../Profile/ListModal';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { UserPost } from '../../../../api/list';
import { FollowingUser, Profile as Profile2 } from '../../../../api/user';
import { User } from '../../../../States/User';
import { useRecoilValue } from 'recoil';
import { ReadAllNft, ReadAllSaleNft } from '../../../../api/nft';


const Result = (props) => {

  const styles = theme => ({
    Card: {
      width: 300,
      margin: 'auto'
    },
  });

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
    setFollowCheck(res.data.data.following)
  };

  const changeFollow = () => {
    if (followCheck === true){
      setFollowCheck(false)
    } 
    else{
      setFollowCheck(true)
    }
  }

  const handleFollow = async () => {
    const res = await FollowingUser(params).then(changeFollow())
  }


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
  }, []);

  const classes = useStyles();
  const [alignment, setAlignment] = React.useState('1');
  const handleAlignment = (event, newAlignment) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
    }

  const Search = () => {

    return (
      <div>
        <Grid 
          container 
          className={classes.root} 
          spacing={2}
        >            
          {posts && posts.map((post) => (
            <Grid item xs={12} sm={6} md={4}>
              <Card className="card__st">
                <CardMedia className="media__st" key={post.postSeq}>
                  <ListModal item={post}>
                  </ListModal>
                </CardMedia>
              </Card>
            </Grid>
          ))}
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
          </header>
          {alignment === '1' && <Search></Search>}
        </div>
      </main>
    </Wrapper>
  )

}}


export default Result;
