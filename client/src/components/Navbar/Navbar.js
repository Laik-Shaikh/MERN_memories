import { AppBar, Avatar, Button, Toolbar, Typography } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { styles } from "../../Styles/Styles";
import decode from 'jwt-decode';
import { useDispatch } from "react-redux";

const Navbar = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  // console.log(user);

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    dispatch({ type: "SignInCard" })
    navigate('/');
    setUser(null);
  }

  useEffect(() => {

    const token = user?.token;

    // JWT EXPIRY 
    if(token) {
      const decodedToken = decode(token);
      if(decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location])

  return (
    <>
      <AppBar
        className="app-bar"
        sx={styles.appBar}
        position="static"
        color="inherit"
      >
        <div className="brandContainer">
          <Typography
            component={Link}
            to="/"
            className="heading"
            variant="h2"
            align="center"
          >
            Memories
          </Typography>
          <img src="/images/memories.png" className={"logo"} alt="logo" />
        </div>
        <Toolbar className="toolbar">
          {user?.user ? (
            <div className={"profile"}>
              <Avatar sx={{marginRight: 2}} alt={user?.user.name} src={user?.user.picture}>
                {user?.user.name.charAt(0)}
              </Avatar>
              <Typography sx={{marginRight: 2}} className={"userName"} variant="h6">
                {user?.user.name}
              </Typography>
              <Button
                variant="contained"
                sx={{ backgroundColor: "red",
                  ':hover':{
                    backgroundColor: "#E76161"
                  }
              }}
                onClick={() => logout()}
              >
                Logout
              </Button>
            </div>
          ) : (
            <Button
              component={Link}
              to="/auth"
              variant="contained"
              color="primary"
            >
              Sign In
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
