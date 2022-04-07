import styled from 'styled-components';

const Wrapper = styled.div`
  position: relative;
  top: 70px;
  
  .img2 {
    width: 100%;
    height: 100%;
  }

  .profile_main {
    flex-grow: 1;
    order: 4;    
  }

  .profile_body {
    padding: 30px 20px 0;
    box-sizing: content-box;
    width: calc(100% - 40px);
    margin-bottom: 0;
    margin: 0 auto 30px;
    max-width: 935px;
  }

  .profile_header {
    margin-bottom: 44px;
    display: flex;
    align-items: center;
  }

  .profile_image_outer { 
    margin-right: 50px;
  }

  .profile_image_mid {
    height: 150px;
    width: 150px;
    margin-left: auto;
    margin-right: auto;
  }

  .profile_image_inner {
    background-color: rgba(var(--b3f,250,250,250),1);
    border-radius: 50%;
    box-sizing: border-box;
    height: 100%;
    margin: 0 auto;
    overflow: hidden;
    position: relative;
    width: 100%;
  }

  .profile_btn {
    border: 0;
    cursor: pointer;
    height: 100%;
    padding: 0;
    width: 100%;
  }

  .profile_image {
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    width: 100%;
  }

  .profile_upload {
    display: none!important;
  }

  .profile_info {
    flex-basis: 30px;
    flex-grow: 2;
    color: rgba(var(--i1d,38,38,38),1);
    flex-shrink: 1;
    min-width: 0;
  }

  .profile_info_header {
    display: flex;
    margin-bottom: 20px;
    align-items: center;
    flex-direction: row;
    flex-shrink: 1;
    min-width: 0;
  }

  .profile_name {
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: rgba(var(--i1d,38,38,38),1);
    font-weight: 300;
    font-size: 28px;
    line-height: 32px;
    margin: -5px 0 -6px;
    font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;
  }

  .profile_edit {
    display: flex;
    align-items: stretch;
    align-content: stretch;
  }

  .edit_outer {
    flex-direction: row;
    flex: 0 1 auto;
    margin-left: 20px;
  }

  .edit_inner {
    justify-content: flex-start;
    flex: 1 1 auto;
    min-height: 0;
    min-width: 0;
  }

  .profile_edit_btn {
    background-color: transparent;
    border: 1px solid rgba(var(--ca6,219,219,219),1);
    color: rgba(var(--f75,38,38,38),1);
    border-radius: 4px;
    position: relative;
    box-sizing: border-box;
    cursor: pointer;
    display: block;
    font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;
    font-size: 14px;
    font-weight: 600;
    padding: 5px 9px;
    text-decoration: none;
  }

  .article_follow {
    margin-bottom: 20px;
    padding-left: 0; !important;
    display: flex;
  }
  
  .af_outer {
    font-size: 16px;
    margin-right: 40px;
  }

  .af_inner {
    display: block;
    color: rgba(var(--i1d,38,38,38),1);
    font-weight: 400;
    margin: 0;
    font-size: 16px;
    line-height: 24px;
    font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;
  }

  .article_nums {
    color: rgba(var(--i1d,38,38,38),1);
    font-weight: 600;z
  }

  ul {
    list-style: none;
  }

  li {
    display: list-item;
  }

  a {
    color: rgba(var(--fe0,0,55,107),1);
    text-decoration: none;
  }

  .si_box {
    display: block;
  }

  .si {
    display: inline!important;
    margin: 0!important;
    color: rgba(var(--i1d,38,38,38),1);
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
    font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;
  }

  .si2 {
    display: inline!important;
    margin: 0!important;
    color: rgba(var(--i1d,38,38,38),1);
    font-size: 16px;
    line-height: 24px;
    font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;
  }

  .card__st {
    width: 300px;
    height: 300px;
  }

  .nft_pr {
    border: 2px solid #7389D0;
  }

  .no_pr {
    box-shadow: 5px 5px 3px 1px #d9d9d9;
  }

`;

export default Wrapper;