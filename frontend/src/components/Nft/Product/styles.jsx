import styled from 'styled-components';

const Wrapper = styled.div`
  position: relative;
  top: 62px;

  .product {
    overflow: hidden;
    position: relative;
    text-align: center;
  }

  .product__bg {
    width: 150%;
    height: calc(100% + 20px);
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    background-repeat: no-repeat;
    background-position: 50%;
    background-size: cover;
    filter: blur(12px);
  }

  .product__container {
    text-align: center;
    position: relative;
    padding: 30px 0;
  }

  .product__images {
    margin: 0 auto;
    position: relative;
    display: inline-block;
  }

  .standardWrap {
    margin: 0 auto;
    width: 1280px;
  }

  .detailPage__layout {
    display: flex;
    margin-top: 40px;
  }

  .detailPage__content {
    flex: 1;
  }

  .detailPage__title {
    line-height: 63px;
    margin-top: 24px;
    font-size: 42px;
    font-weight: 700;
  }

  .detailPage__section {
    margin-top: 40px;
  }

  .detailPage__info {
    line-height: 24px;
    font-size: 18px;
    font-weight: 500;
  }

  .detailPage__info1 {
    margin-top: 12px!important;
  }

  .info {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    line-height: 24px;
    margin-top: 18px;
    font-size: 16px;
  }

  .detailPage__contract {
    max-width: 420px;
    white-space: pre-wrap;
    word-wrap: break-word;
  }

  .detailPage__aside {
    width: 562px;
    margin-left: 90px;
  }

  .detailPage__price {
    border: 2px solid #eee;
    border-radius: 4px;
    margin-bottom: 30px;
    padding: 36px 48px;
  }

  .ether {
    font-size: 24px;
    font-weight: 600;
    padding-bottom: 8px;
  }

  .detailPage__padding {
    padding: 36px 48px;
  }

  .detailPage__button {
    margin-top: 10px;
    width: 100%;
    height: 60px;
    line-height: 60px;
    padding: 0 24px;
    background-color: #222;
    border-radius: 4px;
    font-size: 18px;
    font-weight: 700;
    text-align: center;
    color: #fff;
    cursor: pointer;
  }

`;

export default Wrapper;
