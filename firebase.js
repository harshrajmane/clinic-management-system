import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDR6i78Tk3DKxPtTxeujCwSzURH-5M2Lik",
  authDomain: "clinic-management-system-556be.firebaseapp.com",
  projectId: "clinic-management-system-556be",
  storageBucket: "clinic-management-system-556be.firebasestorage.app",
  messagingSenderId: "659662832876",
  appId: "1:659662832876:web:0e3f4994fb4c1ed751d1c9"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
