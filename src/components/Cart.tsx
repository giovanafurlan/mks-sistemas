import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const CartContainer = styled(motion.div)`
  position: fixed;
  top: 0;
  right: 0;
  width: 300px;
  height: 100%;
  background: #0f52ba;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  color: white;
`;

const CartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding: 20px;
`;

const CartItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  background: white;
  padding: 10px;
  border-radius: 5px;
  color: black;
  margin: 15px;
  padding: 20px 10px;
  position: relative;
  align-items: center;
`;

const CartItemTitle = styled.h3`
  margin: 0;
  font-size: 15px;
  font-weight: lighter;
  max-width: fit-content;
  flex-wrap: wrap;
`;

const CartItemImage = styled.img``;

const CartItemPrice = styled.span`
  font-size: 15px;
  font-weight: bold;
`;

const CartCloseButton = styled.button`
  background: black;
  border: none;
  font-size: 20px;
  cursor: pointer !important;
  color: white;
  padding: 4px 10px;
  border-radius: 100%;
`;

const CartCloseButton2 = styled.button`
  background: black;
  border: none;
  font-size: 14px;
  cursor: pointer;
  color: white;
  padding: 2px 6px;
  border-radius: 100%;
  position: absolute;
  top: -10px;
  right: -10px;
`;

const IncremetDiv = styled.div`
  display: flex;
  border: 1px solid gray;
  border-radius: 5px;
  width: min-content;
  height: min-content;
  align-items: center;
  margin: 0 auto;
`;

const Amount = styled.p`
  margin: 0;
  font-size: 12px;
`;

const IncrementButton = styled.button`
  border: none;
  background: none;
`;

const DecrementButton = styled.button`
  border: none;
  background: none;
`;

const TotalContainer = styled.div`
  margin-top: auto;
  padding-top: 20px;
  color: white;
`;

const Total = styled.h2`
  margin-bottom: 90px;
  padding: 0 20px 0 20px;
`;

const FinishButton = styled.button`
  width: 100%;
  padding: 15px 0;
  background: black;
  color: white;
  border: none;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  margin-top: 20px;
  position: absolute;
  bottom: 0;
`;

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: {
    photo: any;
    id: number;
    name: string;
    price: number;
    quantity: number;
  }[];
  productQuantities: any;
  incrementItem: (product: number) => void;
  decrementItem: (product: number) => void;
  removeItem: (id: number) => void;
}

const Cart: React.FC<CartProps> = ({
  isOpen,
  onClose,
  cartItems,
  productQuantities,
  incrementItem,
  decrementItem,
  removeItem,
}) => {
  const total =
    cartItems?.reduce((sum, item) => sum + item.price * cartItems.length, 0) ||
    0;

  console.log("cartItems", cartItems);

  return (
    <CartContainer
      initial={{ x: "100%" }}
      animate={{ x: isOpen ? "0%" : "100%" }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <CartHeader>
        <h2>Carrinho de Compras</h2>
        <CartCloseButton onClick={onClose}>×</CartCloseButton>
      </CartHeader>
      {cartItems?.map((item) => (
        <CartItem key={item.id}>
          <CartCloseButton2 onClick={() => removeItem(item.id)}>
            ×
          </CartCloseButton2>
          <CartItemImage src={item.photo} alt={item.name} width={50} />
          <CartItemTitle>{item.name}</CartItemTitle>
          <IncremetDiv>
            <IncrementButton onClick={() => incrementItem(item.id)}>
              +
            </IncrementButton>
            <Amount>{productQuantities[item.id] || 0}</Amount>
            <DecrementButton onClick={() => decrementItem(item.id)}>
              -
            </DecrementButton>
          </IncremetDiv>
          <CartItemPrice>R$ {item.price.toString().split('.')[0]}</CartItemPrice>
        </CartItem>
      ))}
      <TotalContainer>
        <Total>Total: R$ {total}</Total>
        <FinishButton>Finalizar Compra</FinishButton>
      </TotalContainer>
    </CartContainer>
  );
};

export default Cart;
