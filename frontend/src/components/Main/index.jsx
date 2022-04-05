import React, { useEffect, useState } from 'react';
import Wrapper from './styles';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Typography from '@mui/material/Typography';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import {LikePost, WriteComment, ReadCommnet} from '../../api/post'
import InputBase from "@mui/material/InputBase";



const Main = (props) => {
  const [comment, setComment] = useState('');
  const [commentArray, setCommentArray] = useState([]);
  const [isValid, setIsValid] = useState(true);
  const onChange = event => setComment(event.target.value);
  const [imgurl, setImgurl] = useState([''])
  const [like, setLike] = useState(props.data.postIsLike)
  const [dataComment, setDataComment] = useState('');

  const handelLike = (e) => {
    sendLike()
    if (like === true){
      setLike(false)
    }
    else {
      setLike(true)
    }
  }

  const sendLike = async() => {
    const res = await LikePost(props.data.postSeq)
  }

  const getComment = async() => {
    const res = await ReadCommnet(props.data.postSeq)
    setDataComment(res.data.data)
    console.log(res)
  }
  

  const onSubmit = event => {
    event.preventDefault();
    if (comment.trim() === '') {
      return;
    }

    const body = {
      commentContent : comment
    }
    WriteComment(props.data.postSeq, body).then(
      getComment(),
      setComment('')
    )
  };

  useEffect(() => {
    getComment()
  }, []);

  return (
    <Wrapper>
      <div className="post">
        <div className="post_header">
          <div className="post_pfuser">
            <div>
              {props.data.userProfile 
                ? <Avatar className="post_avatar" alt="User" src={props.data.userProfile}/> 
                : <Avatar className="post_avatar" alt="User" src="/images/baseimg.jpg"/>}
            </div>
            <div className="post_user">
              <h4>{props.data.userId}</h4>
            </div>
          </div>
        </div>
        <img className="post_img" src={props.data.postPictureLink}></img>
        <div className="post_article">
          {like === true ?       
            <Button onClick={handelLike}sx = {{minWidth:'24px'}} style={{padding:'0px'}}>     
            <FavoriteIcon 
              className="post_like"
              sx = {{color:'black'}}
            />
            </Button> :
            <Button onClick={handelLike}sx = {{minWidth:'24px'}} style={{padding:'0px'}}>        
            <FavoriteBorderIcon 
              className="post_like"
              sx = {{color:'black'}}
            />
            </Button>
          }
          <div className="post_article_comment">
            <div>
              <h4 className="post_text"><strong>{props.data.userId}</strong><span>&nbsp;</span>{props.data.postContent}</h4>
            </div>
            <div className="post_comment">
              {dataComment && dataComment.map((data) => 
                <h4 className="post_user_comment"><strong>{data.userId}</strong><span>&nbsp;</span>{data.commentContent}</h4>
              )}
            </div>
          </div>
        </div>
        <div className="commentContainer" >
          <form className="commentWrap">
            <InputBase
              placeholder="내용 입력"
              onChange={onChange}
              sx={{width:'90%', ml:1}}
              value={comment}
            />
            <Button>
              <Typography onClick={onSubmit}>게시</Typography>
            </Button>
          </form>
        </div>       
      </div>
    </Wrapper>
  ) 
}

export default Main;