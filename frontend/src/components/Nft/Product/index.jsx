import React from 'react';
import Wrapper from './styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button'

const Product = () => {


  return (
    <Wrapper>
      <section className="product">
        <div className="product__bg"></div>
        <div className="product__container">
          <div className="product__images">
            <img src="/images/neuschwanstein.jpg"></img>
          </div>
        </div>
      </section>
      <div className="standardWrap">
        <div className="detailPage__layout">
          <section className="detailPage__content">
            <h2 className="detailPage__title">노이슈반슈타인 성</h2>
            <article className="detailPage__section">
              <div className="detailPage__info">NFT 정보</div>
              <dl className="detailPage__info1 info">
                <dt>소유자</dt>
                <dd>
                  <a className="" href="">
                    <b>User</b>
                  </a>
                </dd>
              </dl>
              <dl className="detailPage__info1 info">
                <dt>컨트랙트 주소</dt>
                <dd className="detailPage__contract">0x123456</dd>
              </dl>
              <dl className="detailPage__info1 info">
                <dt>토큰 ID</dt>
                <dd>270</dd>
              </dl>
              <div>
                작품 설명
                <br/>
                <br/>
                <div>
                노이슈반슈타인성(독일어: Schloß/Schloss Neuschwanstein)은 바이에른의 왕 루트비히 2세가 지은 로마네스크 양식의 성이다. 
                '신 백조 석성'(新白鳥石城)의 의미이다. 
                독일 바이에른주 퓌센(Füssen) 근교의 호엔슈방가우(Hohenschwangau)에 위치한다. 
                루트비히 2세가 음악가 리하르트 바그너의 오페라를 보고 큰 감명을 받아 지었으며, 필요한 자금은 국고에서 충당하지 않고 대부분 왕실 자금을 털어 지었다.
                <br/>
                노이슈반슈타인성은 1886년에 루트비히 2세가 죽기 전까지 왕의 궁전으로 쓰일 용도로 지어졌으며, 그가 죽은 지 얼마 되지 않아 대중들에게 개방되었다. 
                매년 130만 명에 달하는 관광객들이 이 성을 찾아오며, 특히 여름에는 거의 매일 6,000여 명이 이 성을 관람한다.
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
                    0.5
                    ETH
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