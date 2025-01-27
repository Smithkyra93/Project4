document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();
<link rel="stylesheet" type="text/css" href="Login.css" />
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const errorMessage = document.getElementById("errorMessage");

    // Clear any previous error message
    errorMessage.style.display = 'none';

    // Simple form validation
    if (!email || !password) {
        errorMessage.textContent = "Please fill out both fields!";
        errorMessage.style.display = 'block';
        return;
    }

    const userCredentials = { email, password };

    // Send data to the server via fetch
    fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userCredentials),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            window.location.href = '/dashboard'; // Redirect to dashboard or main page
        } else {
            errorMessage.textContent = data.message || "Login failed. Please try again.";
            errorMessage.style.display = 'block';
        }
    })
    .catch(error => {
        console.error("Error during login:", error);
        errorMessage.textContent = "An error occurred. Please try again later.";
        errorMessage.style.display = 'block';
    });
});