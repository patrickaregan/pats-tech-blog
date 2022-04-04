// Define function for handler
async function editPostHandler(event) {
    // Prevent default behavior
    event.preventDefault();

    // Define global variables
    const id = document.querySelector('#post_id').value.trim();
    const title = document.querySelector('#title').value.trim();
    const content = document.querySelector('#content').value.trim();
    const response = await fetch(`/api/posts/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        title,
        content
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // Logic
    if (response.ok) {
      document.location.replace('/dashboard/');
    } else {
      alert(response.statusText);
    }
}

// Add event listener
document.querySelector('#edit-post-form').addEventListener('submit', editPostHandler);