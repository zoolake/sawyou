import React, {useState} from 'react';
import { 
  Container, 
  Button, 
  TextField } 
from '@mui/material';
import Wrapper from './styles';

const Signup = () =>{
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [passwordError, setPasswordError] = useState(false);

  const onSubmit = (e) => {
      e.preventDefault();

      // 비밀번호와 비밀번호확인 일치여부 검증
      if(password !== passwordCheck){
          return setPasswordError(true);
      }
  };

  // Coustom Hook 이전
  const onChangeId = (e) => {
    setId(e.target.value);
  };

  const onChangeName = (e) => {
    setName(e.target.value);
  };

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };
  
  const onChangePasswordCheck = (e) => {
    setPasswordError(e.target.value !== password);
    setPasswordCheck(e.target.value);
  };

  return (
    <Wrapper>
      <div className="logo">
        I SAW YOU
      </div>
      <div className="c1">
        <input 
          type="email" 
          id="loginId" 
          name="loginId" 
          placeholder="아이디" 
          className="inputBox"
          onChange={onChangeId}
        >          
        </input>
      </div>
      <div className="c1">


      <input 
        type="email" 
        id="loginId" 
        name="loginId" 
        placeholder="이름" 
        className="inputBox"
        onChange={onChangeName}
      >          
      </input>
      </div>
      <div className="c1">

      <input 
        type="email" 
        id="loginId" 
        name="loginId" 
        placeholder="이메일" 
        className="inputBox"
        onChange={onChangeEmail}
      >                    
      </input>
      </div>
      <div className="c1">

      <input 
        type="email" 
        id="loginId" 
        name="loginId" 
        placeholder="비밀번호" 
        className="inputBox"
        onChange={onChangePassword}
      >          
      </input>
      </div>
      <div className="c1">

      <input 
        type="email" 
        id="loginId" 
        name="loginId" 
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
      >
        가입
      </Button>
      </div>
      <div className="d1">
        <p class="e1">
          계정이 있으신가요?
          <a href="/accounts/login">
            로그인
          </a>
        </p>
      </div>
    </Wrapper>
  );
};

export default Signup;