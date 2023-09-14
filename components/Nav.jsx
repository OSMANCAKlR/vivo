import React, { useContext, useEffect, useState } from "react";
import styles from "../styles/Nav.module.css";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faMagnifyingGlass,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import CartContext from "@/contexts/CartContext";
import SearchBar from "./SearchBar";

function Nav() {
  const { cart, addToCart } = useContext(CartContext);
  const [numberOfItems, setNumberOfItems] = useState(0);

  useEffect(() => {
    // update numberOfItems whenever the cart changes
    let counter = 0;
    cart.forEach((item) => {
      counter += item.quantity;
    });
    setNumberOfItems(counter);
  }, [cart]);

  console.log();

  const notReadyClick = () => {
    window.alert("Sorry, The account system isn't quite ready yet!");
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <nav className={styles.nav}>
            <div className={styles.nav__top}>
              <Link href="/">
                <figure>
                  <Image src={"/assets/Vivo.png"} width={150} height={50} />
                </figure>
              </Link>
                <SearchBar/>
              <div className={styles.account__container}>
                <FontAwesomeIcon icon={faUser} className={styles.cart__icon} onClick={notReadyClick}/>
                <Link href="/cart">
                  <div className={styles.cart__container}>
                    <FontAwesomeIcon
                      icon={faCartShopping}
                      className={styles.cart__icon}
                    />
                    {numberOfItems > 0 && (
                      <span className={styles.cart__length}>
                        {numberOfItems}
                      </span>
                    )}
                  </div>
                </Link>
              </div>
            </div>
            <div className={styles.nav__bottom}>
              <ul className={styles.nav__links}>
                <li className={styles.nav__link}>
                  <Link className={styles.link} href="/">
                    Home
                  </Link>
                </li>
                <li className={styles.nav__link}>
                  <Link className={styles.link} href="/">
                    Water Bottles
                  </Link>
                </li>
                <li className={styles.nav__link}>
                  <Link className={styles.link} href="/aboutus">
                    About us
                  </Link>
                </li>
                <li className={styles.nav__link}>
                  <Link className={styles.link} href="/contactus">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}

export default Nav;
