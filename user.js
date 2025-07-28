// user.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  onSnapshot,
  query,
  where
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

import {
  getAuth,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";

// ✅ Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyDl_PWiFJkSFT5-C4DvlwsxvMkbo8Pf6vY",
  authDomain: "buddy-sports.firebaseapp.com",
  projectId: "buddy-sports",
  storageBucket: "buddy-sports.firebasestorage.app",
  messagingSenderId: "877821058232",
  appId: "1:877821058232:web:906c01636c12bda1fb284d"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// ✅ Wait for user login
onAuthStateChanged(auth, (user) => {
  if (user) {
    const userId = user.uid;
    loadUserEvents(userId);

    // Handle event form submit
    const frm = document.getElementById("frmEvent");
    frm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const eventName = document.getElementById("eventName").value.trim();
      if (!eventName) {
        alert("❗ Please enter an event name.");
        return;
      }

      try {
        await addDoc(collection(db, "events"), {
          userId: userId,
          name: eventName,
          timestamp: new Date()
        });
        alert("✅ Event added successfully!");
        frm.reset();
      } catch (err) {
        alert("❌ Failed to add event: " + err.message);
      }
    });
  } else {
    alert("❌ User not logged in. Redirecting to login.");
    window.location.href = "login.html";
  }
});

// ✅ Load Events
function loadUserEvents(userId) {
  const q = query(collection(db, "events"), where("userId", "==", userId));
  const list = document.getElementById("eventsList");
  list.innerHTML = "<p>Loading events...</p>";

  onSnapshot(q, (snapshot) => {
    if (snapshot.empty) {
      list.innerHTML = "<p>No events added yet.</p>";
      return;
    }

    list.innerHTML = "";
    snapshot.forEach((doc) => {
      const event = doc.data();
      const div = document.createElement("div");
      div.textContent = `📌 ${event.name}`;
      list.appendChild(div);
    });
  });
}
