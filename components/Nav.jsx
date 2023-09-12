import React from "react";
import styles from "../styles/Nav.module.css";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faMagnifyingGlass, faUser } from "@fortawesome/free-solid-svg-icons";

function Nav() {
  return (
    <>
      <div className="container">
        <div className="row">
          <nav className={styles.nav}>
            <div className={styles.nav__top}>
              <figure>
                <Image src={"/assets/Vivo.png"} width={150} height={50} />
              </figure>
             <div className={styles.input__container}> 
                <input type="text" placeholder="Search" className={styles.input} /> 
                <div className={styles.search__container}>
                <FontAwesomeIcon icon={faMagnifyingGlass} className={styles.search__icon}/>
                </div>
            </div>
            <div className={styles.account__container}> 
            <FontAwesomeIcon icon={faUser} />
            <FontAwesomeIcon icon={faCartShopping} />
            </div> 
            </div>
            <div className={styles.nav__bottom}>
              <ul className={styles.nav__links}>
                <li className={styles.nav__link}>
                  <a className={styles.link} href="/">
                    Home
                  </a>
                </li>
                <li className={styles.nav__link}>
                  <a className={styles.link} href="/">
                        Water Bottles
                  </a>
                </li>
                <li className={styles.nav__link}>
                  <a className={styles.link} href="/">
                     About us
                  </a>
                </li>
                <li className={styles.nav__link}>
                  <a className={styles.link} href="/">
                    Contact Us
                  </a>
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
