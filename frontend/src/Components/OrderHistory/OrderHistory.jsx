import React, { useContext, useReducer } from 'react';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { Store } from '../../ConText/Store';
import { getError } from '../../Utils/Utils';
import LoadingBox from '../LoadingBox/LoadingBox';
import MessageBox from '../MessageBox/MessageBox';
import axios from 'axios';
import Button from 'react-bootstrap/Button';

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, orders: action.payload, error: '' };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
}

export default function OrderHistory() {
  const { state } = useContext(Store);
  const { userInfo } = state;

  const navigate = useNavigate();

  const [{ orders, loading, error }, dispatch] = useReducer(reducer, {
    loading: true,
    orders: [],
    error: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const { data } = await axios.get(`/api/orders/mine`, {
          headers: { authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };
    fetchData();
  }, [userInfo]);

  return (
    <div>
      <Helmet>
        <title>Order Hisrory</title>
      </Helmet>
      <h1>Order Hisrory</h1>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox varinat="danger">{error}</MessageBox>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERD</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((el) => {
              return (
                <tr key={el._id}>
                  <td>{el._id}</td>
                  <td>{el.createdAt.substring(0, 10)}</td>
                  <td>{el.totalPrice.toFixed(2)}</td>
                  <td>{el.isPaid ? orders.paidAt.substring(0, 10) : 'No'}</td>
                  <td>
                    {orders.isDelivered
                      ? orders.deliveredAt.substring(0, 10)
                      : 'No'}
                  </td>
                  <td>
                    <Button
                      type="button"
                      value="ligth"
                      onClick={() => {
                        navigate(`/order/${orders._id}`);
                      }}
                    >
                      {' '}
                      Details
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}
