import React, { useContext } from "react";
import styles from "../styles/Featured.module.css";

import Product from "./ui/Product";
import { products } from "@/data";
import { useRouter } from "next/router";
import CartContext from "@/contexts/CartContext";
import Link from "next/link";
import Image from "next/image";
function Featured() {
  const router = useRouter();
  const { cart, addToCart } = useContext(CartContext);

  function addProductToCart(product) {
    const productExists = cart.find((item) => item.id === product.id);
    if (productExists) {
      return;
    }
    addToCart(product);
  }

  const handleProductClick = (selectedProduct) => {
    const productSlug = selectedProduct.title
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
            {products.map((product) => (
              <div className={styles.product__container} key={product.id}>
                <figure  onClick={() => handleProductClick(product)} className={styles.product__figure}>
                  <Image src={product.image} className={styles.product__img} />
                </figure>
                <Product
                  title={product.title}
                  price={product.price}
                  rating={product.rating}
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
