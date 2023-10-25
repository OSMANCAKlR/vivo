import CartContext from '@/contexts/CartContext';
import React, { useContext, useEffect, useState } from 'react'
import styles from "../styles/Cart.module.css"
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLeftLong } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';



function cart() {
  const { cart, setCart } = useContext(CartContext);
  const [totalAmount, setTotalAmount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  console.log(cart)
  function removeItem(item) {
    setCart(cart.filter((product) => product.id !== item.id));
  }

  function changeQuantity(product, quantity) {
    setCart(
      cart.map((item) => {
        return item.id === product.id ? { ...item, quantity: +quantity } : item;
      })
    );
  }

useEffect(() => {
    let amount = 0;
    cart.forEach((item) => {
      amount += item.price * item.quantity;
    });
    setTotalAmount(amount * 100);
  }, [cart]);

  const total = () => {
    let price = 0;
    cart.forEach((product) => {
      price += +product.price * product.quantity;
    });
    return price;
  };

  const handleCheckoutClick = () => {
    setIsModalOpen(true);
    console.log("true")
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  return (
    <section id="cart">
      <div className="row">
        <Link href="/">
          <FontAwesomeIcon
            className={styles.cart__arrow}
            icon={faLeftLong}
          />
        </Link>
        <h1 className={styles.titleHeader}>Cart</h1>
        <div className={styles.cart__header}>
          <p className={styles.cart__headerText} >Bottles</p>
          <p className={styles.cart__headerText}>Quantity</p>
          <p className={styles.cart__headerText}>Price</p>
        </div>
        <div className={styles.cart__body}>
          {cart.map((product) => {
            return (
              <div className={styles.product__container} key={product.id}>
                <div className={styles.product__wrapperCart}>
                  <img className={styles.cart__img} src={product.image} />
                  <div className={styles.product__information}>
                    <span className={styles.cart__title}>{product.name} </span>
                    <span>${product.price}</span>
                    <button
                      className={styles.delete__button}
                      onClick={() => removeItem(product)}
                    >
                      Remove
                    </button>
                  </div>
                </div>

                <div className={styles.cart__input}>
                  <input
                    className={styles.cart_input}
                    type="number"
                    min={0}
                    max={99}
                    value={product.quantity}
                    onChange={(event) =>
                      changeQuantity(product, event.target.value)
                    }
                  />
                  <span className={styles.cart__price}>
                    {" "}
                    ${(product.price * product.quantity).toFixed(2)}
                  </span>
                </div>
              </div>
            );
          })}
          {cart.length === 0 && (
            <div className={styles.cart__empty}>
              <h2 className={styles.empty__cart}>
                You don't have any items in your cart
              </h2>
              <Link href="/">
                <button className={styles.product__button}>Browse Bottles</button>
              </Link>
            </div>
          )}
          <div className={styles.total}>
            <div className={styles.price__row}>
              <p>Total <span>${total().toFixed(2)}</span></p>
            </div>
            <button  className={styles.btn__checkout} onClick={handleCheckoutClick}  >
              Proceed to checkout
            </button>
          </div>
        </div>
      </div>
      {isModalOpen && (
  <div className={styles.modal__overlay}>
    <div className={styles.modal}>
      <span className={styles.close__button} onClick={handleCloseModal}>
        &times;
      </span>
      <h2 className={styles.modal__title}>Your Order</h2>
      <p className={styles.modal__price}>Total Price: <strong>${total().toFixed(2)}</strong></p>
      <p className={styles.price__text}>Your order includes:</p>
      <ul className={styles.product__list}>
        {cart.map((product) => (
          <p key={product.id} className={styles.product__item}>
            {product.name}
          </p>
        ))}
      </ul>
      <p className={styles.modal__delivery}>Your order will be delivered soon.</p>
    </div>
  </div>
)}
     
    </section>
  )
}

export default cart