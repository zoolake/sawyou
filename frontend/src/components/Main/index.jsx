import React, { useEffect, useState } from 'react';
import Wrapper from './styles';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteIcon from '@mui/icons-material/Delete';
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
    // setCommentArray(commentValueList => [comment, ...commentValueList]);
    // setComment('');
    // setIsValid(false);
    const body = {
      commentContent : comment
    }
    WriteComment(props.data.postSeq, body)
    getComment()
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
              <Avatar
                className="post_avatar"
                alt="User"
                src="/images/baseimg.jpg"
              />
            </div>
            <div className="post_user">
            {/* <h3>{username}</h3> */}           
              <h4>{props.data.userId}</h4>
            </div>
          </div>
          <div className="post_delete">
            <DeleteIcon />
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
              {/* <h4 className="post_txt"><strong>{username}</strong> {caption}</h4> */}
              <h4 className="post_text"><strong>{props.data.userId}</strong> {props.data.postContent}</h4>
            </div>
            {dataComment && dataComment.map((data) => <Typography>{data.commentContent}</Typography>)}
            {/* <ul>
              <Comment />
            </ul> */}
          </div>
        </div>

        {/* <form className="post_comment_container" method="POST">
          <input
            value={comment}
            className="post_comment"
            type="text"
            placeholder="댓글 달기..."
            onChange={event => {
              setComment(event.target.value);
            }}
            onKeyUp={event => {
              event.target.value.length > 0
                ? setIsValid(true)
                : setIsValid(false);
            }}
          />
          <text
            type="button"
            className={
              isValid === true ? 'commentUploadBtnActive' : 'commentUploadBtnDeactive'
            }
            onClick={btnColor}
            disabled={isValid ? false : true}
          >
            게시
          </text>
        </form> */}
        <div className="commentContainer" >
          <form className="commentWrap">
          <InputBase
            placeholder="내용 입력"
            onChange={onChange}
            sx={{width:'90%', ml:1}}
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