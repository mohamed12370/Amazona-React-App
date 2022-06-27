import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Rating from '../Rating/Rating';
import axios from 'axios';
import { Store } from '../../ConText/Store';

export default function MyProdect(props) {
  const { prodect } = props;
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const addToCartHandler = async (item) => {
    const existItem = cartItems.find((x) => x._id === prodect._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${item._id}`);
    if (data.countInStock < quantity) {
      window.alert('sorry. product is out of stock');
      return;
    }
    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...item, quantity },
    });
  };

  return (
    <Card className="prodect">
      <Link to={`/prodect/${prodect.slug}`}>
        <img src={prodect.image} className="card-img-top" alt={prodect.name} />
      </Link>
      <Card.Body>
        <Link to={`/prodect/${prodect.slug}/`}>
          <Card.Title> {prodect.name} </Card.Title>
        </Link>
        <Rating rating={prodect.rating} numReviews={prodect.numReviews} />
        <Card.Text>$ {prodect.price}</Card.Text>
        {prodect.countInStock === 0 ? (
          <Button variant="light" disabled>
            Out of Stock
          </Button>
        ) : (
          <Button onClick={() => addToCartHandler(prodect)}>Add To Cart</Button>
        )}
      </Card.Body>
    </Card>
  );
}
