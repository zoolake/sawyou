import React, { useState, useEffect }  from 'react';
import Wrapper from './styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { ToastContainer, toast } from "react-toastify";
import { User } from '../../../States/User';
import { EditProfile, Profile } from '../../../api/user';
import { useRecoilState } from 'recoil';


const Profileedit = () => {
  const [user, setUser] = useRecoilState(User);
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [intro, setIntro] = useState('');
  const [password, setPassword] = useState('');
  const [passwordWarning, setPasswordWarning] = useState(false);
  const [confirmPasswordWarning, SetConfirmPasswordWarning] = useState(false);
  const [idWaring, setIdWaring] = useState(false);

  async function A(){
    const curUser = await Profile(user);

    console.log("userId", curUser.data.data.userId)
    setName(curUser.data.data.userName);
    setId(curUser.data.data.userId);
    setIntro(curUser.data.data.userDesc);

    console.log(curUser)
  }

  useEffect(() => {
    A();
  },[])

  const onSubmit = (e) => {
    e.preventDefault();
    if (idWaring || confirmPasswordWarning || passwordWarning) {
      if(idWaring) {
        toast.error("아이디는 6~16글자, 영문,숫자,_ 만 가능합니다")
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
      userName : name,
      userId : id,
      userDesc : intro,
      userPwd : password
    };

    console.log(body)

    async function B() {
      const res = await EditProfile(body).then((res) => localStorage.setItem('access_token', res.data.data))
    }

    B()
  }

  const onChangeIntro = (e) => {
    setIntro(e.target.value);
  }

  // 각종 유효성 검사
  const onChangeId = (e) => {
    var reg_id = /^[a-zA-Z0-9_]{6,16}$/;
    if(!reg_id.test(e.target.value)){
      setIdWaring(true);
      setId(e.target.value)
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
          value={name}
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
            value={id} 
            className="inputBox"
            onChange={onChangeId}
          >          
          </input>
        </div>

        <div className="c1">
        <div className='text'><a>자기소개</a></div>
        <input 
          type="text" 
          id="intro" 
          name="intro" 
          value={intro || ''}
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
          className="profileEditBtn"
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