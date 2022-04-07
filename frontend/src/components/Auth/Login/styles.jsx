import styled from 'styled-components';

const Wrapper = styled.div`
display: flex;
flex-direction: column;
margin: 0 auto;
margin-top: 96px;
margin-bottom: 32px;
position: relative;
border: 1px solid #d4d2d2;
box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.04);
width: 400px;
height: 360px;

.logo {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 8px;
}

.login__form {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 4px;
}

.form_1 {
  margin-bottom: 18px;!important;  
}

.inputBox {
  width: 258px;
  height: 50px;
  background-color: white;
  border: 1px solid #d4d2d2;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 4px;
  margin-bottom: 4px;
}

.signupBtn {
  width: 264px;
  height: 50px;
  border-radius: 16px;
  background-color: #7389D0;
  margin-top: 4px;
}

`;

export default Wrapper;