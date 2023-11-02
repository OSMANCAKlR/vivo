import React, { useCallback, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "../../styles/ProductPage.module.css";
import CartContext from "@/contexts/CartContext";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/contexts/AuthContent";
import { Rating } from "react-simple-star-rating";

function Product() {
  const { cart, addToCart } = useContext(CartContext);
  const { getAllProducts, getProductReviews } = useAuth();
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [review, setReview] = useState({
    rateAverage: 0,
    reviewCount: 0,
  });

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

  const handleGetProductReviews = useCallback(async () => {
    try {
      const reviews = await getProductReviews({ product: selectedProduct });
      const total = reviews.reduce(
        (accumulator, review) => accumulator + parseFloat(review.rating),
        0
      );
      const reviewCount = reviews.length;
      setReview({
        rateAverage: total / reviewCount,
        reviewCount,
      });
    } catch (error) {
      console.log(error.message + "this is the error");
    }
  }, [selectedProduct]);

  const router = useRouter();

  useEffect(() => {
    handleGetAllProducts();
    const { product } = router.query;

    if (product) {
      const formattedProduct = product.replace(/-/g, " ");

      const x = products.find(
        (p) =>
          p.name.toLowerCase().replace(/ /g, "") ===
          formattedProduct.toLowerCase().replace(/ /g, "")
      );

      setSelectedProduct(x);
      handleGetProductReviews();
    }
  }, [router.isReady, handleGetAllProducts, handleGetProductReviews]);

  if (!router.isReady || !selectedProduct) {
    return <div>Loading...</div>;
  }

  console.log(review);

  return (
    <div className="container">
      <div className="row">
        <div className={styles.product__wrapper}>
          <div className={styles.product__container}>
            <img
              className={styles.image}
              src={selectedProduct.image}
              alt={selectedProduct.name}
            />
          </div>
          <div className={styles.description__container}>
            <h1 className={styles.product__title}>{selectedProduct.name}</h1>
            <p className={styles.product__description}>
              {selectedProduct.description}
            </p>
            <p className={styles.product__price}>${selectedProduct.price}</p>
            <p className={styles.product__price}>
              <Rating
                size={16}
                style={{ margin: "0 8px 0 0" }}
                allowFraction={true}
                readonly={true}
                initialValue={review.rateAverage}
              />
              {review.rateAverage} ({review.reviewCount} reviews)
            </p>
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
