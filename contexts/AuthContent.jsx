import { useContext, createContext, useState, useEffect } from "react";
import { signInWithPopup, signOut, onAuthStateChanged, GoogleAuthProvider,
          createAccountWithEmailPassword, signInwithEmailPassword as firebaseSignInwithEmailPassword,
          updateProfile,
} from "firebase/auth";
import {auth} from "../firebase/initFireBase"
const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    signInWithPopup(auth, provider);
  }

  const logOut = () => {
    signOut(auth);
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
      console.log(error);
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
    <AuthContext.Provider value={{ user, googleSignIn, logOut, createAccountWithEmailPassword, signInWithEmailPassword }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
