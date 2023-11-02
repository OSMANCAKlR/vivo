import { useAuth } from "@/contexts/AuthContent";
import React, { useRef, useState } from "react";
import styles from "../styles/Admin.module.css";

function Admin() {
  const { getAllPosts, createProduct, user } = useAuth();
  const [tickets, setTickets] = useState([]); // Store the fetched tickets
  const [bottleName, setBottleName] = useState("");
  const [bottlePrice, setBottlePrice] = useState("");
  const [bottleDescription, setBottleDescription] = useState("");
  const [bottleImageLink, setBottleImageLink] = useState("");
  const [message, setMessage] = useState("");

  const handleGetAllPosts = async () => {
    try {
      const fetchedTickets = await getAllPosts();
      setTickets(fetchedTickets);
    } catch (error) {
      console.log(error.message + "this is the error");
    }
  };

  const handleCreatePost = async () => {
    const name = bottleName;
    const price = bottlePrice;
    const description = bottleDescription;
    const image = bottleImageLink;
  
    try {
      await createProduct({ name, price, description, image });
      // Reset the form fields and set a success message
      setBottleName("");
      setBottlePrice("");
      setBottleDescription("");
      setBottleImageLink("");
      setMessage("Product added successfully!");
    } catch (error) {
      console.log(error.message + "this is the error");
    }
  };

  const adminUserIds = [
    "XzIcjpeQIYTbTdHExDbyCbOfFA42",
    "Mh9kkgXQ8dZBG2ijXiB0GXxDTHN2",
  ];
  const isUserAdmin = adminUserIds.includes(user?.uid);

  if (isUserAdmin) {
    return (
      <div className="container">
        <div className="row">
          <h1 className={styles.admin__title}>
            Welcome to the admin dashboard!
          </h1>
          <p className={styles.admin__para}>Add a bottle up for sale here!</p>
          <div className={styles.product__form}>
            <input
              className={styles.input}
              type="text"
              placeholder="Bottle Name"
              value={bottleName}
              onChange={(e) => setBottleName(e.target.value)}
            />

            <input
              className={styles.input}
              type="text"
              placeholder="Bottle Price"
              value={bottlePrice}
              onChange={(e) => setBottlePrice(e.target.value)}
            />

            <input
              className={styles.input}
              type="text"
              placeholder="Bottle Description"
              value={bottleDescription}
              onChange={(e) => setBottleDescription(e.target.value)}
            />

            <input
              className={styles.input}
              type="text"
              placeholder="Bottle Image URL"
              value={bottleImageLink}
              onChange={(e) => setBottleImageLink(e.target.value)}
            />
            <button
              className={styles.getAllPosts__button}
              onClick={handleCreatePost}
            >
              Add product
            </button>
            {message && <p className={styles.successMessage}>{message}</p>}
          </div>
          <p className={styles.admin__para}>
            Below you can receive customer support tickets to assist them!
          </p>
          <button
            className={styles.getAllPosts__button}
            onClick={handleGetAllPosts}
          >
            Receive support tickets
          </button>
          {tickets.length > 0 && (
            <div className={styles.tickets__container}>
              <h2 className={styles.tickets_title}>All Tickets</h2>
              {tickets.map((ticket, index) => (
                <div className={styles.ticket__information} key={index}>
                  <p>
                    <strong>Name: </strong> {ticket.name}
                  </p>
                  <p>
                    <strong>Email: </strong> {ticket.email}
                  </p>
                  <p>
                    <strong>Message: </strong> {ticket.message}
                  </p>
                  <p>
                    <strong>Uid: </strong> {ticket.uid}
                  </p>
                  <hr className={styles.line} />{" "}
                  {/* Add a horizontal line for separation */}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  } else {
    return (
      <div className="container">
        <div className="row">
          <p>You do not have permission to access this page.</p>
        </div>
      </div>
    );
  }
}

export default Admin;
