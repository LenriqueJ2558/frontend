import React, { useState } from "react"; 
import "bootstrap/dist/css/bootstrap.min.css"; 
import Button from "react-bootstrap/Button"; 
import Card from "react-bootstrap/Card"; 
import { loadStripe } from "@stripe/stripe-js"; 

function StripePayment() {
  const [orderId] = useState("66a2c9daf1925257c5e77995"); // Reemplaza con el ID de la orden real

  const makePayment = async () => {
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

  return (
    <Card style={{ width: "20rem" }}>
      <Card.Img
        variant="top"
        src="https://images.pexels.com/photos/12428359/pexels-photo-12428359.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      />
      <Card.Body>
        <Card.Title>Curso de IOS 2024</Card.Title>
        <Card.Text>Curso de IOS para avanzados</Card.Text>
        <Button variant="primary" onClick={makePayment}>
          Buy Now for 100
        </Button>
      </Card.Body>
    </Card>
  );
}

export default StripePayment;