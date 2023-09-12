import { faStar, faStarHalf } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styles from '../../styles/Rating.module.css'

export default function Rating({ rating }) {
  return (
    <div className={styles.product__ratings}>
      {new Array(Math.floor(rating)).fill(0).map((_, index) => (
        <FontAwesomeIcon icon={faStar} key={index} />
      ))}
      {!Number.isInteger(rating) && (
        <FontAwesomeIcon icon={faStarHalf} />
      )}
    </div>
  );
}