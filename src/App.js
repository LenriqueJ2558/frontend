import "bootstrap/dist/css/bootstrap.min.css";
import React from "react"; 
import { BrowserRouter, Routes, Route } from "react-router-dom"; 
import StripePayment from "./components/StripePayment"; 
import Success from "./components/Success"; 
import Cancel from "./components/Cancel"; 
import Login from "./components/login"; 
import Home from "./components/home";
import Products from "./components/Products";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./components/Dashboard";
import Cart from "./components/Cart";
import Navbar from "./components/Navbar";
import MyPurchases from './components/MyPurchases';
import Orders from "./components/Orders";
import { CartProvider } from "./contexts/CartContext";

function App() { 
  return ( 
    <CartProvider>
      <BrowserRouter> 
        <Navbar />
        <Routes> 
          <Route path="/login" element={<Login />} />
          <Route path="/success" element={<ProtectedRoute element={<Success />} />} />
          <Route path="/cancel" element={<ProtectedRoute element={<Cancel />} />} />
          <Route path="/home" element={<ProtectedRoute element={<Home />} />} />
          <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
          <Route path="/cart" element={<ProtectedRoute element={<Cart />} />} />
          <Route path="/ordenesdecompras" element={<ProtectedRoute element={<Orders />} />} />
          <Route path="/mis-compras" element={<ProtectedRoute element={<MyPurchases />} />} />
          <Route path="/" element={<StripePayment />} />
          <Route path="/products" element={<Products />} />
        </Routes> 
      </BrowserRouter> 
    </CartProvider>
  ); 
}  

export default App;