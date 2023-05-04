import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { styles } from "../../Styles/Styles";

const Navbar = () => {

  let user = null;

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
        <Toolbar className='toolbar'>
          {user?.result ? (
            // <div className={classes.profile}>
            //   <Avatar
            //     className={classes.purple}
            //     alt={user?.result.name}
            //     src={user?.result.imageUrl}
            //   >
            //     {user?.result.name.charAt(0)}
            //   </Avatar>
            //   <Typography className={classes.userName} variant="h6">
            //     {user?.result.name}
            //   </Typography>
            //   <Button
            //     variant="contained"
            //     className={classes.logout}
            //     color="secondary"
            //     onClick={logout}
            //   >
            //     Logout
            //   </Button>
            // </div>
            <></>
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
