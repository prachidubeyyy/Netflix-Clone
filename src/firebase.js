import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth";
import {
  addDoc,
  collection,
  getFirestore
} from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyB-zyHSVrGBSvxogMeDdmnL77o6jzwR344",
  authDomain: "netflix-clone-8f14c.firebaseapp.com",
  projectId: "netflix-clone-8f14c",
  storageBucket: "netflix-clone-8f14c.appspot.com",
  messagingSenderId: "421239505143",
  appId: "1:421239505143:web:657ad0fbc02bc2ca38d3f2"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "user"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email
    });
  } catch (error) {
    console.error(error);
    toast.error(error.code.split('/')[1].split('-').join(' '));
  }
};

const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error(error);
    toast.error(error.code.split('/')[1].split('-').join(' '));
  }
};

const logout = () => {
  signOut(auth);
};

export { auth, db, login, signup, logout };
