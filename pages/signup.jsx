import { useAuth } from "@/contexts/AuthContent";
import styles from "../styles/SignUp.module.css";
import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

function signup() {
  const { createAccountWithEmailPassword, error } = useAuth();
  const emailRef = useRef(null); 
  const passwordRef = useRef(null);
  const { user, googleSignIn } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    try {
      await createAccountWithEmailPassword({
        email,
        password,
      });
    } catch (error) {
        console.log(error.message)
    }
  };


  
  const handleSignin = async () => {
    try {
      await googleSignIn();
    } catch (error) {
        console.log(error.message)
    }
  };


  useEffect(() => {
    const checkAuthentication = async () => {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 500));
      setLoading(false);
    };
    checkAuthentication();
  }, [user, setLoading]);

  return (
    <div className="container">
      <div className="row">
        {!user ? (
                <div className={styles.signup__wrapper}>
                <div className={styles.signup__container}>
                  <h2 className={styles.signup__header}>Create your free account</h2>
                  <button onClick={handleSignin} className={styles.google__button}>
                    <FontAwesomeIcon
                      icon={faGoogle}
                      className={styles.google__icon}
                    />
                    Sign Up With Google
                  </button>
                  <span>Or sign up with email</span>
                  {error && <p className={styles.error__message}>{error}</p>}
                  <input ref={emailRef} className={styles.signup__input} type="email" placeholder="email"></input>
                  <input ref={passwordRef} className={styles.signup__input} type="password" placeholder="password" />
                  <button onClick={handleRegister} className={styles.create__account}>Create Account</button>
                </div>
              </div>
           
        ) : (
            <div>
                <h2>Welcome {user.email}</h2>
            </div>
        )}
         </div>
          </div>
  );
}

export default signup;
