import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useQuery } from "react-query";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f5f5f5;
  min-height: 100vh;
`;

const Cart = styled.div`
  background: white;
  border-radius: 8px;
  padding: 20px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 80%;
  max-width: 800px;
  margin: 20px;
`;

const CartItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #ddd;
`;

const CartItemTitle = styled.h3`
  margin: 0;
`;

const CartItemPrice = styled.span`
  font-size: 18px;
  font-weight: bold;
`;

const cartItems = [
  { id: 1, name: "Apple Watch Series 4 GPS", price: 399, quantity: 1 },
  { id: 2, name: "Apple Homepod", price: 399, quantity: 1 },
  // Add other items here
];

const fetchCartItems = async () => {
  // Replace with your API call if needed
  return cartItems;
};

const Checkout: React.FC = () => {
  const { data, error, isLoading } = useQuery("cartItems", fetchCartItems);

  const total =
    data?.reduce((sum, item) => sum + item.price * item.quantity, 0) || 0;

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading cart items</div>;

  return (
    <Container>
      <h1>Carrinho de Compras</h1>
      <Cart>
        {data?.map((item) => (
          <CartItem key={item.id}>
            <CartItemTitle>{item.name}</CartItemTitle>
            <CartItemPrice>R${item.price}</CartItemPrice>
          </CartItem>
        ))}
        <div>
          <h2>Total: R${total}</h2>
          <button>Finalizar Compra</button>
        </div>
      </Cart>
    </Container>
  );
};

export default Checkout;
