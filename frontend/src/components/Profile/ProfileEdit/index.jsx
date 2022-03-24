import React, { useState, useEffect }  from 'react';
import Wrapper from './styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';


const Profileedit = () => {
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [intro, setIntro] = useState('');
  const [password, setPassword] = useState('');
  const [passwordWarning, setPasswordWarning] = useState(true);
  const [confirmPasswordWarning, SetConfirmPasswordWarning] = useState(true);
  const [idWaring, setIdWaring] = useState(true);

  const onSubmit = (e) => {
    e.preventDefault();

  }

  const onChangeIntro = (e) => {
    setIntro(e.target.value);
  }

  // 각종 유효성 검사
  const onChangeId = (e) => {
    var reg_id = /^[a-zA-Z0-9_]{6,16}$/;
    if(!reg_id.test(e.target.value)){
      setIdWaring(true);
    }
    else{
      setIdWaring(false);
      setId(e.target.value);
    }
  }

  const onChangeName = (e) => {
    setName(e.target.value);
  };
  const onChangePassword = (e) => {
    var reg_password = /^.*(?=^.{8,16}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;
    if(!reg_password.test(e.target.value)){
      setPasswordWarning(true);
    }
    else{
      setPasswordWarning(false);
      setPassword(e.target.value);
    }
  }

  const onChangePasswordCheck = (e) => {
    if(password !== e.target.value){
      SetConfirmPasswordWarning(true);
    }
    else{
      SetConfirmPasswordWarning(false);
    }
  }



  return(
    <Wrapper>
      <Box component="form" onSubmit={onSubmit}>

        <div className="logo">
          <img className="logo" src="/images/baseimg_nav.jpg" />  
          사용자 이름
        </div>
        <div className="c1">
        <div className='text'><a>이름</a></div>
        <input 
          type="text" 
          id="name" 
          name="name" 
          placeholder="이름" 
          className="inputBox"
          onChange={onChangeName}
        >          
        </input>
        </div>
        <div className="c1">
        <div className='text'><a>아이디</a></div>
          <input 
            type="text" 
            id="loginId" 
            name="loginId" 
            placeholder="아이디" 
            className="inputBox"
            onChange={onChangeId}
          >          
          </input>
        </div>

        <div className="c1">
        <div className='text'><a>자기소개</a></div>
        <input 
          type="text" 
          id="email" 
          name="email" 
          placeholder="자기소개" 
          className="inputBox"
          onChange={onChangeIntro}
        >                    
        </input>
        </div>
        <div className="c1">
        <div className='text'><a>비밀번호</a></div>
        <input 
          type="password" 
          id="password" 
          name="password" 
          placeholder="비밀번호" 
          className="inputBox"
          onChange={onChangePassword}
        >          
        </input>
        </div>
        <div className="c1">
        <div className='text'><a>비밀번호 확인</a></div>
        <input 
          type="password" 
          id="passwordcheck" 
          name="passwordcheck" 
          placeholder="비밀번호확인" 
          className="inputBox"
          onChange={onChangePasswordCheck}
        >          
        </input>
        </div>
        <div className="c1">
        <Button
          className="signupBtn"
          variant="contained" 
          type="submit"
        >
          제출
        </Button>
        </div>
      </Box>
    </Wrapper>


  );

};

export default Profileedit;