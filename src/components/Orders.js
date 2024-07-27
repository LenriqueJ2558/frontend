import React, { useEffect, useState } from 'react';
import { Card, Spinner, Button } from 'react-bootstrap';

import { loadStripe } from '@stripe/stripe-js'; // Importar loadStripe
import '../css/Orders.css';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Usuario no autenticado');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('https://proyectotiendaonline.onrender.com/api/orders/pending', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (!response.ok) {
          throw new Error('No tiene ordenes pendientes');
        }
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handlePayment = async (orderId) => {
    const stripe = await loadStripe("pk_test_51PYHjy2KWHEWMpLQuQa567lDQTkuVvIwDkhhkreApKuyqczxq7z4cgKYsmXZ31qAAJ13p1r6PVeTz3CVZSBnt0vy00n37DjCAI");
    const body = { orderId };
    const headers = {
      "Content-Type": "application/json",
    };

    const response = await fetch(
      "https://proyectotiendaonline.onrender.com/api/pay",
      {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body),
      }
    );

    const { sessionId } = await response.json();

    const result = await stripe.redirectToCheckout({
      sessionId: sessionId,
    });

    if (result.error) {
      console.log(result.error);
    }
  };

  if (loading) {
    return <div className="text-center my-5"><Spinner animation="border" /></div>;
  }

  if (error) {
    return <div className="text-center my-5">Error: {error}</div>;
  }

  return (
    <div className="orders-container">
      <h1>Órdenes Pendientes</h1>
      {orders.length === 0 ? (
        <p>No hay órdenes pendientes</p>
      ) : (
        orders.map(order => (
          <Card key={order._id} className="order-item">
            <Card.Body>
              <Card.Title>Orden ID: {order._id}</Card.Title>
              <Card.Text>Estado: {order.status}</Card.Text>
              <Card.Text>Total: ${order.total}</Card.Text>
              <Card.Text>Creado en: {new Date(order.createdAt).toLocaleString()}</Card.Text>
              <Card.Text>Productos:</Card.Text>
              <ul>
                {order.products.map(item => (
                  <li key={item._id}>
                    <img src={item.product.foto} alt={item.product.name} style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
                    <div>
                      <p>Nombre: {item.product.name}</p>
                      <p>Cantidad: {item.quantity}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <Button variant="primary" onClick={() => handlePayment(order._id)}>
                Pagar
              </Button>
            </Card.Body>
          </Card>
        ))
      )}
    </div>
  );
};

export default Orders;