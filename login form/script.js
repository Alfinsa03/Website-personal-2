document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form from submitting

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('errorMessage');
    const loginImage = document.querySelector('.login-image');

    // Send data to koneksi.php using fetch
    fetch('koneksi.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            'username': username,
            'password': password,
        })
    })
    .then(response => response.json()) // Handle response as JSON
    .then(data => {
        if (data.status === 'success') {
            alert(data.message); // Show success message
            errorMessage.style.display = 'none'; // Hide error message if successful
            
            // Redirect to dashboard
            window.location.href = 'dashboard.html'; // Change to the correct path
        } else {
            errorMessage.textContent = data.message; // Show error message if failed
            errorMessage.style.display = 'block'; // Show error message
            
            // Animation on login fail
            loginImage.classList.add('slide');
            setTimeout(() => {
                loginImage.classList.remove('slide');
            }, 500);

            // Shake animation
            setTimeout(() => {
                loginImage.classList.add('shake');
                setTimeout(() => {
                    loginImage.classList.remove('shake');
                }, 500);
            }, 500);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        errorMessage.textContent = 'Something went wrong. Please try again.';
        errorMessage.style.display = 'block';
    });
});
