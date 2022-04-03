// Define function for handler
async function signupHandler(event) {
    // Prevent default behavior
    event.preventDefault();

    // Define global variables
    const username = document.querySelector('#login-username').value.trim();
    const password = document.querySelector('#login-password').value.trim();
    console.log("DEBUG:");
    console.log("Username: " + username);

    // Logic
    if (username && password) {
        const response = await fetch('/api/users', {
        method: 'post',
        body: JSON.stringify({
            username,
            password
        }),
        headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            document.location.replace('/login');
        } else {
            alert(response.statusText);
        }
    }
}

// Add event listener
document.querySelector('#signup-form').addEventListener('submit', signupHandler);