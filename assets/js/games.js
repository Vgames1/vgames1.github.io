// Sample game data
const games = [
    {
        "title": "Survival Island",
        "embed": "game.html?game=survival-island",
        "image": "https://www.onlinegames.io/media/posts/970/responsive/Survival-Island-xs.jpg",
        "tags": "1-player,3d,adventure,crafting,free,minecraft,simulator,survival,unity",
        "description": "Imagine waking up on a sunny, deserted shore with the sound of waves gently rolling into pebbles on the beach..."
    },
    {
        "title": "Mahjong",
        "embed": "game.html?game=mahjong",
        "image": "https://www.onlinegames.io/media/posts/966/responsive/Mahjong-xs.jpg",
        "tags": "1-player,2d,brain,cozy,free,html5,logic,mouse,puzzle,strategy",
        "description": "Mahjong Online is a game of patience, skill, and a bit of luck..."
    }
    // Add more games here
];

// Load games into main container
function loadGames(filterTag = 'all') {
    showLoading();
    gamesContainer.innerHTML = '';
    
    // Update active button
    document.querySelectorAll('.nav-button').forEach(btn => {
        btn.classList.remove('active');
    });
    const activeBtn = document.querySelector(`.nav-button[data-tag="${filterTag}"]`);
    if (activeBtn) {
        activeBtn.classList.add('active');
    }
    
    const filteredGames = filterTag === 'all' ? 
        games : 
        games.filter(game => game.tags.includes(filterTag));
    
    setTimeout(() => {
        filteredGames.forEach(game => {
            createGameTile(game, gamesContainer);
        });
        
        if (filterTag === 'all') {
            gamesFoundSpan.textContent = filteredGames.length;
            totalGamesSpan.textContent = filteredGames.length;
        }
        
        hideLoading();
    }, 500);
}

// Create a game tile element
function createGameTile(game, container) {
    const tile = document.createElement('div');
    tile.className = 'game-tile';
    tile.innerHTML = `
        <img src="${game.image}" alt="${game.title}" loading="lazy">
        <h3>${game.title}</h3>
        <p>${game.tags.split(',').slice(0, 3).join(', ')}</p>
    `;
    tile.addEventListener('click', () => {
        window.location.href = game.embed;
    });
    container.appendChild(tile);
}

// Filter games by tag
function filterGames(tag) {
    loadGames(tag);
    window.scrollTo(0, 0);
}

// Search games
function searchGames() {
    const query = searchInput.value.toLowerCase();
    const filteredGames = games.filter(game => 
        game.title.toLowerCase().includes(query) || 
        game.tags.toLowerCase().includes(query) ||
        game.description.toLowerCase().includes(query)
    );
    
    gamesContainer.innerHTML = '';
    filteredGames.forEach(game => {
        createGameTile(game, gamesContainer);
    });
    
    gamesFoundSpan.textContent = filteredGames.length;
}

// Update game counts
function updateGameCounts() {
    totalGamesSpan.textContent = games.length;
    gamesFoundSpan.textContent = games.length;
}
