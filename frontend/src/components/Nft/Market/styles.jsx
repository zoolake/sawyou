import styled from 'styled-components';
import Slider from "react-slick";

const Wrapper = styled.div`
  position: relative;
  top: 80px;

  .nftheader {
    width: 100%;
    max-width: min(1400px, 100% - 40px);
    margin: 20px auto;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-evenly;
  }

  .nftbox {
    width: 50%;
    padding: 110px 50px 44px 0px;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
  }

  .headtitle {
    line-height: 110%;
    font-family: Poppins, sans-serif;
    font-weight: 600;
  }
  .headtitle2 {
    width : 690px;
    line-height: 110%;
    font-family: Poppins, sans-serif;
    font-weight: 600;
  }

  .t1 {
    text-align: left;
  }

  .t2 {
    text-align: center;
    margin: 30px;
  }

  .nftproduct {
    width: 50%;
    max-width: 550px;
    margin-left: 30px;
  }

  .nftroot {
    width: 100%;
    max-width: 550px;
  }

  .nftmedia {
    height: 345px;
  }

  .notable {
    margin-left: 60px;
  }

`;

export default Wrapper;
