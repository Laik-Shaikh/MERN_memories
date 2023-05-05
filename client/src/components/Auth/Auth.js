import React, { useState, useEffect } from "react";
import "../../Styles/auth.style.css";
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import Input from "./Input";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import jwt_decode from 'jwt-decode';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  const handleChange = () => {};

  const handleSubmit = async () => {};

  const handleShowPassword = () => setShowPassword((prev) => !prev);

  const switchMode = () => {
    setIsSignUp((prev) => !prev);
    handleShowPassword(false);
  };

  return (
    <>
      <Container component={"main"} maxWidth="xs">
        <Paper className="paper" elevation={3}>
          <Avatar sx={{ backgroundColor: "red" }}>
            <LockIcon />
          </Avatar>
          <Typography>{isSignUp ? "Sign Up" : "Sign In"}</Typography>
          <form className="form" onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {isSignUp && (
                <>
                  <Input
                    name="firstName"
                    label="First Name"
                    autoFocus
                    half
                    handleChange={handleChange}
                  />
                  <Input
                    name="lastName"
                    label="Last Name"
                    half
                    handleChange={handleChange}
                  />
                </>
              )}
              <Input
                name="email"
                label="Email Address"
                handleChange={handleChange}
                type="email"
              />
              <Input
                name="password"
                label="Enter Password"
                handleChange={handleChange}
                type={showPassword ? "text" : "password"}
                handleShowPassword={handleShowPassword}
              />
              {isSignUp && (
                <Input
                  name="confirmPassword"
                  label="Confirm Password"
                  handleChange={handleChange}
                  type={showPassword ? "text" : "password"}
                  handleShowPassword={handleShowPassword}
                />
              )}
            </Grid>
            <div className="google-cont">
              <GoogleLogin
                onSuccess={(credentialResponse) => {
                  // console.log(credentialResponse);
                  const decoded = jwt_decode(credentialResponse.credential);
                  // console.log(decoded);
                  dispatch({ type: "AUTH", data: { decoded, token: credentialResponse.credential } });
                  navigate('/');
                }}
                onError={(error) => {
                  console.log(error);
                  console.log("Login Failed");
                }}
              />
            </div>
            <Button
              type="submit"
              fullWidth
              color="primary"
              sx={{ marginTop: 2 }}
              variant="contained"
            >
              {isSignUp ? "Sign Up" : "Sign In"}
            </Button>
            <Grid container marginTop={2} justifyContent="flex-end">
              <Grid item>
                <Button onClick={switchMode}>
                  {isSignUp
                    ? "Already have an account? Sign In"
                    : "Don't have an account? Sign Up"}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </>
  );
};

export default Auth;
