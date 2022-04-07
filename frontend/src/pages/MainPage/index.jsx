import React, {useState, useEffect} from 'react';
import Main from '../../components/Main';
import { ReadFollowingPost } from '../../api/list'
import Box from '@mui/material/Box';
import Wrapper from './styles';


const MainPage = (props) => {
  const [post,setPost] = useState('')
  const [loading,setLoading] = useState(true)


  const Read = async () => {
    const res = await ReadFollowingPost().then((res) => setPost(res.data.data), setLoading(false))

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