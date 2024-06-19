document.addEventListener('DOMContentLoaded', function() {
    sortArticlesByDate();
});

function sortArticlesByDate() {
    const container = document.getElementById('blogContent');
    const articles = Array.from(container.getElementsByTagName('article'));

    // Sort articles by data-published attribute
    articles.sort((a, b) => {
        const dateA = parseInt(a.getAttribute('data-published'));
        const dateB = parseInt(b.getAttribute('data-published'));
        return dateB - dateA; // For descending order
    });

    // Clear the current content
    container.innerHTML = '';

    // Append sorted articles back to the container
    articles.forEach(article => container.appendChild(article));
}
