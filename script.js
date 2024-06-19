// script.js
import { rssFeeds } from './feed_names.js';

document.addEventListener('DOMContentLoaded', function() {
    fetchAndProcessJsonFiles(rssFeeds)
        .then(() => console.log('All JSON files fetched and processed successfully!'))
        .catch(error => console.error('Error fetching or processing JSON files:', error));
});

async function fetchAndProcessJsonFiles(rssFeeds) {
    for (const feed of rssFeeds) {
        try {
            const jsonFilePath = `${feed.name}_rss_feed.json`;
            const jsonData = await readJsonFile(jsonFilePath);
            processJsonData(jsonData);
        } catch (error) {
            console.error(`Error fetching or processing ${feed.name}_rss_feed.json:`, error);
        }
    }
    sortArticlesByDate();
}

async function readJsonFile(filePath) {
    try {
        const response = await fetch(filePath);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const jsonData = await response.json();
        return jsonData;
    } catch (error) {
        throw new Error(`Error fetching ${filePath}: ${error.message}`);
    }
}

function processJsonData(data) {
    let rssTitle = data.title

    // Create and append sorted articles
    data.items.forEach(item => {
        let article = document.createElement('article');
        article.setAttribute('data-published', item.published);
        article.setAttribute('class', 'article');
        article.setAttribute('data-rss-title', rssTitle)
        const truncatedDescription = truncateText(item.description, 20);
        let imageUrl = findImageUrl(item);

        let articleContent = `<a href="${item.link}" class="titleLink"><h2>${item.title}</h2></a>`;

        if (imageUrl) {
            articleContent += `
                <div class="article-image">
                    <img src="${imageUrl}" alt="Image for ${item.title}">
                </div>
            `;
        }

        articleContent += `
            <p>${truncatedDescription}</p>
            <p>Published on: ${new Date(item.published).toLocaleDateString()}</p>
            `;


        article.innerHTML = articleContent
        blogContent.appendChild(article);
    });
}

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

function truncateText(text, maxWords) {
    const words = text.split(' ');
    if (words.length > maxWords) {
        return words.slice(0, maxWords).join(' ') + '...';
    }
    return text;
}

function findImageUrl(item) {
    // Check enclosures first
    if (item.enclosures && item.enclosures.length > 0) {
        return item.enclosures[0].url;
    }

    // Check media objects next
    if (item.content && item.content.length > 0) {
        return item.content;
    }

    // Default image if no suitable image found
    return null;
}
