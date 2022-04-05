import React from 'react';
import Wrapper from './styles';
import Navbar from '../../components/Navbar'
import Result from '../../components/Navbar/Search/Result'


const SearchResultPage = (props) => {

  return (
    <Wrapper>
      <Navbar></Navbar>
      <Result></Result>
    </Wrapper>

  )
}

export default SearchResultPage;