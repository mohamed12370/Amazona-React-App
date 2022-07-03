import React, { useContext, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Checkout from '../Checkout/Checkout';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Store } from '../../ConText/Store';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Payment() {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { shippingAddress, paymentMethod },
  } = state;

  const [paymentMethodName, setPaymentMethod] = useState(
    paymentMethod || 'paypal'
  );

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate('/shipping');
    }
  }, [shippingAddress, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    ctxDispatch({ type: 'SAVE_PAYMENT_METHOD', payload: paymentMethodName });
    localStorage.setItem('paymentMethod', paymentMethodName);
    navigate('/placeorder');
  };

  return (
    <div>
      <Checkout step1 step2 step3></Checkout>
      <div className="container small-container">
        <Helmet>
          <title>Payment Method</title>
        </Helmet>
        <h1 className="my-3"> Payment Method</h1>
        <Form onSubmit={submitHandler}>
          <div className="mb-3">
            <Form.Check
              type="radio"
              id="payPal"
              label="payPal"
              value="payPal"
              checked={paymentMethodName === 'payPal'}
              onClick={(e) => {
                setPaymentMethod(e.target.value);
              }}
            />
          </div>
          <div className="mb-3">
            <Form.Check
              type="radio"
              id="stripe"
              label="stripel"
              value="stripe"
              checked={paymentMethodName === 'stripe'}
              onClick={(e) => {
                setPaymentMethod(e.target.value);
              }}
            />
          </div>
          <div className="mb-3">
            <Button type="submit">Continue</Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
