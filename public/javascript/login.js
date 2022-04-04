// Define function for handler
async function loginHandler(event) {
    // Prevent default behavior
    event.preventDefault();

    // Define global variables
    const username = document.querySelector('#login-username').value.trim();
    const password = document.querySelector('#login-password').value.trim();

    // Logic
    if (username && password) {
        const response = await fetch('/api/users/login', {
        method: 'post',
        body: JSON.stringify({
            username,
            password
        }),
        headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }
    }
}

// Add event listener
document.querySelector('#login-form').addEventListener('submit', loginHandler);
