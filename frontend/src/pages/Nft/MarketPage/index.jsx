import React from 'react';
import Market from '../../../components/Nft/Market';
import Wrapper from './styles';
import Navbar from '../../../components/Navbar';

const MarketplacePage = (props) => {

  return (
    <Wrapper>
      <Navbar></Navbar>
      <Market></Market>
    </Wrapper>

  )
}

export default MarketplacePage;