// Define function for handler
async function logoutHandler() {
    // Define global variables
    const response = await fetch('/api/users/logout', {
        method: 'post',
        headers: {'Content-Type': 'application/json' }
    })

    // Logic
    if (response.ok) {
        document.location.replace('/');
    } else {
        alert(response.statusText);
    }
}

// Add event listener
document.querySelector('#logout-btn').addEventListener('click', logoutHandler);