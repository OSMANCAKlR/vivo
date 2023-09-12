import React from "react";
import styles from "../styles/Featured.module.css";
import Product from "./ui/Product";
import { products } from "@/data";
function Featured() {
  return (
    <section id="featured">
      <div className="container">
        <div className="row">
          <h2>Our latest bottles</h2>
          <div className={styles.featured__wrapper}>
            {products.map((product) => (
              <Product
                title={product.title}
                price={product.price}
                image={product.image}
                rating={product.rating}
                key={product.id}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Featured;
