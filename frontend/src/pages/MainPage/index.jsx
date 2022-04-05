import React, {useState, useEffect} from 'react';
import Main from '../../components/Main';
import Wrapper from './styles';
import Navbar from '../../components/Navbar/index';
import {ReadAllPost} from '../../api/list'


const MainPage = (props) => {
  const [post,setPost] = useState('')

  const Read = async () => {
    const res = await ReadAllPost().then((res) => setPost(res.data.data));
  };

  useEffect(() => {
    Read();
  },[])

  return (
    <Wrapper>
      <Navbar></Navbar>
      {post && post.map((data) => (
        <Main key={data.postSeq} data={data}></Main>
      ))}       
    </Wrapper>
  )

}

export default MainPage;