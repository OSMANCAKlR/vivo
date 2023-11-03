import { useAuth } from "@/contexts/AuthContent";
import styles from "../styles/Profile.module.css";
import { useEffect, useState } from "react";
import { Rating } from "react-simple-star-rating";

function Profile() {
  const [orders, setOrders] = useState([]);
  const { getProductReview, createProductReview, getOrderByUid  } = useAuth();

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [product, setProduct] = useState(null);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [reviewInfo, setReviewInfo] = useState(null);

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

  const handleRating = (rate) => {
    setProduct((prevState) => ({
      ...prevState,
      rating: rate,
    }));
  };

  const handleOpenReview = (product, order) => async () => {
    setSelectedOrder(order);
    setProduct(product);

    const review = await getProductReview({ product, order });

    setIsReviewModalOpen(true);
    setReviewInfo(review);
  };

  const handleCloseReview = () => {
    setProduct(null);
    setReviewInfo(null);
    setIsReviewModalOpen(false);
  };

  const handleSubmitReview = () => {
    createProductReview({ product, order: selectedOrder });
    handleCloseReview();
  };

  return (
    <div>
      <div className="container">
        <div className="row">
          <h1>Profile</h1>
          <div className={styles.orderhistory__container}>
            <p className={styles.order__title}>Order history</p>
            {orders.length > 0 && (
              <div className={styles.order__container}>
                {orders.map((order, index) => (
                  <div className={styles.order__information} key={index}>
                    <div>
                      <strong
                        style={{ margin: "0 0 16px 0", display: "block" }}
                      >
                        Products:{" "}
                      </strong>
                      {order.products.map((product, productIndex) => (
                        <p
                          key={productIndex}
                          style={{
                            display: "flex",
                            margin: "8px 0",
                            width: "400px",
                          }}
                        >
                          {product.name} {product.quantity} x (${product.price})
                          <div
                            onClick={handleOpenReview(product, order)}
                            style={{
                              display: "inline-block",
                              marginLeft: "auto",
                              padding: "2px",
                              borderRadius: "2px",
                              border: "1px solid black",
                              cursor: "pointer",
                            }}
                          >
                            Review
                          </div>
                        </p>
                      ))}
                    </div>
                    <p>
                      <strong>Price: </strong>$
                      {calculateTotalPrice(order.products).toFixed(2)}
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
      {isReviewModalOpen && (
        <div
          style={{
            display: "flex",
            width: "100vw",
            height: "100vh",
            position: "fixed",
            top: "0",
            left: "0",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              width: "360px",
              height: "240px",
              backgroundColor: "white",
              zIndex: "10000000000000000000000",
              padding: "16px 20px",
              flexDirection: "column",
              alignItems: "center",
              borderRadius: "16px",
            }}
          >
            <div
              onClick={handleCloseReview}
              style={{
                marginLeft: "auto",
                cursor: "pointer",
                fontSize: "32px",
                color: "#8b8b8b",
              }}
            >
              &times;
            </div>
            <h3
              style={{
                margin: "8px",
                fontWeight: "600",
                margin: "16px 0 20px 0",
              }}
            >
              {reviewInfo
                ? "You have rated this product!"
                : "Rate your product"}
            </h3>
            <Rating
              onClick={handleRating}
              readonly={reviewInfo}
              initialValue={reviewInfo ? parseFloat(reviewInfo.rating) : 5}
            />
            {!reviewInfo && (
              <button
                className={styles.button__submit}
                style={{ margin: "20px 0 0 0" }}
                onClick={handleSubmitReview}
              >
                Submit
              </button>
            )}
          </div>
          <div
            onClick={handleCloseReview}
            style={{
              width: "100vw",
              height: "100vh",
              position: "absolute",
              top: "0",
              left: "0",
              backgroundColor: "black",
              opacity: "50%",
            }}
          ></div>
        </div>
      )}
    </div>
  );
}

function calculateTotalPrice(products) {
  return products.reduce((total, product) => total + parseFloat(product.price), 0);
}

export default Profile;
