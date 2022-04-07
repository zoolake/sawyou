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
import ListModal from '../../../Profile/ListModal/index'
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';

import { HashTagPost } from '../../../../api/list';

const Profile = (props) => {

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

  const params = useParams().tags;

  const [posts, setPosts] = useState('');

  const Read = async () => {
    // const body = {
    //   keyword : params
    // }
    const response = await HashTagPost(params).then((res) => { setPosts(res.data.data)});    
  }

  // 첫 렌더링 1회 진행
  useEffect(() => {
    Read();
  }, [params]);


  const classes = useStyles();

  const My = () => {

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
                    {(posts && posts) ?  <img alt="프로필 사진" class="profile_image" src={posts[0].postPictureLink}></img> :                     <img alt="프로필 사진" class="profile_image" src="/images/baseimg.jpg"></img>}
                  </button>
                  <div>
                    <form encType="multipart/form-data" method="POST" role="presentation">
                      <input accept="image/jpeg,image/png" class="profile_upload" type="file" />
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div> 
              <Typography variant='h5'> #{params}</Typography>
            </div>

          </header>
          <My></My>
        </div>
      </main>
    </Wrapper>
  )
}

export default Profile;
