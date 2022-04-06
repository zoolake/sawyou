import React, { useState, useEffect } from 'react';
import Wrapper from './styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button'
import { useParams } from 'react-router';
import { ReadCellNft, BuyNft } from '../../../api/nft';
import SsafyToken from '../../../abi/SsafyToken.json';
import { Wallet } from '../../../States/Wallet';
import { User } from '../../../States/User';
import { useRecoilValue } from 'recoil';
import Sale from '../../../abi/Sale.json';
import Web3 from 'web3';




const Product = () => {
  const [saleInfo, setSaleInfo] = useState('');
  const params = useParams().id;
  const [web3, setWeb3] = React.useState();
  const wallet = useRecoilValue(Wallet);
  const [balance, setBalance] = useState('');
  const userId = useRecoilValue(User);
  const [isPurchaseLoaded, setIsPurchaseLoaded] = useState('');

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
      console.log("saleInfo", r.data.data)
      setSaleInfo(r.data.data);
    })
    // getBalance();
  }, [])



  const handlePurchaseButtonClick = async () => {

    setIsPurchaseLoaded(true);
    console.log("saleContractAddress : ", saleInfo)
    const saleContractAddress = saleInfo.saleContractAddress;

    const salePrice = saleInfo.salePrice;
    console.log("salePrice : ", saleInfo.salePrice)

    const erc20Contract = await new web3.eth.Contract(
      SsafyToken.abi,
      "0x6C927304104cdaa5a8b3691E0ADE8a3ded41a333"
    );

    const saleContract = await new web3.eth.Contract(Sale.abi, saleContractAddress);

    const approve = await erc20Contract.methods.approve(saleContractAddress, salePrice).send({ from: wallet });

    const purchase = await saleContract.methods.purchase().send({ from: wallet });

    // send purchaseinfo to backend
    const buyNft = await BuyNft({
      "nftSeq": params,
      "nftOwnerAddress": wallet
    });

    setIsPurchaseLoaded(false);
  }

  const getBalance = async () => {
    // 잔액 확인을 위해 ERC-20 Contract 사용
    const erc20Contract = await new web3.eth.Contract(SsafyToken.abi, "0x6C927304104cdaa5a8b3691E0ADE8a3ded41a333");
    const temp = await erc20Contract.methods.balanceOf(wallet).call();
    setBalance(temp);
  }


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
          <section className="detailPage__aside">
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
                <br />
                <br />
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
                  height: 230,
                  backgroundColor: 'white'

                }}
              >
                <dl className="info">
                  <dt className="ether">보유 금액</dt>
                  {
                    balance === '' ?
                      <Button onClick={getBalance}>잔액 조회하기</Button> :
                      <dd className="ether">
                        {balance} SSF
                      </dd>
                  }
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
                  onClick={handlePurchaseButtonClick}
                  sx={{ mt: 50 }}
                >
                  구매하기
                </Button>
              </Box>
            </div>


          </section>

        </div>

      </div >



    </Wrapper >
  )
}

export default Product;