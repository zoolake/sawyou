import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  margin-top: 96px;
  margin-bottom: 32px;
  position: relative;
  border: 1px solid #d4d2d2;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.04);
  width: 600px;
  height: 781px;

  .pfhd {
    display: flex;
    align-content: stretch;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
    flex: 0 0 auto;
  }

  .pf {
    display: flex;
    flex-direction: row;
    align-items: center;
    max-width: calc(100% - 48px);
    padding: 14px 4px 14px 16px;
  }

  .id0 {
    flex-shrink: 1;
    margin-left: 12px;
    overflow: hidden;
    flex-grow: 1;
    display: flex;
    align-items: flex-start;
  }

  // .id1 {
  //   align-items: stretch;
  //   border: 0 solid #000;
  //   box-sizing: border-box;
  //   // display: flex;
  //   // flex-direction: column;
  //   // flex-shrink: 0;
  //   // margin: 0;
  //   // padding: 0;
  //   // position: relative;
  //   // font: inherit;
  //   // vertical-align: baseline;
  // }

  .id2 {
    display: flex;
    flex-shrink: 1;
    max-width: 100%;
    overflow: hidden;
    margin: 0;
    padding: 2px;
    top: 1px;
    flex-grow: 1;
    flex-direction: row;
    align-items: center;
    position: relative;
    box-sizing: border-box;
    font: inherit;
    vertical-align: baseline;
  }

  .id3 {
    display: block;
    color: rgba(var(--i1d,38,38,38),1);
    font-weight: 600;
    margin: 0;
    font-size: 14px;
    line-height: 18px;
    font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;
    align-items: stretch;
    border: 0 solid #000;
    box-sizing: border-box;
    padding: 0;
    position: relative;
    flex-shrink: 0;
    flex-direction: column;
    font: inherit;
    vertical-align: baseline;
  }

  .id4 {
    display: inline;
    position: relative;
    margin: 0;
    padding: 0;
    border: 0;
    font: inherit;
    vertical-align: baseline;
    color: rgba(var(--i1d,38,38,38),1);   
  }

  .id5 {
    appearance: none;
    background: 0 0;
    box-sizing: border-box;
    cursor: pointer;
    font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;
    font-size: 14px;
    font-weight: 600;
    text-align: center;
    text-overflow: ellipsis;
    text-transform: inherit;
    width: auto;
    display: inline-block;
    padding: 0;
    position: relative;
    border: 0;
    background-color: transparent;
    user-select: auto;
    color: rgba(var(--f75,38,38,38),1);
    text-decoration: none;
    margin: 0;
    font: inherit;
    vertical-align: baseline;
  }

  .pf-img {
    width: 32px;
    height: 32px;
  }

 
  .btn0 {
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    padding-right: 8px;
  }

  .btn0p {
    display: flex;
    align-items: center;
    background: 0 0;
    border: 0;
    cursor: pointer;
    justify-content: center;
    padding: 8px;
  }

  .btn1 {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .btn2 {
    display: flex;
    align-content: stretch;
    align-items: center;
    justify-content: center;
    flex: 0 0 auto;
    width: 24px;
    height: 24px;
  }
  
  .menu0p {
    display: block;
    position: relative;
  }

  .img0 {
    background-color: rgba(var(--d87,255,255,255),1);
  }

  .img1 {
    touch-action: manipulation;
  }

  .img2 {
    background-color: rgba(var(--bb2,239,239,239),1);
    display: block;
    width: 100%;
    max-height: inherit;
  }

  .img3 {
    display: block;
    overflow: hidden;
    display: flex;
    align-items: stretch;
    border: 0 solid #000;
    box-sizing: border-box;
    flex-shrink: 0;
    margin: 0;
    padding: 0;
    position: relative;
    flex-direction: column;    
  }

  .ulimg {
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    // position: absolute;
  }

  .uc0 {
    display: flex;
    align-content: stretch;
    align-items: stretch;
    justify-content: flex-start;
    flex: 0 0 auto;
  }

  .uc1 {
    pointer-events: auto;
    background-color: rgba(var(--d87,255,255,255),1);
  }

  .uc2 {
    min-width: 335px;
    padding: 0 16px;
    width: 100%;
  }

  .uc3 {
    margin-top: 4px;
    padding-bottom: 8px;
    padding-top: 6px;
    flex-direction: row;
  }

  .uc4 {
    display: inline-block;
    margin-left: -8px;
  }

  .uc5 {
    display: flex;
    justify-content: center;
    padding: 8px;
    align-items: center;
    background: 0 0;
    border: 0;
    cursor: pointer;
  }

  .uc6 {
    display: none;
    align-items: center;
    justify-content: center;
  }

  .li {
    display: block;
    position: relative;
  }



`;

export default Wrapper;