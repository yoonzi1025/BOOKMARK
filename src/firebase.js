import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAj9iuv85CQ6T_cEPrp4pNn9RJTCybt5cM",
  authDomain: "bookmark-85b7b.firebaseapp.com",
  projectId: "bookmark-85b7b",
  storageBucket: "bookmark-85b7b.firebasestorage.app",
  messagingSenderId: "585576007030",
  appId: "1:585576007030:web:6c6b870ebbb50d19342657",
  measurementId: "G-86Y0B5YTS5",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
