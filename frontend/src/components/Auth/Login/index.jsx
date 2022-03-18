import React, { useState } from 'react';

import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Wrapper from './styles';
import TextField from '@mui/material/TextField';

const Login = (props) => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Wrapper>
    <div>
      <Grid container sx={{ height: '100vh' }}>

      <Box component="form" noValidate sx={{ mt: 1 }}>
                
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="Id"
                  label="아이디"
                  name="Id"
                  autoComplete="Id"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="비밀번호"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  로그인
                </Button>
                
              </Box>
        </Grid>

    </div>
    </Wrapper>
    

  )
};

export default Login;