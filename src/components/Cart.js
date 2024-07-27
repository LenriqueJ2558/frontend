import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import { CartContext } from '../contexts/CartContext';
import '../css/Cart.css';

const Cart = () => {
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();

  const handleCheckout = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      const response = await fetch('https://proyectotiendaonline.onrender.com/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          cartItems: cart.map(item => ({
            productId: item._id,
            quantity: item.quantity
          }))
        })
        
      });
      if (!response.ok) {
        throw new Error('Failed to create checkout');
      }
      // Manejar el checkout exitoso (por ejemplo, navegar a la página de confirmación o mostrar un mensaje de éxito)
    } catch (error) {
      console.error('Error during checkout:', error);
    }
  };

  return (
    <div className="cart-container">
      {cart.length === 0 ? (
        <div className="text-center my-5">El carrito esta vacio!!</div>
      ) : (
        cart.map((item, index) => (
          <Card key={index} className="cart-item">
            <Card.Img variant="top" src={item.foto} alt={item.name} />
            <Card.Body>
              <Card.Title>{item.name}</Card.Title>
              <Card.Text>Quantity: {item.quantity}</Card.Text>
              <Card.Text>Price: ${item.precio}</Card.Text>
            </Card.Body>
          </Card>
        ))
      )}
      <Button variant="primary" onClick={handleCheckout} >Checkout</Button>
    </div>
  );
};

export default Cart;