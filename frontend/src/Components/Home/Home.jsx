import React from 'react';
import { useEffect, useState, useReducer } from 'react';
import logger from 'use-reducer-logger';
import axios from 'axios';
import { Link } from 'react-router-dom';
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
      <h1>Featured Prodects</h1>
      <div className="prodects">
        {loding ? (
          <div> Loding.... </div>
        ) : error ? (
          <div>{error}</div>
        ) : (
          prodects.map((prodect) => {
            return (
              <div className="prodect" key={prodect.slug}>
                <Link to={`/prodect/${prodect.slug}`}>
                  <img src={prodect.image} alt={prodect.name} />
                </Link>
                <div className="prodect-info">
                  <Link to={`/prodect/${prodect.slug}/`}>
                    <p> {prodect.name} </p>
                  </Link>
                  <p>
                    <strong>$ {prodect.price}</strong>
                  </p>
                  <button>Add to card</button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </>
  );
}
