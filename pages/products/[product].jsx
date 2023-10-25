import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "../../styles/ProductPage.module.css";
import CartContext from "@/contexts/CartContext";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/contexts/AuthContent";

function Product() {
  const { cart, addToCart } = useContext(CartContext);
  const { getAllProducts } = useAuth();
  const [products, setProducts] = useState([]); 

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

  useEffect(() => {
    // Fetch products when the component loads
    handleGetAllProducts();
  }, []);

  const router = useRouter();
  const { product } = router.query;

  // Check if the product variable is defined
  if (!product) {
    // Handle the case when product is not defined 
    return null;
  }

  // Remove spaces from the URL parameter
  const formattedProduct = product.replace(/-/g, " ");

  // Find the product that matches the formatted product name from the URL
  const selectedProduct = products.find(
    (p) =>
      p.name.toLowerCase().replace(/ /g, "") ===
      formattedProduct.toLowerCase().replace(/ /g, "")
  );

  if (!selectedProduct) {
    return <div>Product not found</div>;
  }

  return (
    <div className="container">
      <div className="row">
        <div className={styles.product__wrapper}>
          <div className={styles.product__container}>
            <img className={styles.image} src={selectedProduct.image} alt={selectedProduct.name} />
          </div>
          <div className={styles.description__container}>
            <h1 className={styles.product__title}>{selectedProduct.name}</h1>
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
