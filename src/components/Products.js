import React, { useEffect, useState, useContext } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Carousel from "react-bootstrap/Carousel";
import Container from "react-bootstrap/Container";
import { Spinner } from 'react-bootstrap';
import { CartContext } from '../contexts/CartContext';
import '../css/Products.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://proyectotiendaonline.onrender.com/api/products");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div className="text-center my-5"><Spinner animation="border" /></div>;
  }

  if (error) {
    return <div className="text-center my-5">Error: {error}</div>;
  }

  const chunkSize = 4;
  const productChunks = [];
  for (let i = 0; i < products.length; i += chunkSize) {
    productChunks.push(products.slice(i, i + chunkSize));
  }

  return (
    <Container className="products-container">
      <h1 className="products-title">Productos</h1>
      <Carousel controls indicators={false} className="product-carousel mt-5">
        {productChunks.map((chunk, index) => (
          <Carousel.Item key={index}>
            <div className="d-flex justify-content-between">
              {chunk.map(product => (
                <Card key={product._id} className="product-card">
                  <Card.Img variant="top" src={product.foto} alt={product.name} />
                  <Card.Body>
                    <Card.Title>{product.name}</Card.Title>
                    <Card.Text>{product.descripcion}</Card.Text>
                    <Card.Text><strong>Price:</strong> ${product.precio}</Card.Text>
                    <Card.Text><strong>Stock:</strong> {product.stock}</Card.Text>
                    <Card.Text><strong>Category:</strong> {product.category.name}</Card.Text>
                    {product.discount && (
                      <Card.Text>
                        <strong>Discount:</strong> {product.discount.amount}% off<br />
                        <strong>Code:</strong> {product.discount.code}
                      </Card.Text>
                    )}
                    <Button variant="primary" onClick={() => addToCart(product)}>Añadir al Carrito</Button>
                  </Card.Body>
                </Card>
              ))}
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </Container>
  );
};

export default Products;