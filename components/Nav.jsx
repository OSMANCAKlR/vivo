import React, { useContext, useEffect, useState } from "react";
import styles from "../styles/Nav.module.css";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faTruckMonster
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import CartContext from "@/contexts/CartContext";
import SearchBar from "./SearchBar";
import { useAuth } from "@/contexts/AuthContent";

function Nav() {
  const { user, googleSignIn, logOut } = useAuth();

  const [loading, setLoading] = useState(false);

  const handleSignin = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const checkAuthentication = async () => {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 500));
      setLoading(false);
    };
    checkAuthentication();
  }, [user, setLoading]);
  
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
              {loading ? (
              <div className={styles.skeleton__container}>
                <div className={styles.skeleton__loadingState}> </div>
                <div className={styles.skeleton__loadingState}> </div>
              </div>
            ) : !user ? (
              <>
                <button onClick={handleSignin} className={styles.nav__login}>
                  Login
                </button>
                <button onClick={handleSignin} className={styles.nav__login}>
                  Sign in
                </button>
                <Link href="/sign-up" className={styles.nav__login}>
                      New Sign Up
                    </Link>
              </>
            ) : (
              <div className={styles.account__container}>
                <div>
                {user.photoURL ? (
                  <Image
                    src={user.photoURL}
                    width={60}
                    height={60}
                    className={styles.account__icon}
                  /> 
                  ) : (
                    <p style={{ fontSize: "14px" }}>{user.displayName}</p>
                      )}
                </div>
                <div className={styles.account__dropdown}>
                    <Link className={styles.account__links}  href="/profile">
                      Profile
                    </Link>
                    <Link className={styles.account__links}  href="/account-settings">
                      Account Settings
                    </Link>
                    <span className={styles.account__links} onClick={handleSignOut}>Log Out</span>
                </div>
              </div>
            )}
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
