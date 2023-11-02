import Head from "next/head";
import React from "react";
import styles from "../styles/Aboutus.module.css";
import Image from "next/image";
import image from "../assets/heroimg.jpg";
function aboutus() {
  return (
    <>
      <Head>
        <title>Vivo - About Us</title>
        <meta
          name="description"
          content="Your Source for Premium Water Bottles"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section id="aboutus">
        <div className="containe">
          <div className="row">
            <h1 className={styles.aboutus__title}>About Us</h1>
            <div className={styles.text__container}>
              <p className={styles.aboutus__para}>
                At Vivo, we are passionate about hydration and sustainability.
                We believe that staying hydrated is essential for a healthy
                life, and we are committed to providing you with the finest
                water bottles that not only keep you refreshed but also help
                reduce plastic waste.
              </p>
              <figure className={styles.figure}>
                <Image src={image} className={styles.image} />
              </figure>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default aboutus;
