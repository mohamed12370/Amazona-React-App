import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useReducer } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Helmet } from 'react-helmet-async';
import { useNavigate, useParams } from 'react-router-dom';
import Rating from '../Rating/Rating';
import { Badge } from 'react-bootstrap';
import LoadingBox from '../LoadingBox/LoadingBox';
import MessageBox from '../MessageBox/MessageBox';
import { useContext } from 'react';
import { Store } from '../../ConText/Store';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loding: true };
    case 'FETCH_SUCCESS':
      return { ...state, prodect: action.payload, loding: false };
    case 'FETCH_FAIL':
      return { ...state, loding: false, error: action.payload };
    default:
      return state;
  }
};

export default function Prodect() {
  const [{ loding, error, prodect }, dispatch] = useReducer(reducer, {
    prodect: [],
    loding: true,
    error: '',
  });

  let param = useParams();
  let { slug } = param;
  let navigate = useNavigate();

  useEffect(() => {
    const fecthData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get(`/api/prodects/slug/${slug}`);
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }
    };
    fecthData();
  }, [slug]);

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart } = state;

  const addToCartHandler = async () => {
    const existItem = cart.cartItems.find((x) => x._id === prodect._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/prodects/${prodect._id}`);
    if (data.countInStock < quantity) {
      window.alert('sorry. product is out of stock');
      return;
    }
    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...prodect, quantity },
    });
    navigate('/cart');
  };

  return loding ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox variant="danger"> {error} </MessageBox>
  ) : (
    <div>
      <Row>
        <Col md={6}>
          <img
            className="img-large"
            src={prodect.image}
            alt={prodect.name}
          ></img>
        </Col>
        <Col md={3}>
          <ListGroup varinat="flush">
            <ListGroup.Item>
              <Helmet>
                <title>{prodect.name}</title>
              </Helmet>
              <h1>{prodect.name}</h1>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating
                rating={prodect.rating}
                numReviews={prodect.numReviews}
              ></Rating>
            </ListGroup.Item>
            <ListGroup.Item>Price : ${prodect.price}</ListGroup.Item>
            <ListGroup.Item>
              Description : <p>{prodect.description}</p>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>$ {prodect.price}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      {' '}
                      {prodect.countInStock > 0 ? (
                        <Badge bg="success">In Stock</Badge>
                      ) : (
                        <Badge bg="danger">Unavailable</Badge>
                      )}
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  {prodect.countInStock > 0 && (
                    <ListGroup.Item>
                      <div className="d-grid">
                        <Button onClick={addToCartHandler} variant="primary">
                          {' '}
                          Add To Card
                        </Button>
                      </div>
                    </ListGroup.Item>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
