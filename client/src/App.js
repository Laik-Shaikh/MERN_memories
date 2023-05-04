import React, { useEffect, useState } from "react";
import { AppBar, Container, Grid, Grow, Typography } from "@mui/material";
import Posts from "./components/Posts/Posts";
import Form from "./components/Forms/Form";
import "./Styles/common.styles.css";
import { styles } from "./Styles/Styles";
import { useDispatch } from "react-redux";
import { getPosts } from "./actions/posts";

function App() {
  const dispatch = useDispatch();

  const [currentId, setCurrentId] = useState(null);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch, currentId]);

  return (
    <Container maxWidth="lg">
      <AppBar
        className="app-bar"
        sx={styles.appBar}
        position="static"
        color="inherit"
      >
        <Typography className="heading" variant="h2" align="center">
          Memories
        </Typography>
        <img src="/images/memories.png" className={"logo"} alt="logo" />
      </AppBar>
      <Grow in>
        <Container>
          <Grid
            container
            justifyContent={"space-between"}
            alignItems="stretch"
            spacing={3}
          >
            <Grid item xs={12} sm={7}>
              <Posts setCurrentId={setCurrentId} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Form currentId={currentId} setCurrentId={setCurrentId} />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  );
}

export default App;
