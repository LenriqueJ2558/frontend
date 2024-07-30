import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCart((state) => {
            const DATA = [...storedCart]
            return [...state, ...DATA]
        });
    }, []);

    useEffect(() => {
        console.log("[UPDATE-STATE]", cart)
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product) => {
        setCart((prevCart) => {
            const existingProduct = prevCart.find(item => item._id === product._id);
            if (existingProduct) {
                return prevCart.map(item =>
                    item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
                );
            } else {
                return [...prevCart, { ...product, quantity: 1 }];
            }
        });
    };

    const incrementQuantity = (productId) => {
        setCart(prevCart =>
            prevCart.map(item =>
                item._id === productId ? { ...item, quantity: item.quantity + 1 } : item
            )
        );
    };

    const decrementQuantity = (productId) => {
        setCart(prevCart =>
            prevCart.map(item =>
                item._id === productId ? { ...item, quantity: Math.max(item.quantity - 1, 1) } : item
            )
        );
    };

    const removeFromCart = (productId) => {
        setCart(prevCart => prevCart.filter(item => item._id !== productId));
    };

    return (
        <CartContext.Provider value={{
            cart,
            addToCart,
            incrementQuantity,
            decrementQuantity,
            removeFromCart,
            setCart
        }}>
            {children}
        </CartContext.Provider>
    );
};