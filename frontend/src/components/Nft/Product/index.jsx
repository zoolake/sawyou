import React from 'react';
import Wrapper from './styles';
import { 
  Card,
  CardActionArea,
  CardHeader,
  CardMedia,
  Avatar,
  Divider,
  Button,
  ListSubheader,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,  
} from '@mui/material';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


const Product = () => {
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <Wrapper>
      <div className="items-container">
        <div className="product-container">
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
            <List
              component="nav"
              aria-labelledby="nested-list-subheader"
              subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                  상품 상세 정보
                </ListSubheader>
              }
              className=""
            >
              <ListItem button>
                {/* <ListItemIcon>
                  <DehazeIcon />
                </ListItemIcon> */}
                <ListItemText primary="Description" />
              </ListItem>
              <ListItem button>
                {/* <ListItemIcon>
                  <DraftsIcon />
                </ListItemIcon> */}
                <ListItemText primary="Properties" />
              </ListItem>
              <ListItem button onClick={handleClick}>
                {/* <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon> */}
                <ListItemText primary="Detail" />
                {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </ListItem>
              <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItem button className="">
                    {/* <ListItemIcon>
                      <StarBorder />
                    </ListItemIcon> */}
                    <ListItemText primary="Starred" />
                  </ListItem>
                </List>
              </Collapse>
            </List>
          </div>
          <List component="nav" className="" aria-label="mailbox folders">
            <ListItem button>
              <ListItemText primary="Inbox" />
            </ListItem>
            <Divider />
            <ListItem button divider>
              <ListItemText primary="Drafts" />
            </ListItem>
            <ListItem button>
              <ListItemText primary="Trash" />
            </ListItem>
            <Divider light />
            <ListItem button>
              <ListItemText primary="Spam" />
            </ListItem>
          </List>
        </div>
      </div>

    </Wrapper>
  )
}

export default Product;