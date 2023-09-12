import React from "react";
import styles from "../../styles/Product.module.css";
import Image from "next/image";
import Rating from "./Rating";
import Link from "next/link";

function Product({ image, title, price, rating }) {
  return (
    <div className={styles.product__container}>
      <figure className={styles.product__figure}>
        <Image src={image} className={styles.product__img} />
      </figure>
      <div className={styles.bottom__container}>
        <h3 className={styles.product__title}>{title}</h3>
        <div className={styles.price__container}>
          <span className={styles.product__price}>{price}</span>
          <Rating rating={rating} />
        </div>
        <button className={styles.product__button}>Add to Cart</button>
      </div>
    </div>
  );
}

export default Product;
