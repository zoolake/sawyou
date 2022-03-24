import React from 'react';
import Main from '../../components/Main';
import Wrapper from './styles';
import Navbar from '../../components/Navbar/index';

const MainPage = (props) => {

  return (
    <Wrapper>
      <Navbar></Navbar>
      {/* 현재는 이 방식이지만 추후에 map을 통하여 props를 뿌려주고, 이를 바탕으로 main페이지 여러개 출력(인피니티 스크롤 구현은 논의) */}
      <Main></Main>        
      <Main></Main>   
      <Main></Main>  
    </Wrapper>

  )

}

export default MainPage;