import { useAuth } from '@/contexts/AuthContent';
import React, { useRef, useState } from 'react';
import styles from "../styles/Admin.module.css";

function Admin() {
    const { getAllPosts, createProduct, user } = useAuth();
    const [tickets, setTickets] = useState([]); // Store the fetched tickets
    const bottleNameRef = useRef(null);
    const bottlePriceRef = useRef(null);
    const bottleDescriptionRef = useRef(null);
    const bottleImageLinkRef = useRef(null);

    const handleGetAllPosts = async () => {
        try {
            const fetchedTickets = await getAllPosts();
            setTickets(fetchedTickets);
        } catch (error) {
            console.log(error.message + "this is the error");
        }
    };

    const handleCreatePost = async () => {
        const name = bottleNameRef.current.value;
        const price = bottlePriceRef.current.value;
        const description = bottleDescriptionRef.current.value;
        const image = bottleImageLinkRef.current.value;

        try {
            await createProduct({
                name,
                price,
                description,
                image,
            });
        } catch (error) {
            console.log(error.message + "this is the error");
        }
    };

    const adminUserIds = ["XzIcjpeQIYTbTdHExDbyCbOfFA42"];
    const isUserAdmin = adminUserIds.includes(user?.uid);

    if (isUserAdmin) {
        return (
            <div className="container">
                <div className="row">
                    <h1 className={styles.admin__title}>Welcome to the admin dashboard!</h1>
                    <p className={styles.admin__para}>Add a bottle up for sale here!</p>
                    <div className={styles.product__form}>
                        <input ref={bottleNameRef} className={styles.input} type="text" placeholder='Bottle Name' />
                        <input ref={bottlePriceRef} className={styles.input} type="text" placeholder='Bottle Price' />
                        <input ref={bottleDescriptionRef} className={styles.input} type="text" placeholder='Bottle Description' />
                        <input ref={bottleImageLinkRef} className={styles.input} type="text" placeholder='Bottle Image URL' />
                        <button className={styles.getAllPosts__button} onClick={handleCreatePost}>Add product</button>
                    </div>
                    <p className={styles.admin__para}>Below you can receive customer support tickets to assist them!</p>
                    <button className={styles.getAllPosts__button} onClick={handleGetAllPosts}>Receive support tickets</button>
                    {tickets.length > 0 && (
                        <div className={styles.tickets__container}>
                            <h2 className={styles.tickets_title}>All Tickets</h2>
                            {tickets.map((ticket, index) => (
                                <div className={styles.ticket__information} key={index}>
                                    <p><strong>Name: </strong> {ticket.name}</p>
                                    <p><strong>Email: </strong> {ticket.email}</p>
                                    <p><strong>Message: </strong> {ticket.message}</p>
                                    <p><strong>Uid: </strong> {ticket.uid}</p>
                                    <hr className={styles.line} /> {/* Add a horizontal line for separation */}
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
