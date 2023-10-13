import { useContext, createContext, useState, useEffect } from "react";
import { signInWithPopup, signOut, onAuthStateChanged, GoogleAuthProvider,
           createUserWithEmailAndPassword, signInWithEmailAndPassword ,
          updateProfile,
          sendPasswordResetEmail,createPost
} from "firebase/auth";
import {auth, db} from "../firebase/initFireBase"
import { addDoc, collection } from "firebase/firestore";
const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    signInWithPopup(auth, provider);
  }


  function resetPassword({email}) {
    sendPasswordResetEmail(auth, email);
  }

  function register() {
    createUserWithEmailAndPassword(auth, "email@email.com", "test123")
      .then((user) => {
        console.log(user);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const LoginAccountWithEmailPassword = async ({ name, email, password }) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      await updateProfile(auth.currentUser, {
        displayName: name,
      });
      console.log(auth.currentUser);
    } catch (error) {
      console.log(error.message)
      if (error.message == "Firebase: Error (auth/invalid-login-credentials).") {
        setError("Incorrect email address or password");
    } 
    else {
      alert(error.message);
    }
    }
  };

  const logOut = () => {
    signOut(auth);
  }

  const createPost = ({message}) => {
    const post = {
      message: message, 
      uid: user.uid,
    };
    addDoc(collection(db, "tickets"), post)
  }

  const createAccountWithEmailPassword = async ({ name, email, password }) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(auth.currentUser, {
        displayName: name,
      });
      console.log(auth.currentUser);
      // await sendEmailVerification(auth.currentUser);
    } catch (error) {
      console.log(error.message);
      if (error.message == "Firebase: Error (auth/email-already-in-use).") {
        setError("Email already in use!")
      }
      else {
        alert(error.message);
      }
    }
  };

  const signInWithEmailPassword = async ({ email, password }) => {
    await firebaseSignInWithEmailPassword(email, password);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
    })
    return () => unsubscribe();
  }, [user]);


  return (
    <AuthContext.Provider value={{ user, collection, googleSignIn, logOut, createAccountWithEmailPassword, LoginAccountWithEmailPassword, resetPassword, addDoc, error, createPost }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
