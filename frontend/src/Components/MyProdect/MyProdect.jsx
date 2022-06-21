import React from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Rating from '../Rating/Rating';

export default function MyProdect(props) {
  const { prodect } = props;
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
        <Button>Add To Cart</Button>
      </Card.Body>
    </Card>
  );
}
