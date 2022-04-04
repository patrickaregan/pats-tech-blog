// Define function for handler
async function deletePostHandler() {

    // Define global variables
    const id = document.querySelector('#post_id').value.trim();
    const response = await fetch(`/api/posts/${id}`, {
      method: 'DELETE'
    });

    // Logic
    if (response.ok) {
      document.location.replace('/dashboard/');
    } else {
      alert(response.statusText);
    }
}

// Add event listener
document.querySelector('#delete-post-btn').addEventListener('click', deletePostHandler);