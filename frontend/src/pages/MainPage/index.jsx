import React, {useState, useEffect} from 'react';
import Main from '../../components/Main';
import Wrapper from './styles';
import Navbar from '../../components/Navbar/index';
import {ReadAllPost} from '../../api/list'


const MainPage = (props) => {
  const [post,setPost] = useState('')
  const a = 456

  const Read = async () => {
    const res = await ReadAllPost().then((res) => setPost(res.data.data));
  };

  useEffect(() => {
    Read();
  },[])

  return (
    <Wrapper>
      <Navbar></Navbar>
      {/* 현재는 이 방식이지만 추후에 map을 통하여 props를 뿌려주고, 이를 바탕으로 main페이지 여러개 출력(인피니티 스크롤 구현은 논의) */}
      {/* {post && <div>{post[0].postContent}</div>} */}
      {post && post.map((data) => (
        <Main data={data}></Main>
      ))}       
    </Wrapper>
  )

}

export default MainPage;