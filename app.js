import { auth, db } from "./firebase.js";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

import {
  doc,
  setDoc,
  getDoc,
  collection,
  addDoc,
  getDocs,
  updateDoc,
  query,
  where,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";


// ================= AUTH PROTECTION =================
onAuthStateChanged(auth, user => {
    const publicPages = ["index.html", "register.html"];
    const currentPage = window.location.pathname.split("/").pop();

    if(!user && !publicPages.includes(currentPage)){
        window.location.href = "index.html";
    }
});


// ================= REGISTER =================
import { setDoc, doc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

window.register = async function(){

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const role = document.getElementById("role").value;

    try {

        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        await setDoc(doc(db, "users", user.uid), {
            email,
            role
        });

        console.log("User registered:", email, role);

        alert("Registration successful!");
        window.location.href = "index.html";

    } catch(error) {

        console.error(error);

        if(error.code === "auth/email-already-in-use"){
            alert("Email already registered. Please login.");
        }
        else if(error.code === "permission-denied"){
            alert("Database permission issue. Check Firebase rules.");
        }
        else{
            alert(error.message);
        }
    }
}

// ================= LOGIN =================
window.login = async function(){

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    const userDoc = await getDoc(doc(db, "users", user.uid));
    const role = userDoc.data().role;

    console.log("User logged in:", email, role);

    if(role === "receptionist"){
        window.location.href = "receptionist.html";
    } else {
        window.location.href = "doctor.html";
    }
}


// ================= LOGOUT =================
window.logout = function(){
    signOut(auth).then(() => {
        console.log("User logged out");
        window.location.href = "index.html";
    });
}


// ================= ADD PATIENT =================
window.addPatient = async function(){

    const name = document.getElementById("name").value;
    const age = document.getElementById("age").value;
    const gender = document.getElementById("gender").value;
    const phone = document.getElementById("phone").value;
    const address = document.getElementById("address").value;

    const docRef = await addDoc(collection(db, "patients"), {
        name,
        age,
        gender,
        phone,
        address,
        createdAt: serverTimestamp()
    });

    console.log("Patient added:", docRef.id);

    // Generate token
    await addDoc(collection(db, "tokens"), {
        patientId: docRef.id,
        status: "waiting",
        createdAt: serverTimestamp()
    });

    console.log("Token generated for patient:", docRef.id);

    alert("Patient added & token generated!");
}


// ================= CREATE BILL =================
window.createBill = async function(){

    const patientId = document.getElementById("patientIdBill").value;
    const amount = document.getElementById("amount").value;
    const description = document.getElementById("description").value;

    await addDoc(collection(db, "bills"), {
        patientId,
        amount,
        description,
        createdAt: serverTimestamp()
    });

    console.log("Bill created for patient:", patientId);

    alert("Bill created!");
}


// ================= LOAD WAITING TOKENS =================
async function loadTokens(){

    const q = query(collection(db, "tokens"), where("status", "==", "waiting"));
    const querySnapshot = await getDocs(q);

    const list = document.getElementById("tokenList");

    if(!list) return;

    list.innerHTML = "";

    querySnapshot.forEach(docItem => {

        const data = docItem.data();

        const div = document.createElement("div");
        div.className = "token-card";

        div.innerHTML = `
            <strong>Patient ID:</strong> ${data.patientId} <br>
            <strong>Status:</strong> ${data.status}
        `;

        list.appendChild(div);
    });

    console.log("Waiting tokens loaded");
}


// ================= ADD PRESCRIPTION =================
window.addPrescription = async function(){

    const patientId = document.getElementById("patientId").value;
    const notes = document.getElementById("notes").value;

    await addDoc(collection(db, "prescriptions"), {
        patientId,
        notes,
        createdAt: serverTimestamp()
    });

    console.log("Prescription saved for patient:", patientId);

    // Update token to completed
    const q = query(collection(db, "tokens"), where("patientId", "==", patientId));
    const snapshot = await getDocs(q);

    snapshot.forEach(async (docItem) => {
        await updateDoc(doc(db, "tokens", docItem.id), {
            status: "completed"
        });
    });

    console.log("Token marked completed for:", patientId);

    alert("Prescription saved & token completed!");

    loadTokens(); // refresh queue
}


// ================= RUN ON PAGE LOAD =================
document.addEventListener("DOMContentLoaded", () => {
    loadTokens();
});
