import React from 'react';
import Product from '../../../components/Nft/Product';
import Wrapper from './styles';
import Navbar from '../../../components/Navbar';

const ProductPage = (props) => {

  return (
    <Wrapper>
      <Navbar></Navbar>
      <Product></Product>
    </Wrapper>

  )
}

export default ProductPage;