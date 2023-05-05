import { AppBar, Avatar, Button, Toolbar, Typography } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { styles } from "../../Styles/Styles";
import { useDispatch } from "react-redux";

const Navbar = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  console.log(user);

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    navigate('/auth');
    setUser(null);
  }

  useEffect(() => {

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
          {user ? (
            <div className={"profile"}>
              <Avatar alt={user?.name} src={user?.picture}>
                {user?.name.charAt(0)}
              </Avatar>
              <Typography className={"userName"} variant="h6">
                {user?.name}
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
