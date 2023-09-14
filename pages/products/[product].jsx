import React, { useContext } from "react";
import { useRouter } from "next/router";
import { products } from "../../data"; // Assuming your data.js is in a folder named data
import styles from "../../styles/ProductPage.module.css";
import CartContext from "@/contexts/CartContext";
import Link from "next/link";
import Image from "next/image";

function Product() {
  const { cart, addToCart } = useContext(CartContext);

  function addProductToCart(product) {
    const productExists = cart.find((item) => item.id === product.id);
    if (productExists) {
      return;
    }
    addToCart(product);
  }

  const router = useRouter();
  const { product } = router.query;

  // Check if the 'product' variable is defined
  if (!product) {
    // Handle the case when 'product' is not defined (initial render)
    return null;
  }

  // Remove spaces from the URL parameter
  const formattedProduct = product.replace(/-/g, " ");

  // Find the product that matches the formatted product name from the URL
  const selectedProduct = products.find(
    (p) =>
      p.title.toLowerCase().replace(/ /g, "") ===
      formattedProduct.toLowerCase().replace(/ /g, "")
  );

  if (!selectedProduct) {
    // Handle the case when the product is not found
    return <div>Product not found</div>;
  }

  return (
    <div className="container">
      <div className="row">
        <div className={styles.product__wrapper}>
          <div className={styles.product__container}>
            <Image src={selectedProduct.image} alt={selectedProduct.title} />
          </div>
          <div className={styles.description__container}>
            <h1 className={styles.product__title}>{selectedProduct.title}</h1>
            <p className={styles.product__description}>
              {selectedProduct.description}
            </p>
            <p className={styles.product__price}>${selectedProduct.price}</p>
            {cart.find((item) => item.id === selectedProduct.id) ? (
              <Link href={`/cart`} className={styles.product__Link}>
                <button className={styles.product__checkout}>Checkout</button>
              </Link>
            ) : (
              <button
                className={styles.product__addtocart}
                onClick={() => addProductToCart(selectedProduct)}
              >
                Add to cart
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
