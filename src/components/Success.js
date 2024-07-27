import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Success = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const confirmPayment = async () => {
      const orderId = new URLSearchParams(window.location.search).get("orderId");
      const token = localStorage.getItem("token");

      if (orderId && token) {
        try {
          const response = await fetch("https://proyectotiendaonline.onrender.com/api/confirm-order", {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({ orderId }),
          });

          if (!response.ok) {
            throw new Error("Error al confirmar el pago");
          }

          const data = await response.json();
          console.log("Orden confirmada:", data.order);
        } catch (error) {
          console.error("Error al confirmar el pago", error);
        }
      } else {
        navigate("/login");
      }
    };

    confirmPayment();
  }, [navigate]);

  return (
    <div>
      <h1>¡Pago exitoso!</h1>
      <p>Gracias por tu compra. Tu pedido ha sido procesado exitosamente.</p>
    </div>
  );
};

export default Success;