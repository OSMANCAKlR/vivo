import React from "react";
import styles from "../styles/Hero.module.css";
import heroimg from "../assets/heroimg.jpg";
import heroimg2 from "../assets/heroimg2.jpg";
import heroimg3 from "../assets/heroimg3.jpg";
import Image from "next/image";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

function Hero() {
  return (
    <section id={styles.hero}>
      <Carousel
        showStatus={false}
        swipeable
        infiniteLoop
        autoPlay
        emulateTouch
      >
        <div>
          <Image src={heroimg} className={styles.hero__img} />
        </div>
        <div>
          <Image src={heroimg2} className={styles.hero__img2} />
        </div>
        <div>
          <Image src={heroimg3} className={styles.hero__img3} />
        </div>
      </Carousel>
    </section>
  );
}

export default Hero;
