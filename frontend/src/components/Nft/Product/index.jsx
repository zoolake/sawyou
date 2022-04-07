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
import { CircularProgress } from '@mui/material';
import Swal from "sweetalert2";



const Product = () => {
  const [saleInfo, setSaleInfo] = useState('');
  const params = useParams().id;
  const [web3, setWeb3] = React.useState();
  const wallet = useRecoilValue(Wallet);
  const [balance, setBalance] = useState('0');
  const userId = useRecoilValue(User);
  const [isPurchaseLoaded, setIsPurchaseLoaded] = useState('');
  const [isSuccess, setIsSuccess] = useState('');

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
    setIsSuccess(false);
  }, [])



  const handlePurchaseButtonClick = async () => {

    setIsPurchaseLoaded(true);

    try {
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
      Swal.fire({
        title: ' Error ',
        text: '구매에 성공하였습니다. ✨',
        icon: 'error',
        confirmButtonText: '확인',
      })
      setIsSuccess(true);
    }

    catch (error) {
      Swal.fire({
        title: ' Error ',
        text: '구매에 실패하였습니다. 😢',
        icon: 'error',
        confirmButtonText: '확인',
      })
      console.log("error:", error);
      setIsSuccess(false);
    }

    finally {
      setIsPurchaseLoaded(false);
    }
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
              <div className="detailPage__info" style={{ fontWeight: 500, fontSize: "2rem", marginBottom: "20px" }}>NFT 정보</div>
              <hr style={{ fontWeight: 200, fontSize: "2px" }}></hr>
              <dl className="detailPage__info1 info">
                <dt style={{fontWeight: 600}}>소유자</dt>
                <dd>
                  {saleInfo.sellerName}
                </dd>
              </dl>
              <dl className="detailPage__info1 info">
                <dt style={{fontWeight: 600}}>컨트랙트 주소</dt>
                <dd className="detailPage__contract">{saleInfo&&saleInfo.saleContractAddress.slice(0,4)}...{saleInfo&&saleInfo.saleContractAddress.slice(-4)}</dd>
              </dl>
              <dl className="detailPage__info1 info">
                <dt style={{fontWeight: 600}}>토큰 ID</dt>
                <dd>{saleInfo.nftTokenId}</dd>
              </dl>
              <div style={{fontWeight: 600}}>
                작품 설명
                <br />
                <br />
                <div style={{fontWeight: 400}}>
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
                  height: 280,
                  backgroundColor: 'white'
                }}
              >
                <dl className="info">
                  <dt className="ether" >보유 금액</dt>
                  <dd className="ether">
                    {balance} SSF
                  </dd>
                </dl>
                <dl className="info">
                  <dt className="ether">판매가</dt>
                  <dd className="ether">
                    {saleInfo.salePrice} SSF
                  </dd>
                </dl>
                {
                  wallet === null ?
                    <Button
                      variant="contained"
                      className="detailPage__button"
                      color="warning"
                    >
                      지갑 연동 후 이용이 가능합니다.
                    </Button>:
                    isPurchaseLoaded ?
                      <Box sx={{ textAlign: 'center', pt: 7 }}><CircularProgress /></Box> : isSuccess ?
                        <Button
                          variant="contained"
                          color="warning"
                          className="detailPage__button"
                          onClick={handlePurchaseButtonClick}
                        >
                          구매가 완료되었습니다
                        </Button> :
                        <Button
                          variant="contained"
                          className="detailPage__button"
                          onClick={handlePurchaseButtonClick}
                        >
                          구매하기
                        </Button>
                }
                {
                  wallet === null ?
                  " ":
                  !isPurchaseLoaded &&
                  <Button variant="contained"
                    className="detailPage__button"
                    onClick={getBalance} >잔액조회
                  </Button>
                }
              </Box>
            </div>


          </section>

        </div>

      </div >



    </Wrapper >
  )
}

export default Product;