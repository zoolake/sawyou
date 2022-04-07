import React, {useState, useEffect} from 'react';
import Main from '../../components/Main';
import Wrapper from './styles';
import Navbar from '../../components/Navbar/index';
import {ReadAllPost, ReadFollowingPost} from '../../api/list'
import Box from '@mui/material/Box';


const MainPage = (props) => {
  const [post,setPost] = useState('')

  const Read = async () => {
    const res = await ReadFollowingPost().then((res) => setPost(res.data.data));
  };

  useEffect(() => {
    Read();
  },[])

  return (
    <Wrapper>
      {post ? post.map((data) => (
        <Main key={data.postSeq} data={data}></Main>
      )): <Box sx={{display:'flex', justifyContent:'center', mt:10}}><img style={{position:'relative', margin: 'auto'}} src="images/main.png"></img></Box>}       
    </Wrapper>
  )

}

export default MainPage;