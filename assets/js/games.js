let allGames = [];


function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function loadGames() {
    fetch('game.json')
        .then(response => response.json())
        .then(data => {
            allGames = shuffleArray([...data]);
            displayFeaturedGames();
            
            setTimeout(() => {
                if (!localStorage.getItem('legalTermsAccepted')) {
                    const widget = document.getElementById('legalWidget');
                    if (widget) widget.classList.add('visible');
                }
            }, 3000);
        })
        .catch(error => {
            console.error('Error loading games:', error);
            const container = document.getElementById('game-categories');
            if (container) container.innerHTML = 
                '<p style="color: var(--earth-red)">Failed to load games. Please try again later.</p>';
        });
}

function displayFeaturedGames() {
    const gameCategoriesContainer = document.getElementById('game-categories');
    if (!gameCategoriesContainer) return;
    
    gameCategoriesContainer.innerHTML = '';
    
    const featuredGames = allGames.slice(0, 6);
    
    const featuredCategory = document.createElement('div');
    featuredCategory.className = 'category';
    
    const featuredHeader = document.createElement('div');
    featuredHeader.className = 'category-header';
    
    const featuredTitle = document.createElement('h3');
    featuredTitle.textContent = 'TRENDING NOW';
    
    const gameCount = document.createElement('span');
    gameCount.textContent = `${featuredGames.length} Games`;
    gameCount.style.color = 'var(--earth-blue)';
    
    featuredHeader.appendChild(featuredTitle);
    featuredHeader.appendChild(gameCount);
    
    const gameGrid = document.createElement('div');
    gameGrid.className = 'game-grid';
    
    featuredGames.forEach((game, index) => {
        const gameCard = createGameCard(game, index);
        gameGrid.appendChild(gameCard);
    });
    
    featuredCategory.appendChild(featuredHeader);
    featuredCategory.appendChild(gameGrid);
    gameCategoriesContainer.appendChild(featuredCategory);
}

function createGameCard(game, index) {
    const gameCard = document.createElement('div');
    gameCard.className = 'game-card';
    gameCard.style.animationDelay = `${0.1 + (index * 0.1)}s`;
    
    gameCard.innerHTML = `
        <img src="${game.image}" alt="${game.title}" class="game-image">
        <div class="game-info">
            <h4 class="game-title">${game.title}</h4>
            <p class="game-description">${game.description}</p>
            <div class="game-tags">
                ${game.tags.split(',').map(tag => `<span class="game-tag">${tag.trim()}</span>`).join('')}
            </div>
            <a href="${game.url}" class="play-button" target="_blank">PLAY NOW</a>
        </div>
    `;
    
    return gameCard;
}

document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('game-categories')) {
        loadGames();
    }
    
    const closeBtn = document.getElementById('closeGameBtn');
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            const gameFrame = document.getElementById('gameFrame');
            if (gameFrame) gameFrame.src = '';
            const gameContainer = document.getElementById('gameContainer');
            if (gameContainer) gameContainer.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }
    
    const fullscreenBtn = document.getElementById('fullscreenBtn');
    if (fullscreenBtn) {
        fullscreenBtn.addEventListener('click', function() {
            const gameFrame = document.getElementById('gameFrame');
            if (!gameFrame) return;
            
            if (!document.fullscreenElement) {
                gameFrame.requestFullscreen().catch(err => {
                    alert(`Error attempting to enable fullscreen: ${err.message}`);
                });
            } else {
                document.exitFullscreen();
            }
        });
    }
    
    const shareBtn = document.getElementById('shareGameBtn');
    if (shareBtn) {
        shareBtn.addEventListener('click', function() {
            const gameTitle = document.getElementById('currentGameTitle')?.textContent || 'Amazing Game';
            const shareUrl = window.location.href;
            
            if (navigator.share) {
                navigator.share({
                    title: gameTitle,
                    text: `Check out ${gameTitle} on Amazing Games!`,
                    url: shareUrl
                }).catch(console.error);
            } else {
                const tempInput = document.createElement('input');
                tempInput.value = shareUrl;
                document.body.appendChild(tempInput);
                tempInput.select();
                document.execCommand('copy');
                document.body.removeChild(tempInput);
                alert('Game link copied to clipboard!');
            }
        });
    }
});
