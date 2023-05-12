import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "@mui/material/Pagination";

import PaginationItem from "@mui/material/PaginationItem";
import { Link } from "react-router-dom";
import "../../Styles/common.styles.css";
import { getPosts } from "../../actions/posts";

const Paginate = ({ page }) => {
  const dispatch = useDispatch();
  const totalPages = useSelector((state) => state.posts?.totalPages);

  useEffect(() => {
    if (page) {
      console.log(page);
      dispatch(getPosts(page));
    }
  }, [page]);

  return (
    <>
      <Pagination
        count={totalPages}
        page={Number(page) || 1}
        variant="outlined"
        color="primary"
        renderItem={(item) => (
          <PaginationItem
            {...item}
            component={Link}
            to={`/posts?page=${item.page}`}
          />
        )}
      />
    </>
  );
};

export default Paginate;
