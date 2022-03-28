// Import the functions you need from the SDKs you need teseting commit
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getDatabase, ref, set, update } from "firebase/database";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { Info } from "@mui/icons-material";
// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyDdSTvLk9KzL3GkBSFOoTX7DS9PaqqIqaU",
  authDomain: "soms-409ff.firebaseapp.com",
  //databaseURL: "https://soms-409ff-default-rtdb.firebaseio.com",
  projectId: "soms-409ff",
  storageBucket: "soms-409ff.appspot.com",
  messagingSenderId: "957818394464",
  appId: "1:957818394464:web:96e43c86236088bd1db005",
  measurementId: "G-VNY14WEXDG"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
      position: ["Member"],
      interestedsystems: ["None"],
      userRef: "users/" + user.uid,
    });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const addPosition = async (userRef, postion, interestedsystem) => {
  try {
    const userReferenceDoc = doc(db, userRef);
    await updateDoc(userReferenceDoc, {
      position: postion,
      interestedsystems: interestedsystem,
    });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
}

const createSystem = async (SystemName, Sname) => {
  try {
    await addDoc(collection(db, "Systems"), {
      name: SystemName,
      SystemLead: Sname,
    });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
}

const createJob = async (Sname, Jname, info, date) => {
  try {
    await addDoc(collection(db, "Job"), {
      SystemName: Sname,
      JobName: Jname,
      Information: info,
      Deadline: date
    });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
}


const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
const logout = () => {
  signOut(auth);
};
export {
  auth,
  db,
  signInWithGoogle,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
  createSystem,
  createJob,
  addPosition
};