// Import Firebase functions
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // ✅ Import authentication
import { getFirestore } from "firebase/firestore"; // Optional: Firestore database
import { getStorage } from "firebase/storage"; // Optional: Firebase Storage
import { getAnalytics } from "firebase/analytics"; 

// Firebase Configuration (Replace with your actual credentials)
const firebaseConfig = {
  apiKey: "AIzaSyDI-c8QOZrXWFHwNHh8GcKieqR942ofAgI",
  authDomain: "kms-project-4d946.firebaseapp.com",
  projectId: "kms-project-4d946",
  storageBucket: "kms-project-4d946.appspot.com", // Fixed storage URL
  messagingSenderId: "843535305048",
  appId: "1:843535305048:web:24ced9254045150a687d2d",
  measurementId: "G-P256PP980N",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // ✅ Add authentication
const db = getFirestore(app); // Optional: Firestore database
const storage = getStorage(app); // Optional: Firebase Storage
const analytics = getAnalytics(app); 

// Export services
export { auth, db, storage };
