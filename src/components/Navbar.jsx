import React, { useState, useEffect, useContext } from 'react';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { NavLink, useNavigate, } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import { CartContext } from '../contexts/CartContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/Navbar.css';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const { cart,setCart } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    setUser(storedUser);
    const products=JSON.parse(localStorage.getItem("cart"));
    console.log("[PRODUCTS]",products,cart);
  }, []);

  const handleCartClick = () => {
    navigate('/cart');
  };

  const handleOrdersClick = () => {
    navigate('/ordenesdecompras');
  };

  const handleMyPurchasesClick = () => {
    navigate('/mis-compras');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to={"/products"}>My Stores</NavLink>
        <div className="collapse navbar-collapse justify-content-end">
          <ul className="navbar-nav">
            {user ? (
              <>
                <li className="nav-item position-relative">
                  <FaShoppingCart className="nav-link" onClick={handleCartClick} size={40} />
                  {cartCount > 0 && (
                    <span className="cart-count">{cartCount}</span>
                  )}
                </li>
                <li className="nav-item">
                  <button className="nav-link" onClick={handleOrdersClick}>Ordenes</button>
                </li>
                <li className="nav-item">
                  <Dropdown>
                    <Dropdown.Toggle className="nav-link" variant="link" id="dropdown-basic">
                      <FaUser size={23} />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item href="#/profile">
                        {user.username} ({user.roles.join(', ')})
                      </Dropdown.Item>
                      <Dropdown.Item onClick={handleMyPurchasesClick}>Mis Compras</Dropdown.Item>
                      <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <a className="nav-link" href="/login">Login</a>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;