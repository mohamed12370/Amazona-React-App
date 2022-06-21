import React from 'react';
import { useEffect, useState, useReducer } from 'react';
import logger from 'use-reducer-logger';
import axios from 'axios';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MyProdect from '../MyProdect/MyProdect';
import { Helmet } from 'react-helmet-async';
//import data from '../../data';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loding: true };
    case 'FETCH_SUCCESS':
      return { ...state, prodects: action.payload, loding: false };
    case 'FETCH_FAIL':
      return { ...state, loding: false, error: action.payload };
    default:
      return state;
  }
};

export default function Home() {
  const [{ loding, error, prodects }, dispatch] = useReducer(logger(reducer), {
    prodects: [],
    loding: true,
    error: '',
  });
  //const [prodects, setProdects] = useState([]);
  useEffect(() => {
    const fecthData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get('/api/prodects');
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }
      //setProdects(result.data);
    };
    fecthData();
  }, []);
  return (
    <>
      <Helmet>
        <title>Amazona</title>
      </Helmet>
      <h1>Featured Prodects</h1>
      <div className="prodects">
        {loding ? (
          <div> Loding.... </div>
        ) : error ? (
          <div>{error}</div>
        ) : (
          <Row>
            {prodects.map((prodect) => {
              return (
                <Col sm={6} md={4} lg={3} className="mb-3">
                  <MyProdect key={prodect.slug} prodect={prodect}></MyProdect>
                </Col>
              );
            })}
          </Row>
        )}
      </div>
    </>
  );
}
