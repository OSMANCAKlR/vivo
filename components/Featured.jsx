import React, { useContext, useState, useEffect } from "react";
import styles from "../styles/Featured.module.css";

import Product from "./ui/Product";
import { useRouter } from "next/router";
import CartContext from "@/contexts/CartContext";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/contexts/AuthContent";

function Featured() {
  const router = useRouter();
  const { cart, addToCart } = useContext(CartContext);
  const { getAllProducts } = useAuth();
  const [products, setProducts] = useState([]); // Store the fetched products

  useEffect(() => {
    // Fetch products when the component loads
    handleGetAllProducts();
  }, []);

  function addProductToCart(product) {
    const productExists = cart.find((item) => item.id === product.id);
    if (productExists) {
      return;
    }
    addToCart(product);
  }

  const handleGetAllProducts = async () => {
    try {
      const fetchedProducts = await getAllProducts();
      setProducts(fetchedProducts);
    } catch (error) {
      console.log(error.message + "this is the error");
    }
  };

  const handleProductClick = (selectedProduct) => {
    const productSlug = selectedProduct.name
      .toLowerCase()
      .replace(/\s+/g, "-");
    const productPageUrl = `/products/${productSlug}`;

    router.push(productPageUrl);
  };

   return (
    <section id="featured">
      <div className="container">
        <div className="row">
          <h2>Our latest bottles</h2>
          <div className={styles.featured__wrapper}>
            {products.slice(0,4).map((product) => (
              <div className={styles.product__container} key={product.id}>
                <figure onClick={() => handleProductClick(product)} className={styles.product__figure}>
                  <img src={product.image} className={styles.product__img} alt={product.name} width={200} height={200} />
                </figure>
                <Product
                  title={product.name}
                  price={product.price}
                  key={product.id}
                />
                {cart.find((item) => item.id === product.id) ? (
                  <Link href={`/cart`} className={styles.product__Link}>
                    <button className={styles.product__checkout}>
                      Checkout
                    </button>
                  </Link>
                ) : (
                  <button
                    className={styles.product__addtocart}
                    onClick={() => addProductToCart(product)}
                  >
                    Add to cart
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Featured;