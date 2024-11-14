const totalImages = 76;
const imagePrefix = 'everyday_boozoo-20241106-';
const imageExtension = '.jpg';
const rows = document.querySelectorAll('.marquee-row');

function padNumber(number) {
    return String(number).padStart(4, '0');
}

function createImage(index) {
    const img = document.createElement('img');
    img.onerror = function() {
        console.warn(`Failed to load image: ${index}`);
        img.src = 'images/placeholder.jpg';
    };
    img.src = `images/${imagePrefix}${padNumber(index)}${imageExtension}`;
    img.alt = `Boozoo ${index}`;
    img.classList.add('gallery-item');
    return img;
}

function getRandomImageIndex() {
    return Math.floor(Math.random() * totalImages) + 1;
}

rows.forEach(row => {
    // Add original random images
    for (let i = 0; i < totalImages; i++) {
        row.appendChild(createImage(getRandomImageIndex()));
    }
    // Duplicate the same pattern for seamless scroll
    for (let i = 0; i < totalImages; i++) {
        row.appendChild(createImage(getRandomImageIndex()));
    }
});

// Comment handling code
const commentForm = document.querySelector('.fan-form');
const commentsContainer = document.querySelector('.comments');

// Update the API URLs
const BASE_API_URL = 'http://localhost:3000';

// Load existing comments
async function loadComments() {
    try {
        const response = await fetch(`${BASE_API_URL}/api/comments`);
        const comments = await response.json();
        const commentsTrack = document.querySelector('.comments-track');
        
        if (comments.length === 0) {
            commentsTrack.innerHTML = '<p>No comments yet. Be the first to share your thoughts!</p>';
            return;
        }

        // Create single row of comments
        const commentsHtml = comments.map(comment => `
            <div class="comment">
                <h3>${escapeHtml(comment.name)}</h3>
                <p>${escapeHtml(comment.text)}</p>
                <small>${new Date(comment.date).toLocaleDateString()}</small>
            </div>
        `).join('');
        
        // Double the comments for seamless scrolling
        commentsTrack.innerHTML = commentsHtml + commentsHtml;

    } catch (error) {
        console.error('Error loading comments:', error);
        commentsTrack.innerHTML = '<p>Error loading comments. Please try again later.</p>';
    }
}

// Handle form submission
commentForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const nameInput = document.getElementById('fan-name');
    const commentInput = document.getElementById('fan-comment');
    
    if (!nameInput.value.trim() || !commentInput.value.trim()) {
        alert('Please fill in both name and comment fields');
        return;
    }

    const newComment = {
        name: nameInput.value.trim(),
        text: commentInput.value.trim()
    };

    try {
        const response = await fetch(`${BASE_API_URL}/api/comments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newComment)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Clear the form
        nameInput.value = '';
        commentInput.value = '';
        
        // Reload comments after successful post
        await loadComments();
        
    } catch (error) {
        console.error('Error posting comment:', error);
        alert('Failed to post comment. Please try again.');
    }
});

// Security: Escape HTML to prevent XSS
function escapeHtml(unsafe) {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

// Load comments when page loads
loadComments();