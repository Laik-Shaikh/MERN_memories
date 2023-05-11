import { Container, Grid, Grow, AppBar, TextField, Button, Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Form from "../Forms/Form";
import Posts from "../Posts/Posts";
import { useDispatch } from "react-redux";
import { getPosts } from "../../actions/posts";
import Paginate from "../Pagination/Pagination";
import { MuiChipsInput } from 'mui-chips-input'


function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const query = useQuery();
  const page = query.get('page') || 1;

  const [currentId, setCurrentId] = useState(null);
  const [search, setSearch] = useState("");
  const [tags, setTags] = useState([]);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch, currentId]);

  const handleSearch = (e) => {
    if(e.keyCode===13) {
      // search posts
    }
  }

  const handleAdd = (tag) => setTags([ ...tags, tag ])

  const handleDelete = (tagToDelete) => {
    const newTags = tags.filter((tag) => tag !== tagToDelete);
    setTags(newTags)
  }

  return (
    <>
      <Grow in>
        <Container maxWidth='xl'>
          <Grid
            container
            sx={{
              "@media (max-width: 780px)": {
                flexDirection: "column-reverse",
              },
            }}
            justifyContent={"space-between"}
            alignItems="stretch"
            spacing={3}
          >
            <Grid item xs={12} sm={6} md={8}>
              <Posts setCurrentId={setCurrentId} />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <AppBar className="appbarSearch" position="static" color="inherit">
                <TextField
                  name="search"
                  label="Search Memories"
                  variant="outlined"
                  onChange={(e) => setSearch(e.target.value)}
                  value={search}
                  fullWidth
                  placeholder="Enter here..."
                  onKeyPress={handleSearch}
                />

                <MuiChipsInput
                  style={{margin:'15px 0px'}}
                  value={tags}
                  onAddChip={handleAdd}
                  onDeleteChip={handleDelete}
                  label="Search Tags"
                  variant="outlined"
                />
              </AppBar>
              <Form currentId={currentId} setCurrentId={setCurrentId} />
              <Paper className="pagination" elevation={6}>
                <Paginate />
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </>
  );
};

export default Home;
