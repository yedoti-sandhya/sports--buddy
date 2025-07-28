// login.js

document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault(); // prevent form from reloading

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // Firebase login
  auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      alert("✅ Login Successful!");
      window.location.href = "home.html"; // Redirect after login
    })
    .catch((error) => {
      console.error("Login Error:", error);
      alert("❌ Login failed: " + error.message);
    });
});
