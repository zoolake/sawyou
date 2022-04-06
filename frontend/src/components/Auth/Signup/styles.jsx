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
  width: 350px;
  height: 530px;

  .logo {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 8px;
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
    background-color: #5AD2FF;
    margin-top: 4px;
  }

  .signup__form {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 4px;
  }
  
  .form_2 {
    margin-top: 8px;
  }

  a {
    text-decoration-line: none;
  }


  


`;

export default Wrapper;