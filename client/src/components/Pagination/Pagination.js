import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Pagination from '@mui/material/Pagination';
import { Link } from 'react-router-dom';
import '../../Styles/common.styles.css';

const Paginate = () => {

  return (
    <>
      <Pagination color='primary' count={10} />
    </>
  );
}

export default Paginate;