import React from "react";
import styles from "../../styles/Product.module.css";
import Image from "next/image";
import Rating from "./Rating";
import Link from "next/link";

function Product({ image, title, price, rating }) {



  return (
    <div className={styles.product__container}>
      <div className={styles.bottom__container}>
        <h3 className={styles.product__title}>{title}</h3>
        <div className={styles.price__container}>
          <span className={styles.product__price}>${price}</span>
        </div>
      </div>
    </div>
  );
}

export default Product;
