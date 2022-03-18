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
      <Container 
        onSubmit={onSubmit} 
        style={{padding:10}}
        className="formBlock"
      >
        <div>
        <TextField
          className="inputBox1"
          id="outlined-password-input"
          label="아이디"
          type="password"
          autoComplete="current-password"
          variant="outlined"
          onChange={onChangeId}
        />
        </div>
        <div>
        <TextField
          className="inputBox2"
          id="outlined-password-input"
          label="이름"
          type="name"
          autoComplete="current-password"
          variant="outlined"
          onChange={onChangeName}
        />
        </div>
        <div>
        <TextField
          className="inputBox3"
          id="outlined-password-input"
          label="이메일"
          type="email"
          autoComplete="current-password"
          variant="outlined"
          onChange={onChangeEmail}
        />
        </div>
        <div>
        <TextField
          className="inputBox4"
          id="outlined-password-input"
          label="비밀번호"
          type="password"
          autoComplete="current-password"
          variant="outlined"
          onChange={onChangePassword}
        />
        </div>
        <div>
        <TextField
          className="inputBox5"
          id="outlined-password-input"
          label="비밀번호확인"
          type="passwordCheck"
          autoComplete="current-password"
          variant="outlined"
          onChange={onChangePasswordCheck}
        />
        </div>
        <div>
        <Button
          className="signupBtn"
          variant="contained" 
        >
          가입
        </Button>
        </div>
      </Container>
    </Wrapper>
  );
};

export default Signup;