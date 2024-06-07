import React, { useEffect, useState } from "react";
import Cart from "../components/Cart";
import { getProducts } from "@/services/getAPI";
import styled from "styled-components";
import { motion } from "framer-motion";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { FaCartShopping } from "react-icons/fa6";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f5f5f5;
`;

const MainSection = styled.div`
  margin-top: 100px;
  min-height: 200vh;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 20px;
  background-color: #0f52ba;
  color: white;
`;

const CompanyTitle = styled.div`
  display: flex;
  align-items: baseline;
  height: min-content;
  gap: 10px;
`;

const CartButton = styled.button`
  background: white;
  border: none;
  color: black;
  font-size: 16px;
  border-radius: 4px;
  padding: 12px;
  display: flex;
  align-items: center;
  gap: 15px;
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  max-width: 1200px;
  margin: 20px;

  @media only screen and (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media only screen and (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ProductCard = styled(motion.div)`
  background: white;
  border-radius: 8px;
  padding: 20px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: grid;
  grid-template-columns: auto auto;
  align-items: center;
  position: relative;
`;

const ProductImage = styled.img`
  grid-column: span 2;
  margin: 0 auto;
`;

const ProductTitle = styled.h3`
  margin: 10px 0;
  text-align: start;
`;

const ProductPrice = styled.span`
  font-size: 18px;
  font-weight: bold;
  padding: 4px;
  background-color: black;
  color: white;
  border-radius: 5px;
  width: fit-content;
  height: min-content;
  justify-self: end;
  align-self: end;
`;

const ProductDescription = styled.p`
  margin: 30px 0 50px 0;
  grid-column: span 2;
  text-align: start;
  color: gray;
  font-weight: lighter;
`;

const ProductButton = styled.button`
  grid-column: span 2;
  padding: 10px 4px;
  background-color: #0f52ba;
  color: white;
  border-radius: 0 0 10px 10px;
  width: 100%;
  position: absolute;
  bottom: 0;
  border: none;
  text-transform: uppercase;
  font-size: 18px;
`;

const Footer = styled.div`
  width: 100%;
  background-color: #eeeeee;
  font-weight: lighter;
  text-align: center;
  padding: 10px;

  @media only screen and (min-width: 768px) {
    padding: 20px;
  }
`;

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  photo: string;
  quantity: number;
}

const Home: React.FC = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  const [products, setProducts] = useState<Product[]>([]);
  const [shopCart, setShopCart] = useState<Product[]>([]);

  const [productQuantities, setProductQuantities] = useState<{
    [key: number]: number;
  }>({});

  useEffect(() => {
    setIsLoading(true);
    const fetchProducts = async () => {
      getProducts()
        .then((response) => {
          setIsLoading(false);
          setProducts(response?.products);
        })
        .catch((error) => {
          setIsLoading(false);
          setError(error);
        });
    };
    fetchProducts();
  }, []);

  const addToCart = (product: Product) => {
    // Verifica se o produto já está no carrinho
    const existingProductIndex = shopCart.findIndex(
      (item) => item.id === product.id
    );

    if (existingProductIndex !== -1) {
      // Se o produto já está no carrinho, apenas atualize a quantidade
      setShopCart((prevCart) => {
        const updatedCart = [...prevCart];
        updatedCart[existingProductIndex].quantity += 1;
        return updatedCart;
      });
    } else {
      // Se o produto não está no carrinho, adicione-o
      setShopCart((prevCart) => [...prevCart, { ...product, quantity: 1 }]);
    }

    setIsCartOpen(true);
  };

  const incrementItem = (productId: number) => {
    setProductQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: (prevQuantities[productId] || 0) + 1,
    }));

    setShopCart((prevCart) => {
      const updatedCart = [...prevCart];
      const existingProductIndex = updatedCart.findIndex(
        (item) => item.id === productId
      );
      const updatedProduct = { ...updatedCart[existingProductIndex] };
      updatedProduct.quantity += 1;
      updatedProduct.price *= updatedProduct.quantity; // Atualiza o preço multiplicando pela nova quantidade
      updatedCart[existingProductIndex] = updatedProduct;
      return updatedCart;
    });
  };

  const decrementItem = (productId: number) => {
    setProductQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: Math.max((prevQuantities[productId] || 0) - 1, 0),
    }));

    setShopCart((prevCart) => {
      const updatedCart = [...prevCart];
      const existingProductIndex = updatedCart.findIndex(
        (item) => item.id === productId
      );
      const updatedProduct = { ...updatedCart[existingProductIndex] };
      updatedProduct.quantity -= 1;
      updatedProduct.price *= updatedProduct.quantity; // Atualiza o preço multiplicando pela nova quantidade
      if (updatedProduct.quantity === 0) {
        // Remove o produto do carrinho se a quantidade for zero
        updatedCart.splice(existingProductIndex, 1);
      } else {
        updatedCart[existingProductIndex] = updatedProduct;
      }
      return updatedCart;
    });
  };

  const removeFromCart = (productId: number) => {
    setShopCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  return (
    <Container>
      <Header>
        <CompanyTitle>
          <h1>MKS</h1>
          <p>Sistemas</p>
        </CompanyTitle>
        <CartButton onClick={() => setIsCartOpen(!isCartOpen)}>
          <FaCartShopping /> {shopCart.length}
        </CartButton>
      </Header>
      <MainSection>
        {isLoading ? (
          <ProductGrid>
            {Array.from({ length: 8 }).map((_, index) => (
              <Skeleton key={index} width={400} height={300} />
            ))}
          </ProductGrid>
        ) : error ? (
          <div>Error loading products</div>
        ) : (
          <ProductGrid>
            {products?.map((product) => (
              <ProductCard key={product.id} whileHover={{ scale: 1.05 }}>
                <ProductImage
                  src={product.photo}
                  alt={product.name}
                  width={150}
                />
                <ProductTitle>{product.name}</ProductTitle>
                <ProductPrice>R$ {product.price}</ProductPrice>
                <ProductDescription>{product.description}</ProductDescription>
                <ProductButton
                  style={{ cursor: "pointer" }}
                  onClick={() => addToCart(product)}
                >
                  Comprar
                </ProductButton>
              </ProductCard>
            ))}
          </ProductGrid>
        )}
        <Cart
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          cartItems={shopCart}
          productQuantities={productQuantities}
          removeItem={removeFromCart}
          incrementItem={incrementItem}
          decrementItem={decrementItem}
        />
      </MainSection>
      <Footer>
        <p>MKS Sistemas © Todos os direitos reservados</p>
      </Footer>
    </Container>
  );
};

export default Home;
