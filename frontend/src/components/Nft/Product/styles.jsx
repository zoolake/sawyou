import styled from 'styled-components';

const Wrapper = styled.div`
  position: relative;
  top: 80px;

  .items-container {
    display: flex;
    flex-direction: column;
  }

  .product-container {
    width: 1280px;
    margin: 20px auto;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
  }

  .nftproduct {
    width: 50%;
    max-width: 550px;
    margin-left: 100px;
  }

  .nftroot {
    width: 100%;
    max-width: 550px;
    margin: 20px;
  }

  .nftmedia {
    height: 345px;
  }

  .discription {
    width: 1280px;
    margin: 20px auto;
    display: flex;
    align-items: center;
  }


`;

export default Wrapper;
