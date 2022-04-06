import React, {useState} from 'react';
import { Button, Box } from '@mui/material';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Wrapper from './styles';
import { RegisterUser, IdCheck } from '../../../api/user';
import { Link } from 'react-router-dom';


const Signup = () =>{
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordWarning, setPasswordWarning] = useState(true);
  const [confirmPasswordWarning, SetConfirmPasswordWarning] = useState(true);
  const [emailWarning, setEmailWarning] = useState(true);
  const [idWaring, setIdWaring] = useState(true);
  const [idcheck, setIdCheck] = useState(true);


  const onSubmit = (e) => {
    e.preventDefault();
    if (idWaring || emailWarning || confirmPasswordWarning || passwordWarning) {
      if(idWaring) {
        toast.error("아이디는 6~16글자, 영문,숫자,_ 만 가능합니다")
      }
      if(emailWarning) {
        toast.error("이메일 형식에 맞지 않습니다")
      }
      if(passwordWarning) {
        toast.error("비밀번호는 최소 8글자, 영문, 숫자, 특수문자가 최소 하나씩 들어가야 합니다")
      }
      if(confirmPasswordWarning) {
        toast.error("비밀번호와 비밀번호 확인이 일치하지 않습니다.")
      }
      return;
    }

    const body = {
      userId : id,
      userPwd : password,
      userName : name,
      userEmail : email
    };
    RegisterUser(body)
    console.log(body)
  };

  // Coustom Hook 이전
  const onChangeId = async (e) => {
    const body = {
      userId : e.target.value
    };
    var idcheck = await IdCheck(body)
    console.log(idcheck.data.data)

    var reg_id = /^[a-zA-Z0-9_]{6,16}$/;
    if(!reg_id.test(e.target.value)){
      setIdWaring(true);
    }
    else{
      setIdWaring(false);
      setId(e.target.value);
    }

    if(!idcheck.data.data) {
      setIdCheck(false);
    }
  }

  const onChangeName = (e) => {
    setName(e.target.value);
  };

  const onChangeEmail = (e) =>{  
    var reg_email = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
    if(!reg_email.test(e.target.value)) {     
      setEmailWarning(true);
    }   
    else {
      setEmailWarning(false);
      setEmail(e.target.value);
    }
  }   

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

  return (
    <Wrapper>
      <Box component="form" onSubmit={onSubmit}>
        <div className="logo">
          <img src='/images/sawyou.png' width="300" height="80"></img>
        </div>
        <div className="signup__form">
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
        <div className="signup__form">
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
        <div className="signup__form">

        <input 
          type="text" 
          id="email" 
          name="email" 
          placeholder="이메일" 
          className="inputBox"
          onChange={onChangeEmail}
        >                    
        </input>
        </div>
        <div className="signup__form">
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
        <div className="signup__form">
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
        <div className="signup__form">
        <Button
          className="signupBtn"
          variant="contained" 
          type="submit"
        >
          가입
        </Button>
        </div>
        <div className="signup__form">
          <div className="signup__form form_2">
            계정이 없으신가요?<Link to="/" style={{ textDecoration: 'none', padding: 8, color: 'blue'}}>로그인</Link>
          </div>
        </div>
      </Box>
      <ToastContainer autoClose={5000} />
    </Wrapper>
  );
};

export default Signup;