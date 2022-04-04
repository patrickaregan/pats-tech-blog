// Define function for handler
async function newPostHandler() {
    // Logic
    document.location.replace('/dashboard/newpost');
}

// Add event listener
document.querySelector('#new-post-btn').addEventListener('click', newPostHandler);