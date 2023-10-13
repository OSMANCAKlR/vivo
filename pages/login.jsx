import styles from "../styles/SignUp.module.css";
import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { useAuth } from "@/contexts/AuthContent";
import Link from "next/link";

function login() {
    const { LoginAccountWithEmailPassword, error } = useAuth();
    const emailRef = useRef(null); 
    const passwordRef = useRef(null);
    const { user, googleSignIn } = useAuth();
    const [loading, setLoading] = useState(false);
  

    const handleSignin = async () => {
      try {
        await googleSignIn();
      } catch (error) {
          console.log(error.message)
      }
    };
  
    const login = async () => {
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
    
        try {
          await LoginAccountWithEmailPassword({
            email,
            password,
          });
        } catch (error) {
            console.log(error.message + "this is the error")
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
                    <h2 className={styles.signup__header}>Log In </h2>
                    <button onClick={handleSignin} className={styles.google__button}>
                      <FontAwesomeIcon
                        icon={faGoogle}
                        className={styles.google__icon}
                      />
                      Log In With Google
                    </button>
                    <span>Or log In with email</span>
                    {error && <p className={styles.error__message}>{error}</p>}
                    <input ref={emailRef} className={styles.signup__input} type="email" placeholder="email"></input>
                    <input ref={passwordRef} className={styles.signup__input} type="password" placeholder="password" />
                    <button onClick={login} className={styles.create__account}>Log In</button>
                    <Link href="/forgotpassword" className={styles.forgotpass}>Forgot Password?</Link>
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

export default login