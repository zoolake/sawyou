import styled from 'styled-components';

const Wrapper = styled.div`
  // position: absolute;
  margin: auto;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 345px;
  height: 442.156px;

  .post {
    background-color: white;
    max-width: 500px;
    border: 1px solid lightgrey;
  }
  
  .post_img {
    width: 100%;
    height: 100%;
  } 

  .post_header {
    height: 50px;
    display: flex;
    justify-content: space-between;
    // flex-direction: row;
    align-items: center;
    // align-content: stretch;
    // flex: 0 0 auto;
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
  }

  .post_delete {
    display: flex;
    align-items: flex-end;    
  }

  .post_avatar {
    margin-right: 10px;
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
  }
  
  .post_text {
    margin: 0!important;
    font-weight: 500;
    font-size: 14px;
    line-height: 18px;
    padding-bottom: 4px;
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