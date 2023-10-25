import { useAuth } from "@/contexts/AuthContent";
import React, { useRef, useState, useEffect } from "react";
import styles from "../styles/Tickets.module.css";

function Ticket() {
  const { createPost, user } = useAuth();
  const messageRef = useRef(null);

  const handleCreatePost = async () => {
    const message = messageRef.current.value;

    try {
      await createPost({
        message,
        user,
      });
    } catch (error) {
      console.log(error.message + "this is the error");
    }
  };



  return (
    <div className="container">
      <div className="row">
        <h1 className={styles.tickets__title}>Submit a ticket!</h1>
        <p className={styles.tickets__para}>
          At Vivo, we're committed to providing you with exceptional support and
          addressing your needs promptly. Whether you have questions, encounter
          challenges, or simply want to get in touch, our team is here to help.
          Please fill out the form below to submit a support ticket, and we'll
          ensure your inquiry receives the attention it deserves.
        </p>
        <div className={styles.textarea__container}> 
        <textarea className={styles.textarea} ref={messageRef}></textarea>
        <button className={styles.submit__button} onClick={handleCreatePost}>Submit</button>
        </div>
      </div>
    </div>
  );
}

export default Ticket;
