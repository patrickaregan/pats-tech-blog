// Define function for handler
async function commentHandler(event) {
    // Prevent default behavior
    event.preventDefault();

    // Define global variables
    const comment_text = document.querySelector('#comment_text').value.trim();
    const post_id = document.querySelector('#post_id').value.trim();

    // Logic
    if (comment_text) {
        const response = await fetch('/api/comments', {
        method: 'post',
        body: JSON.stringify({
            comment_text,
            post_id
        }),
        headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            document.location.reload();
        } else {
            alert(response.statusText);
        }
    }
}

// Add event listener
document.querySelector('#comment-form').addEventListener('submit', commentHandler);