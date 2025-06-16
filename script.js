document.addEventListener('DOMContentLoaded', function() {
    const introVideo = document.getElementById('intro-video');
    const introVideoContainer = document.getElementById('intro-video-container');
    const mainContent = document.getElementById('main-content');
    const gameDetail = document.getElementById('game-detail');
    const gamesGrid = document.getElementById('games-grid');
    const filterTags = document.getElementById('filter-tags');
    const gameSearch = document.getElementById('game-search');
    const searchBtn = document.getElementById('search-btn');
    const backBtn = document.getElementById('back-btn');
    const fullscreenBtn = document.getElementById('fullscreen-btn');
    const shareBtn = document.getElementById('share-btn');
    const feedbackBtn = document.getElementById('feedback-btn');
    const gameTitle = document.getElementById('game-title');
    const gameDescription = document.getElementById('game-description');
    const gameTags = document.getElementById('game-tags');
    const gameEmbedContainer = document.getElementById('game-embed-container');
    const gameVideoContainer = document.getElementById('game-video-container');
    const gameVideo = document.getElementById('game-video');
    const similarGamesGrid = document.querySelector('.similar-games-grid');
    
    let games = [];
    let allTags = new Set();
    let currentGame = null;
    
    particlesJS("particles-js", {
        particles: {
            number: { value: 80, density: { enable: true, value_area: 800 } },
            color: { value: "#0ff0fc" },
            shape: { type: "circle" },
            opacity: { value: 0.5, random: true },
            size: { value: 3, random: true },
            line_linked: { enable: true, distance: 150, color: "#0ff0fc", opacity: 0.4, width: 1 },
            move: { enable: true, speed: 3, direction: "none", random: true, straight: false, out_mode: "out" }
        },
        interactivity: {
            detect_on: "canvas",
            events: {
                onhover: { enable: true, mode: "repulse" },
                onclick: { enable: true, mode: "push" }
            }
        }
    });
    
    async function loadGames() {
        try {
            const [localGames, externalGames] = await Promise.all([
                loadLocalGames(),
                loadExternalGames()
            ]);
            
            games = [...localGames, ...externalGames];
            
            games = games.filter((game, index, self) =>
                index === self.findIndex((g) => (
                    g.title === game.title
                ))
            );
            
            processGameTags();
            
            renderGames(games);
            renderTags();
        } catch (error) {
            console.error('Error loading games:', error);
            gamesGrid.innerHTML = '<p class="error">Failed to load games. Please try again later.</p>';
        }
    }
    
    async function loadLocalGames() {
        try {
            const response = await fetch('games.json');
            if (!response.ok) throw new Error('Failed to load local games');
            return await response.json();
        } catch (error) {
            console.error('Error loading local games:', error);
            return [];
        }
    }
    
    async function loadExternalGames() {
        try {
            const response = await fetch('https://www.onlinegames.io/media/plugins/genGames/embed.json');
            if (!response.ok) throw new Error('Failed to load external games');
            const externalGames = await response.json();
            
            return externalGames.map(game => ({
                title: game.title,
                embed: game.embed,
                image: game.image,
                tags: game.tags,
                description: game.description
            }));
        } catch (error) {
            console.error('Error loading external games:', error);
            return [];
        }
    }
    
    function processGameTags() {
        allTags = new Set();
        games.forEach(game => {
            if (game.tags) {
                const tagsArray = game.tags.split(',');
                tagsArray.forEach(tag => allTags.add(tag.trim().toLowerCase()));
            }
        });
    }
    
    function renderGames(gamesToRender) {
        gamesGrid.innerHTML = '';
        
        if (gamesToRender.length === 0) {
            gamesGrid.innerHTML = '<p class="no-games">No games found matching your criteria.</p>';
            return;
        }
        
        gamesToRender.forEach(game => {
            const gameCard = document.createElement('div');
            gameCard.className = 'game-card';
            
            const imageUrl = game.image || 'https://via.placeholder.com/300x200?text=No+Image';
            
            gameCard.innerHTML = `
                <img src="${imageUrl}" alt="${game.title}" onerror="this.src='https://via.placeholder.com/300x200?text=No+Image'">
                <div class="game-card-info">
                    <h3>${game.title}</h3>
                    <p>${game.description || 'No description available.'}</p>
                    <div class="game-card-tags">
                        ${game.tags ? game.tags.split(',').slice(0, 3).map(tag => 
                            `<span class="game-card-tag">${tag.trim()}</span>`
                        ).join('') : ''}
                    </div>
                </div>
            `;
            
            gameCard.addEventListener('click', () => showGameDetail(game));
            gamesGrid.appendChild(gameCard);
        });
    }
    
    function renderTags() {
        filterTags.innerHTML = '';
        const sortedTags = Array.from(allTags).sort();
        
        sortedTags.forEach(tag => {
            const tagElement = document.createElement('span');
            tagElement.className = 'tag';
            tagElement.textContent = tag;
            tagElement.addEventListener('click', () => filterByTag(tag));
            filterTags.appendChild(tagElement);
        });
    }
    
    function filterByTag(tag) {
        const filteredGames = games.filter(game => 
            game.tags && game.tags.toLowerCase().includes(tag.toLowerCase())
        );
        renderGames(filteredGames);
    }
    
    function searchGames() {
        const query = gameSearch.value.toLowerCase();
        
        if (!query) {
            renderGames(games);
            return;
        }
        
        const results = games.filter(game => 
            game.title.toLowerCase().includes(query) || 
            (game.description && game.description.toLowerCase().includes(query)) ||
            (game.tags && game.tags.toLowerCase().includes(query))
        );
        
        renderGames(results);
    }
    
    function showGameDetail(game) {
        currentGame = game;
        mainContent.style.display = 'none';
        gameDetail.style.display = 'block';
        
        gameTitle.textContent = game.title;
        gameDescription.textContent = game.description || 'No description available.';
        
        gameTags.innerHTML = '';
        if (game.tags) {
            game.tags.split(',').forEach(tag => {
                const tagElement = document.createElement('span');
                tagElement.className = 'tag';
                tagElement.textContent = tag.trim();
                tagElement.addEventListener('click', () => {
                    backToGames();
                    filterByTag(tag.trim());
                });
                gameTags.appendChild(tagElement);
            });
        }
        
        showSimilarGames(game);
        
        gameVideoContainer.style.display = 'block';
        gameEmbedContainer.style.display = 'none';
        gameVideo.play();
        
        gameVideo.onended = () => {
            gameVideoContainer.style.display = 'none';
            gameEmbedContainer.style.display = 'block';
            gameEmbedContainer.innerHTML = `
                <iframe src="${game.embed}" allowfullscreen></iframe>
            `;
        };
        
        window.scrollTo(0, 0);
    }
    
    function showSimilarGames(game) {
        similarGamesGrid.innerHTML = '';
        
        if (!game.tags) return;
        
        const referenceTag = game.tags.split(',')[0].trim().toLowerCase();
        
        const similar = games.filter(g => 
            g !== game && 
            g.tags && 
            g.tags.toLowerCase().includes(referenceTag)
        ).slice(0, 4); 
        
        similar.forEach(similarGame => {
            const gameCard = document.createElement('div');
            gameCard.className = 'game-card';
            
            const imageUrl = similarGame.image || 'https://via.placeholder.com/300x200?text=No+Image';
            
            gameCard.innerHTML = `
                <img src="${imageUrl}" alt="${similarGame.title}" onerror="this.src='https://via.placeholder.com/300x200?text=No+Image'">
                <div class="game-card-info">
                    <h3>${similarGame.title}</h3>
                </div>
            `;
            
            gameCard.addEventListener('click', () => showGameDetail(similarGame));
            similarGamesGrid.appendChild(gameCard);
        });
    }
    
    function backToGames() {
        mainContent.style.display = 'flex';
        gameDetail.style.display = 'none';
        gameEmbedContainer.innerHTML = '';
    }
    
    function toggleFullscreen() {
        const iframe = gameEmbedContainer.querySelector('iframe');
        if (!iframe) return;
        
        if (iframe.requestFullscreen) {
            iframe.requestFullscreen();
        } else if (iframe.webkitRequestFullscreen) {
            iframe.webkitRequestFullscreen();
        } else if (iframe.msRequestFullscreen) {
            iframe.msRequestFullscreen();
        }
    }
    
    function shareGame() {
        if (navigator.share) {
            navigator.share({
                title: currentGame.title,
                text: `Check out ${currentGame.title} on VGames Studio`,
                url: window.location.href,
            }).catch(err => {
                console.log('Error sharing:', err);
                fallbackShare();
            });
        } else {
            fallbackShare();
        }
    }
    
    function fallbackShare() {
        const shareUrl = `https://twitter.com/intent/tweet?text=Check out ${encodeURIComponent(currentGame.title)} on VGames Studio&url=${encodeURIComponent(window.location.href)}`;
        window.open(shareUrl, '_blank');
    }
    
    introVideo.addEventListener('ended', () => {
        introVideoContainer.style.display = 'none';
        mainContent.style.display = 'flex';
        loadGames();
    });
    
    searchBtn.addEventListener('click', searchGames);
    gameSearch.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') searchGames();
    });
    backBtn.addEventListener('click', backToGames);
    fullscreenBtn.addEventListener('click', toggleFullscreen);
    shareBtn.addEventListener('click', shareGame);
    feedbackBtn.addEventListener('click', () => {
        window.open('http://vgames.run.place/feedback', '_blank');
    });
    
    introVideo.addEventListener('contextmenu', (e) => e.preventDefault());
    gameVideo.addEventListener('contextmenu', (e) => e.preventDefault());
    
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.addEventListener('mouseover', () => {
            logo.classList.add('glitch-effect');
            setTimeout(() => logo.classList.remove('glitch-effect'), 500);
        });
    }
});
