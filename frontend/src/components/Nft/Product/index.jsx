import React, { useState, useEffect } from 'react';
import Wrapper from './styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button'
import { useParams } from 'react-router';
import {ReadNft,ReadCellNft,CancelSale,BuyNft} from '../../../api/nft';
import Web3 from 'web3';



const Product = () => {
  const [saleInfo, setSaleInfo] = useState('');
  const params = useParams().id;
  const [web3, setWeb3] = React.useState();

  const background = {
    backgroundImage: `url(${saleInfo.nftPictureLink})`,
    width: '150%',
    height: 'calc(100% + 20px)',
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: '50%',
    backgroundSize: 'cover',
    filter: 'blur(12px)'
  }

  useEffect(() => {

    if (typeof window.ethereum != "undefined") {
      try {
        const web = new Web3(window.ethereum);
        setWeb3(web);
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log("ethereum is not defined")
    }

     ReadCellNft(params).then((r) => {
      console.log("saleInfo",r.data.data)
      setSaleInfo(r.data.data);
    })
  },[])





  return (
    <Wrapper>
      <section className="product">
        <div style={background}></div>
        <div className="product__container">
          <div className="product__images">
            <img src={saleInfo.nftPictureLink}></img>
          </div>
        </div>
      </section>
      <div className="standardWrap">
        <div className="detailPage__layout">
          <section className="detailPage__content">
            <h2 className="detailPage__title">{saleInfo.nftTitle}</h2>
            <article className="detailPage__section">
              <div className="detailPage__info">NFT 정보</div>
              <dl className="detailPage__info1 info">
                <dt>소유자</dt>
                <dd>
                  <b>{saleInfo.sellerName}</b>
                </dd>
              </dl>
              <dl className="detailPage__info1 info">
                <dt>컨트랙트 주소</dt>
                <dd className="detailPage__contract">{saleInfo.nftOwnerAddress}</dd>
              </dl>
              <dl className="detailPage__info1 info">
                <dt>토큰 ID</dt>
                <dd>{saleInfo.nftTokenId}</dd>
              </dl>
              <div>
                작품 설명
                <br/>
                <br/>
                <div>
                  {saleInfo.nftDesc}
                </div>
              </div>
            </article>
          </section>
          <section className="detailPage__aside">
            <div className="detailPage__padding">
              <Box
                className="detailPage__price"
                sx={{
                  width: 400,
                  height: 344,
                  backgroundColor: 'white'
                  
                }}
              >
                <dl className="info">
                  <dt className="ether">보유 금액</dt>
                  <dd className="ether">
                    0.5
                    ETH
                  </dd>
                </dl>
                <dl className="info">
                  <dt className="ether">판매가</dt>
                  <dd className="ether">
                    {saleInfo.salePrice} SSF
                  </dd>
                </dl>
                <Button 
                  variant="contained"
                  className="detailPage__button"  
                >
                  구매하기
                </Button>
              </Box>
            </div>


          </section>

        </div>

      </div>



    </Wrapper>
  )
}

export default Product;