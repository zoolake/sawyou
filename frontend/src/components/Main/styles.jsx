import styled from 'styled-components';

const Wrapper = styled.div`
  position: relative;
  margin: auto;
  top: 80px;
  bottom: 0;
  left: 0;
  right: 0;
  width: 600px;
  height: auto;

  .post {
    background-color: white;
    max-width: 600px;
    border: 1px solid lightgrey;
    margin-bottom: 24px;
  }
  
  .post_img {
    width: 600px;
    height: 600px;
  } 

  .post_header {
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-right: 10px;
  }

  .post_pfuser {
    display: flex;
    align-items: center;
    padding: 10px;
  }

  .post_user {
    display: flex;
    align-items: flex-start;
    cursor: pointer;
  }

  .post_avatar {
    margin-right: 10px;
    cursor: pointer;
  }

  .post_like {
    align-items: center;
    background: 0 0;
    border: 0;
    cursor: pointer;
    padding: 0; !important;
    font-size: 1.2rem; !important;
  }

  .post_article {
    min_width: 335px;
    padding: 0 8px;
    width: 100%;
  }
  
  .post_article_comment {
    flex: 0 0 auto;
    margin-bottom: 12px;
    min-height: 0;
    height: auto;
  }
  
  .post_text {
    margin: 0!important;
    font-weight: 500;
    font-size: 14px;
    line-height: 18px;
  }

  .post_user_comment {
    display: flex;!important;
    font-weight: 400;!important;
    align-items: center;!important;
    line-height: 1px;!important;
  }

  .commentWrap {
    border: 1px solid lightgrey;
    display: flex;
    justify-content: space-between;
  }

  .commentInput {
    border: 0;
    width: 85%;
    padding-left: 8px;
  }

  .commentUploadBtnActive {
    color: #0095f6;
    padding-right: 8px;
  }

  .commentUploadBtnDeactive {
    color: #b2dffc;
    padding-right: 8px;
  }


`;

export default Wrapper;