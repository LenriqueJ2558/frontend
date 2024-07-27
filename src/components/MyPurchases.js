import React, { useEffect, useState } from 'react';
import { Card, Spinner } from 'react-bootstrap';
import '../css/Orders.css';

const MyPurchases = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMyPurchases = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Usuario no autenticado');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('https://proyectotiendaonline.onrender.com/api/my-orders', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (!response.ok) {
          throw new Error('Error al obtener las compras');
        }
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMyPurchases();
  }, []);

  if (loading) {
    return <div className="text-center my-5"><Spinner animation="border" /></div>;
  }

  if (error) {
    return <div className="text-center my-5">Error: {error}</div>;
  }

  return (
    <div className="orders-container">
      <h1>Mis Compras</h1>
      {orders.length === 0 ? (
        <p>No has realizado ninguna compra</p>
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
            </Card.Body>
          </Card>
        ))
      )}
    </div>
  );
};

export default MyPurchases;