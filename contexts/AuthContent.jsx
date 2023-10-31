import { useContext, createContext, useState, useEffect } from "react";
import { signInWithPopup, signOut, onAuthStateChanged, GoogleAuthProvider,
           createUserWithEmailAndPassword, signInWithEmailAndPassword ,
          updateProfile,
          sendPasswordResetEmail,createPost
} from "firebase/auth";
import {auth, db} from "../firebase/initFireBase"
import { addDoc, collection, getDoc, getDocs, query, where } from "firebase/firestore";
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
      name: user.displayName,
      email: user.email,
    };
    addDoc(collection(db, "tickets"), post)
  }

  const createProduct = ({name, price, description, image}) => {
    const post = {
      name: name, 
      price: price,
      description: description,
      image: image,
    };
    addDoc(collection(db, "products"), post)
  }
  const createOrder = ({ products, date, time }) => {
    const orderData = {
      products: products,
      date: date,
      time: time,
      uid: user.uid,
    };
  
    addDoc(collection(db, "orders"), orderData);
  }
  async function getAllPosts() {
    const { docs } = await getDocs(collection(db, "tickets"));
  const posts = docs.map(elem => ({...elem.data(), id: elem.id}));
  console.log(posts);
  return posts; // Make sure to return the posts
  }

  async function getAllProducts() {
    const { docs } = await getDocs(collection(db, "products"));
  const posts = docs.map(elem => ({...elem.data(), id: elem.id}));
  return posts; // Make sure to return the posts
  }

  async function getOrderByUid() {
    const postCollectionRef = await query(
      collection(db, "orders"),
      where("uid", "==", user.uid)
    );
    const { docs } = await getDocs(postCollectionRef);
    const posts = docs.map(elem => ({...elem.data(), id: elem.id}));
    console.log(posts)
    return posts;
  }

  const createAccountWithEmailPassword = async ({ name, email, password }) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(auth.currentUser, {
        displayName: name,
      });
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
    <AuthContext.Provider value={{ user, collection, googleSignIn, logOut, getOrderByUid,  createAccountWithEmailPassword, LoginAccountWithEmailPassword, getAllProducts, createProduct, resetPassword, addDoc, error, createPost, getAllPosts, createOrder }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
