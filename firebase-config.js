
// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";

// ✅ Replace these with your Firebase project config

  const firebaseConfig = {
    apiKey: "AIzaSyDl_PWiFJkSFT5-C4DvlwsxvMkbo8Pf6vY",
    authDomain: "buddy-sports.firebaseapp.com",
    projectId: "buddy-sports",
    storageBucket: "buddy-sports.firebasestorage.app",
    messagingSenderId: "877821058232",
    appId: "1:877821058232:web:906c01636c12bda1fb284d"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Export to use in other files
export { auth, db };
