async function createPostHandler(event) {
    // Prevent default behavior
    event.preventDefault();

    // Define global variables
    const title = document.querySelector('#title').value.trim();
    const content = document.querySelector('#content').value.trim();

    // Logic
    if (title && content) {
        const response = await fetch('/api/posts', {
        method: 'post',
        body: JSON.stringify({
            title,
            content
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
document.querySelector('#new-post-form').addEventListener('submit', createPostHandler);