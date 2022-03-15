import React from 'react';
// import { Paper, Grid } from '@material-ui/core';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Wrapper from './styles';


const Signup = (props) => {

  return (
    <Wrapper>
    <div>
      <Grid container>
        <Grid item xs={6}>
          <Paper className="info">아이디</Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className="info">비밀번호</Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className="info">비밀번호 확인</Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className="info">닉네임</Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className="info">이메일</Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className="info">자기소개</Paper>
        </Grid>
      </Grid>
    </div>
    </Wrapper>

  )

}

export default Signup;