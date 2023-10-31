import { useAuth } from "@/contexts/AuthContent";
import styles from "../styles/Profile.module.css";
import { useEffect, useState } from "react";

function Profile() {
  const [orders, setOrders] = useState([]);
  const { getOrderByUid } = useAuth(); // Remove user from here

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedOrders = await getOrderByUid();
        setOrders(fetchedOrders);
      } catch (error) {
        console.log(error.message + "this is the error");
      }
    };

    fetchData();
  }, [getOrderByUid]);

  return (
    <div className="container">
      <div className="row">
        <h1>Profile</h1>
        <div className={styles.orderhistory__container}>
          <p className={styles.order__title}>Order history</p>
          {orders.length > 0 && (
            <div className={styles.order__container}>
              {orders.map((order, index) => (
                <div className={styles.order__information} key={index}>
                  <p>
                    <strong>Products: </strong>
                    {order.products.map((product, productIndex) => (
                      <span key={productIndex}>
                        {product.name} ({product.price})
                        {productIndex < order.products.length - 1 ? ', ' : ''}
                      </span>
                    ))}
                  </p>
                  <p>
                    <strong>Price: </strong>
                    ${calculateTotalPrice(order.products).toFixed(2)}
                  </p>
                  <p>
                    <strong>Date:</strong> {order.time} {order.date} 
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function calculateTotalPrice(products) {
  return products.reduce((total, product) => total + parseFloat(product.price), 0);
}

export default Profile;
