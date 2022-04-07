import styled from 'styled-components';

const Wrapper = styled.div`
  .img2 {
    width: 100%;
    height: 100%;
  }

  .div2 {
    height: 100%;
  }

  .post_text {
    font-weight: 500;
    font-size: 14px;
    line-height: 18px;
    margin: 3% 1%;
  }

  .post_article_comment {
    font-weight: 300;
    align-items: center;
    font-size: 14px;
    margin: 0.5% 2%;
  }

  .post_like {
    align-items: center;
    background: 0 0;
    border: 0;
    cursor: pointer;
    padding: 0; !important;
    font-size: 1.2rem; !important;
  }

  .post__likeCnt {
    margin: 1% 1%;
    font-weight: 600;
    font-size: 14px;
  }
  
  .commentWrap {
    border-top: 1px solid lightgrey;
    display: flex;
    justify-content: space-between;
  }
  
  .cur1 {
    cursor: pointer;
    margin-left: 0;
  }


`;

export default Wrapper;