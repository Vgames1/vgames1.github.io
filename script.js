document.addEventListener('DOMContentLoaded', () => {
    // Sample game data (add more games here)
    const games = [
        {
            "title": "Kings io",
            "embed": "https://cloud.onlinegames.io/games/2025/construct/208/kings-io/index-og.html",
            "image": "https://www.onlinegames.io/media/posts/952/responsive/Kings-io-xs.jpg",
            "tags": "2d,arena,army,battle,free,io-games,strategy,war",
            "description": "The road to royalty is that way!  ⬆️ If you're ready to rule your own kingdom, play Kings io.  This is an exciting online strategy game where you start as a small-time ruler, determined to rise to glory by building a grand empire.  If you’re up for gathering gold, recruiting strong troops, and outsmarting enemy kings, then this free game is your perfect battlefield."
        },
        {
            "title": "SpartaHoppers",
            "embed": "https://cloud.onlinegames.io/games/2025/construct/227/spartahoppers/index-og.html",
            "image": "https://www.onlinegames.io/media/posts/949/responsive/sparta-hoppers-game-xs.jpg",
            "tags": "2-player,2d,action,arcade,arena,combat,crazy,free,fun,physics",
            "description": "Have you heard about Sparta before?  The ancient Roman city where warriors once clashed on grand stages.  They were the coolest guys of their era.  Only, in this online game, your gladiators can’t walk cuz they can only hop!"
        },
        // Add more games here
      
    ];

    // DOM Elements
    const gameGrid = document.getElementById('gameGrid');
    const gamePage = document.getElementById('gamePage');
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const searchResults = document.getElementById('searchResults');

    // Local Storage Keys
    const LIKED_GAMES_KEY = 'likedGames';
    const RECENTLY_PLAYED_KEY = 'recentlyPlayed';

    // Load liked and recently played games from local storage
    let likedGames = JSON.parse(localStorage.getItem(LIKED_GAMES_KEY)) || [];
    let recentlyPlayed = JSON.parse(localStorage.getItem(RECENTLY_PLAYED_KEY)) || [];

    // Validate game data
    function validateGame(game) {
        const requiredProps = ['title', 'embed', 'image', 'tags', 'description'];
        return requiredProps.every(prop => game.hasOwnProperty(prop));
    }

    // Filter out invalid games
    const validGames = games.filter(validateGame);

    // Render all valid games on page load
    renderGames(validGames);

    // Render games in the grid
    function renderGames(gamesArray) {
        gameGrid.innerHTML = '';
        if (gamesArray.length === 0) {
            gameGrid.innerHTML = `<div class="no-games">No games found.</div>`;
            return;
        }
        gamesArray.forEach((game, index) => {
            const tile = document.createElement('div');
            tile.className = `game-tile ${index % 3 === 0 ? 'large' : ''}`;
            tile.innerHTML = `
                <img src="${game.image}" alt="${game.title}">
                <p>${game.title}</p>
            `;
            tile.addEventListener('click', () => openGamePage(game));
            gameGrid.appendChild(tile);
        });
    }

    // Open game page
    function openGamePage(game) {
        // Update URL with game title
        history.pushState(null, '', `?game=${encodeURIComponent(game.title)}`);

        // Show loading state
        gamePage.innerHTML = `<div class="loading">Loading...</div>`;
        gamePage.classList.remove('hidden');

        // Simulate loading delay
        setTimeout(() => {
            gamePage.innerHTML = `
                <div class="game-container">
                    <iframe id="gameFrame" src="${game.embed}" frameborder="0"></iframe>
                    <div class="game-info">
                        <img id="gameImage" src="${game.image}" alt="${game.title}">
                        <p id="gameDescription">${game.description}</p>
                    </div>
                </div>
                <div class="game-actions">
                    <button id="likeButton">Like</button>
                    <button id="shareButton">Share</button>
                    <button id="feedbackButton">Feedback</button>
                    <button id="fullscreenButton">Fullscreen</button>
                </div>
                <div class="more-games">
                    <h3>More Games</h3>
                    <div id="moreGamesGrid" class="game-grid"></div>
                </div>
            `;

            // Update background image
            document.body.style.backgroundImage = `url(${game.image})`;

            // Update recently played games
            updateRecentlyPlayed(game);

            // Update like button state
            updateLikeButton(game);

            // Add event listeners for buttons
            document.getElementById('likeButton').addEventListener('click', () => toggleLike(game));
            document.getElementById('fullscreenButton').addEventListener('click', toggleFullscreen);
        }, 500); // Simulate loading delay
    }

    // Update recently played games
    function updateRecentlyPlayed(game) {
        recentlyPlayed = recentlyPlayed.filter(g => g.title !== game.title);
        recentlyPlayed.unshift(game);
        if (recentlyPlayed.length > 5) recentlyPlayed.pop();
        localStorage.setItem(RECENTLY_PLAYED_KEY, JSON.stringify(recentlyPlayed));
    }

    // Update like button state
    function updateLikeButton(game) {
        const likeButton = document.getElementById('likeButton');
        if (likedGames.some(g => g.title === game.title)) {
            likeButton.textContent = 'Liked';
            likeButton.classList.add('liked');
        } else {
            likeButton.textContent = 'Like';
            likeButton.classList.remove('liked');
        }
    }

    // Toggle like for a game
    function toggleLike(game) {
        if (likedGames.some(g => g.title === game.title)) {
            likedGames = likedGames.filter(g => g.title !== game.title);
        } else {
            likedGames.push(game);
        }
        localStorage.setItem(LIKED_GAMES_KEY, JSON.stringify(likedGames));
        updateLikeButton(game);
    }

    // Toggle fullscreen mode
    function toggleFullscreen() {
        const iframe = document.getElementById('gameFrame');
        if (iframe.requestFullscreen) {
            iframe.requestFullscreen();
        } else if (iframe.mozRequestFullScreen) { // Firefox
            iframe.mozRequestFullScreen();
        } else if (iframe.webkitRequestFullscreen) { // Chrome, Safari, Opera
            iframe.webkitRequestFullscreen();
        } else if (iframe.msRequestFullscreen) { // IE/Edge
            iframe.msRequestFullscreen();
        }
    }

    // Search functionality
    searchButton.addEventListener('click', () => {
        const query = searchInput.value.toLowerCase();
        const foundGames = validGames.filter(game =>
            game.title.toLowerCase().includes(query) || game.tags.toLowerCase().includes(query)
        );
        renderGames(foundGames);
        searchResults.textContent = `Found ${foundGames.length} of ${validGames.length} games`;
    });

    // Handle URL changes (e.g., when user navigates back)
    window.addEventListener('popstate', () => {
        const urlParams = new URLSearchParams(window.location.search);
        const gameTitle = urlParams.get('game');
        if (gameTitle) {
            const game = validGames.find(g => g.title === decodeURIComponent(gameTitle));
            if (game) openGamePage(game);
        } else {
            gamePage.classList.add('hidden');
        }
    });
});
