import React, { useState, useEffect } from 'react';
import '../../Styles/auth.style.css';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import Input from './Input';

const Auth = () => {

  const [showPassword, setShowPassword] = useState(false);

  let isSignUp = true;

  const handleChange = () => {

  }

  const handleSubmit  = async () => {

  }

  const handleShowPassword = () => setShowPassword(prev => !prev);


  return (
    <>
      <Container component={"main"} maxWidth='xs'>
        <Paper className='paper' elevation={3}>
          <Avatar sx={{backgroundColor :"red"}} className='avatar'>
            <LockIcon  />
          </Avatar>
          <Typography>{isSignUp ? "Sign Up" : "Sign In"}</Typography>
          <form className='form' onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {
                isSignUp && (
                  <>
                    <Input name="firstName" label="First Name" autoFocus half handleChange={handleChange} /> 
                    <Input name="lastName" label="Last Name" half handleChange={handleChange} /> 
                  </>
                )
              }
              <Input name="email" label="Email Address" handleChange={handleChange} type='email' />
              <Input name="password" label="Enter Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
              { isSignUp && <Input name="confirmPassword" label="Confirm Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} /> }
            </Grid>
            <Button type='submit' fullWidth color="primary" sx={{marginTop: 3}}  variant='contained'>
              { isSignUp ? "Sign Up" : "Sign In" }
            </Button>
          </form>
        </Paper>
      </Container>
    </>
  );
}

export default Auth