// DOM elements
const gamesContainer = document.getElementById('games-container');
const searchSection = document.getElementById('search-section');
const searchInput = document.getElementById('search-input');
const gamesFoundSpan = document.getElementById('games-found');
const totalGamesSpan = document.getElementById('total-games');
const loadingIndicator = document.getElementById('loadingIndicator');
const loginButton = document.getElementById('login-button');
const searchButton = document.getElementById('search-button');
const moreButton = document.getElementById('more-button');
const backButton = document.getElementById('back-button');
const morePopup = document.getElementById('more-popup');
const closePopup = document.getElementById('close-popup');
const categoryButtons = document.getElementById('category-buttons');

// Initialize the page
window.onload = function() {
    showLoading();
    setTimeout(() => {
        loadCategories();
        loadGames('all');
        updateGameCounts();
        checkLoginStatus();
        setupEventListeners();
        hideLoading();
    }, 1000);
};

// Set up event listeners
function setupEventListeners() {
    searchButton.addEventListener('click', showSearchPage);
    backButton.addEventListener('click', hideSearchPage);
    searchInput.addEventListener('input', searchGames);
    loginButton.addEventListener('click', handleLogin);
    moreButton.addEventListener('click', showMorePopup);
    closePopup.addEventListener('click', hideMorePopup);
    
    // Event delegation for category buttons
    categoryButtons.addEventListener('click', function(e) {
        if (e.target.classList.contains('nav-button')) {
            const tag = e.target.dataset.tag;
            filterGames(tag);
        }
    });
}

// Load categories from JSON
function loadCategories() {
    fetch('../categories.json')
        .then(response => response.json())
        .then(data => {
            categoryButtons.innerHTML = '';
            data.categories.forEach(category => {
                const button = document.createElement('button');
                button.className = 'nav-button';
                button.textContent = category.name;
                button.dataset.tag = category.id;
                categoryButtons.appendChild(button);
            });
        })
        .catch(error => console.error('Error loading categories:', error));
}
