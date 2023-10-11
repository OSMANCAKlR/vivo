import Head from "next/head";
import React, { useState } from "react";
import styles from "../styles/ContactUs.module.css";
import Image from "next/image";
import image from "../assets/heroimg.jpg";

function ContactUs() {
  // State variables to store the form input values
  const [email, setEmail] = useState("");
  const [enquiry, setEnquiry] = useState("");

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // You can handle form submission logic here, e.g., sending data to a server
    console.log("Email:", email);
    console.log("Enquiry:", enquiry);
  };

  return (
    <>
      <Head>
        <title>Vivo - Contact us</title>
        <meta name="description" content="Your Source for Premium Water Bottles" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section id="contactus">
        <div className="container">
          <div className="row">
            <h1 className={styles.ContactUs__title}>Contact Us</h1>
            <div className={styles.text__container}>
              <p>
                At Vivo, we're committed to providing you with exceptional support and addressing your needs promptly.
                <br /><br />
                Whether you have questions, encounter challenges, or simply want to get in touch, our team is here to help.
                <br /><br />
                Please fill out the form below to submit a support ticket, and we'll ensure your inquiry receives the attention it deserves.
              </p>
            </div>
          </div>
        </div>
        <div className={styles.contact_form}>
          <h2>Contact Form</h2>
          <form onSubmit={handleSubmit}>
            <div className={styles.form_group}>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className={styles.form_group}>
              <label htmlFor="enquiry">Enquiry:</label>
              <textarea
                id="enquiry"
                name="enquiry"
                value={enquiry}
                onChange={(e) => setEnquiry(e.target.value)}
                required
              ></textarea>
            </div>
            <button type="submit"className={styles["button-submit"]}>Submit</button>
          </form>
        </div>
      </section>
    </>
  );
}

export default ContactUs;