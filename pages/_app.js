import Nav from "@/components/Nav";
import CartContext from "@/contexts/CartContext";
import "@/styles/globals.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { useState } from "react";
import { products } from "@/data";
import { AuthContextProvider } from "@/contexts/AuthContent";
config.autoAddCss = false;

export default function App({ Component, pageProps }) {
  const [cart, setCart] = useState([]);

  function addToCart(product) {
    setCart([...cart, { ...product, quantity: 1 }]);
  }

  function changeQuantity(product, quantity) {
    setCart(
      cart.map((item) => {
        return item.id === product.id ? { ...item, quantity: +quantity } : item;
      })
    );
  }

  function removeItem(item) {
    setCart(cart.filter((product) => product.id !== item.id));
  }

  function numberOfItems() {
    let counter = 0;
    cart.forEach((item) => {
      counter += item.quantity;
    });
    return counter;
  }
  return (
    <>
    <AuthContextProvider>
      <CartContext.Provider
        value={{
          cart,
          addToCart,
          changeQuantity,
          removeItem,
          products,
          setCart,
          numberOfItems,
        }}
      >
        <Nav />
        <Component {...pageProps} />
      </CartContext.Provider>
    </AuthContextProvider>
    </>
  );
}
