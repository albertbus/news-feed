document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("searchInput");
  const blogContent = document.getElementById("blogContent");
  let searchTitle = true;

  toggleButton.addEventListener("click", function () {
    searchTitle = !searchTitle; // Toggle the mode
    searchArticle();

    if (searchTitle) {
      searchInput.placeholder = "Buscar por título...";
    } else {
      searchInput.placeholder = "Buscar por fuente...";
    }
  });

  searchInput.addEventListener("input", function () {
    const searchTerm = searchInput.value.trim().toLowerCase();
    searchArticle(searchTerm);
  });

  function searchArticle(searchTerm) {
    if (searchTitle) {
      searchTerm ? filterTitle(searchTerm) : showAll();
    } else {
      searchTerm ? filterSource(searchTerm) : showAll();
    }
  }
  // Function to filter articles based on search term
  function filterTitle(searchTerm) {
    const articles = blogContent.getElementsByClassName("article");

    Array.from(articles).forEach((article) => {
      const title = article.querySelector("h2").textContent.toLowerCase();
      if (title.includes(searchTerm)) {
        article.style.display = "block"; // Show matching articles
      } else {
        article.style.display = "none"; // Hide non-matching articles
      }
    });
  }

  function filterSource(searchTerm) {
    const articles = blogContent.getElementsByClassName("article");

    Array.from(articles).forEach((article) => {
      const source = article.getAttribute("data-rss-title").toLowerCase();
      if (source.includes(searchTerm)) {
        article.style.display = "block";
      } else {
        article.style.display = "none";
      }
    });
  }

  function showAll() {
    const articles = blogContent.getElementsByClassName("article");
    Array.from(articles).forEach((article) => {
      article.style.display = "block";
    });
  }
});
