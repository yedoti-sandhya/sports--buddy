// register.js

document.getElementById("registerForm").addEventListener("submit", function (e) {
  e.preventDefault(); // prevent form from reloading

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // Firebase register user
  auth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      alert("✅ Registration Successful!");
      window.location.href = "user.html"; // Redirect to login
    })
    .catch((error) => {
      console.error("Registration Error:", error);
      alert("❌ Error: " + error.message);
    });
});
