import { useRef, useState } from "react";
import styles from "../styles/SignUp.module.css";
import { useAuth } from "@/contexts/AuthContent";

function forgotpassword() {
  const { resetPassword } = useAuth();
  const emailRef = useRef(null);
  const [success, setSuccess] = useState(false);

  const handleResetPassword = async () => {
    const email = emailRef.current.value;
    try {
      await resetPassword({
        email,
      });
      setSuccess(true)
    } catch (error) {
      console.log(error.message + "this is the error");
    }
  };
  return (
    <div className="container">
      <div className="row">
        <div className={styles.signup__wrapper}>
          <div className={styles.signup__container}>
            { !success ? (
                <>
                <h2 className={styles.signup__header}>Reset Password! </h2>
                <input
                  ref={emailRef}
                  className={styles.signup__input}
                  type="email"
                  placeholder="email"
                ></input>
                <button onClick={handleResetPassword} className={styles.create__account}>
                 Reset
                </button>
                </>

            ) : (
                
                <h2>An email has been sent to your inbox</h2>
            
            )}
         
          </div>
        </div>
      </div>
    </div>
  );
}

export default forgotpassword;
