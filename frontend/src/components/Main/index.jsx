import React, { useState } from 'react';
import Wrapper from './styles';
import Avatar from '@mui/material/Avatar';
import FavoriteIcon from '@material-ui/icons/Favorite';
import DeleteIcon from '@material-ui/icons/Delete';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';



const Main = () => {
  const [comment, setComment] = useState('');
  const [commentArray, setCommentArray] = useState([]);
  const [isValid, setIsValid] = useState(false);
  const onChange = event => setComment(event.target.value);

  const onSubmit = event => {
    event.preventDefault();
    if (comment === '') {
      return;
    }
    setCommentArray(commentValueList => [comment, ...commentValueList]);
    setComment('');
    setIsValid(false);

  };

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
              <h4>User</h4>
            </div>
          </div>
          <div className="post_delete">
            <DeleteIcon />
          </div>
        </div>

        <img className="post_img" src="/images/hallstatt.jpg"></img>
        <div className="post_article">
          <div>          
            <FavoriteBorderIcon 
              className="post_like"
            />
          </div>
          <div className="post_article_comment">
            <div>
              {/* <h4 className="post_txt"><strong>{username}</strong> {caption}</h4> */}
              <h4 className="post_text"><strong>leesh123</strong> 테스트</h4>
            </div>
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
        <div className="commentContainer" onSubmit={onSubmit}>
          <form className="commentWrap">
            <input
              type="text"
              placeholder="댓글달기..."
              className="commentInput"
              value={comment}
              onChange={onChange}
            />
            <text 
              type="button"
              className={
                isValid === true ? 'commentUploadBtnActive' : 'commentUploadBtnDeactive'
              }>
              게시
            </text>
          </form>
        </div>       
      </div>
    </Wrapper>
  ) 
}

export default Main;