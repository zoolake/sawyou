import React from 'react';
import Wrapper from './styles';
import './slick.css';
import './slick-theme.css'
import Box from '@material-ui/core/Box';
import { 
  Card,
  CardActionArea,
  CardHeader,
  CardMedia,
  Avatar,
  Typography,
 } from '@material-ui/core';
import Slider from "react-slick";
// import "slick-carousel/slick/slick.css"; 
// import "slick-carousel/slick/slick-theme.css";


const Market = () => {

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1
  };

  return (
    <Wrapper>
      <div className="nftheader">
        <Box className="nftbox" sx={{width: 345, height:300}}>
          <div>
            <Typography className="headtitle t1" variant="h3" gutterBottom>
              자신만의 NFT를 팔아보세요
            </Typography>
            <Typography variant="h5" gutterBottom>              
              다양하고 독특한 NFT 상품들을 발견하고, 수집하고, 판매하고
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
                  title="Lizard"
                  subheader="Username"              
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
          <Card className="nftroot">
            <CardActionArea>
              <CardMedia
                className="nftmedia"
                image="/images/hallstatt.jpg"
                title="Contemplative Reptile"
              />              
                <CardHeader
                  avatar={
                    <Avatar 
                      aria-label="recipe" 
                      src="/images/baseimg.jpg"
                    />
                  }
                  title="Lizard"
                  subheader="Username"              
                />
            </CardActionArea>
          </Card>
          <Card className="nftroot">
            <CardActionArea>
              <CardMedia
                className="nftmedia"
                image="/images/Zermatt.jpg"
                title="Contemplative Reptile"
              />              
                <CardHeader
                  avatar={
                    <Avatar 
                      aria-label="recipe" 
                      src="/images/baseimg.jpg"
                    />
                  }
                  title="Lizard"
                  subheader="Username"              
                />
            </CardActionArea>
          </Card>
          <Card className="nftroot">
            <CardActionArea>
              <CardMedia
                className="nftmedia"
                image="/images/Chamonix.jpg"
                title="Contemplative Reptile"
              />              
                <CardHeader
                  avatar={
                    <Avatar 
                      aria-label="recipe" 
                      src="/images/baseimg.jpg"
                    />
                  }
                  title="Lizard"
                  subheader="Username"              
                />
            </CardActionArea>
          </Card>
          <Card className="nftroot">
            <CardActionArea>
              <CardMedia
                className="nftmedia"
                image="/images/Tromso.jpg"
                title="Contemplative Reptile"
              />              
                <CardHeader
                  avatar={
                    <Avatar 
                      aria-label="recipe" 
                      src="/images/baseimg.jpg"
                    />
                  }
                  title="Lizard"
                  subheader="Username"              
                />
            </CardActionArea>
          </Card>
          <Card className="nftroot">
            <CardActionArea>
              <CardMedia
                className="nftmedia"
                image="/images/Rovaniemi.jpg"
                title="Contemplative Reptile"
              />              
                <CardHeader
                  avatar={
                    <Avatar 
                      aria-label="recipe" 
                      src="/images/baseimg.jpg"
                    />
                  }
                  title="Lizard"
                  subheader="Username"              
                />
            </CardActionArea>
          </Card>
          <Card className="nftroot">
            <CardActionArea>
              <CardMedia
                className="nftmedia"
                image="/images/Reykjavik.jpg"
                title="Contemplative Reptile"
              />              
                <CardHeader
                  avatar={
                    <Avatar 
                      aria-label="recipe" 
                      src="/images/baseimg.jpg"
                    />
                  }
                  title="Lizard"
                  subheader="Username"              
                />
            </CardActionArea>
          </Card>
        </Slider>         
      </div>
    </Wrapper>
  )
}

export default Market;