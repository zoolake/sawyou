import React from 'react';
import Wrapper from './styles';
import './slick.css';
import './slick-theme.css'
import { ReadSaleNftTop10 } from '../../../api/nft'
import { Profile } from '../../../api/user'
import Slider from "react-slick";
import { Box, Card, CardActionArea, CardHeader, CardMedia, CardContent, Avatar, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';


const Market = () => {
  const [nfts, setNft] = React.useState();
  const navigate = useNavigate();
  React.useEffect(() => {
    ReadSaleNftTop10().then(({data}) => {

      setNft(data.data);
    })  
  }, []);

  const onClickRedirectPathHandler = (nftSeq) => {
    window.scrollTo(0, 0);
    navigate(`/nft/${nftSeq}`);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1
  };

  return (
    <Wrapper>
      <div className="nftheader">
        <Box className="nftbox" sx={{width: 400, height:300}}>
          <div>
            <Typography className="headtitle2 t1" variant="h3" gutterBottom>
              자신만의 NFT를 소유해 보아요
            </Typography>
            <br></br>
            <br></br>
            <br></br>
            <Typography variant="h5" gutterBottom>              
            마음에 드는 NFT 상품을 찾고 구매하여 수집해보세요
            </Typography>
          </div>
        </Box>
        <div className="nftproduct"> 
          <Card className="nftroot">
            <CardActionArea>
              <CardMedia
                className="nftmedia"
                image="/images/Aurora.jpg"
                title="Contemplative Reptile"
              />              
                <CardHeader
                  avatar={
                    <Avatar 
                      aria-label="recipe" 
                      src="/images/baseimg.jpg"
                    />
                  }
                  title="I SAW YOU"
                  subheader="50 SSF"              
                />
            </CardActionArea>
          </Card>
        </div>  
      </div>
      <div className="notable">
        <Typography className="headtitle t2" variant="h5" gutterBottom>              
          주목할만한 NFTs
        </Typography>
        <Slider {...settings}>  
          {
            nfts && nfts.map((nft) => (
              
                <Card className="nftroot">
                <CardActionArea onClick={event=>{onClickRedirectPathHandler(nft.nftSeq)}} >
                  <CardMedia
                    
                    className="nftmedia"
                    image={nft.nftPictureLink}
                    title={nft.sellerId}
                  />              
                    <CardHeader
                      avatar={
                        <Avatar 
                          aria-label="recipe" 
                          src={nft.sellerProfile}
                        />
                      }
                      title={nft.sellerName}
                      subheader={nft.salePrice + " SSF"}        
                    />
                </CardActionArea>
              </Card>
            ))
          }
        </Slider>         
      </div>
    </Wrapper>
  )
}

export default Market;