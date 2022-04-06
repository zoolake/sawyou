import React, { useEffect, useState } from 'react';
import Wrapper from './styles';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Typography from '@mui/material/Typography';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import {LikePost, WriteComment, ReadCommnet} from '../../api/post'
import InputBase from "@mui/material/InputBase";
import { useRecoilState } from 'recoil';
import { User } from '../../States/User';
import { useNavigate } from 'react-router-dom';


const Main = (props) => { 
  const navigate = useNavigate(); // for redirect
  const [comment, setComment] = useState('');
  const [commentCnt, setCommentCnt] = useState(props.data.postCommentCnt);
  const [user, setUser] = useRecoilState(User);
  const [commentArray, setCommentArray] = useState([]);
  const [isValid, setIsValid] = useState(true);
  const [imgurl, setImgurl] = useState(['']);
  const [like, setLike] = useState(props.data.postIsLike);
  const [likeCnt, setLikeCnt] = useState(props.data.postLikeCnt);
  const [dataComment, setDataComment] = useState('');
  const [count, setCount] = useState(1);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handelLike = (e) => {
    sendLike()
    if (like === true) {
      setLike(false)
      setLikeCnt(count => count - 1)
    }
    else {
      setLike(true)
      setLikeCnt(count => count + 1)
    }
  }

  const sendLike = async() => {
    const res = await LikePost(props.data.postSeq)
  }

  const getComment = async() => {
    const res = await ReadCommnet(props.data.postSeq)
    setDataComment(res.data.data)
  }

  const handleKeyPress = event => {
    if (event.key === 'Enter' && event.target.value !== '') {
      event.preventDefault();
      const repoArray = [...comment];
      repoArray.push({});
      setComment(repoArray);
      event.target.value = '';
    }
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const onClickRedirectPathHandler = name => e => {
    window.scrollTo(0, 0);
    navigate(`${name}`);
  };

  const handleCommentInput = event => {
    setComment(event.target.value);
  };

  const onChange = event => {
    setComment(event.target.value);
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
      setComment(''),
      setCount(count => count + 1),
      setCommentCnt(count => count + 1)
    )
  };

  useEffect(() => {
    getComment()
  }, [count]);

  return (
    <Wrapper>
      <div className="post">
        <div className="post_header">
          <div className="post_pfuser">
            <div>
              {props.data.userProfile 
                ? <Avatar className="post_avatar" alt="User" src={props.data.userProfile} onClick={onClickRedirectPathHandler(`/profile/${props.data.userId}`)}/> 
                : <Avatar className="post_avatar" alt="User" src="/images/baseimg.jpg"/>}
            </div>
            <div className="post_user">
              <h4 onClick={onClickRedirectPathHandler(`/profile/${props.data.userId}`)}>{props.data.userId}</h4>
            </div>
          </div>
        </div>
        <img className="post_img" src={props.data.postPictureLink}></img>
        <div className="post_article">
          <div className="post__likeCnt">
            {like === true ?       
              <Button onClick={handelLike} sx={{minWidth:'24px'}} style={{padding:'0px'}}>     
              <FavoriteIcon 
                className="post_like"
                sx = {{color:'red'}}
              />
              </Button> :
              <Button onClick={handelLike} sx={{minWidth:'24px'}} style={{padding:'0px'}}>        
              <FavoriteBorderIcon 
                className="post_like"
                sx = {{color:'black'}}
              />
              </Button>
            }
            좋아요 {likeCnt}개
          </div>
          <div className="post_article_comment">
            <div>
              <h4 className="post_text">
                <strong className="cur1" onClick={onClickRedirectPathHandler(`/profile/${props.data.userId}`)}>
                  {props.data.userId}
                </strong><span>&nbsp;</span>
                {props.data.postContent}
              </h4>
            </div>
            <div className="post__commentCnt">댓글 {commentCnt}개</div>            
            <div className="post_comment">
              {dataComment && dataComment.map((data) => 
                <h4 className="post_user_comment">
                  <strong className="cur1" onClick={onClickRedirectPathHandler(`/profile/${data.userId}`)}>
                    {data.userId}
                  </strong>
                  <span>&nbsp;</span>
                  {data.commentContent}
                </h4>
              )}
            </div>
          </div>
        </div>
        <div className="commentContainer" >
          <form className="commentWrap" onSubmit="return false">
            <InputBase
              placeholder="내용 입력"
              onChange={onChange}
              onKeyPress={event => { 
                handleKeyPress(event);
              }}
              onKeyUp={event => {
                handleCommentInput(event);
              }}
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