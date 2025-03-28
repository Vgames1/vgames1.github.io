// VGAMES Services with descriptions
const vgamesServices = [
    {
        "name": "VCloud",
        "url": "https://vcloud.vgames.run.place",
        "icon": "../assets/images/vgameswhite.png",
        "description": "VGAMES Cloud Storage Service - Store and access your game saves and files from anywhere"
    }
    // Add more services here
];

// Load more links with descriptions
function loadMoreLinks() {
    const moreLinksContainer = document.getElementById('more-links');
    moreLinksContainer.innerHTML = '';
    vgamesServices.forEach(service => {
        const serviceContainer = document.createElement('div');
        serviceContainer.className = 'service-container';
        
        const link = document.createElement('a');
        link.href = service.url;
        link.className = 'more-link';
        link.target = '_blank';
        link.innerHTML = `
            <img src="${service.icon}" alt="${service.name}">
            <span>${service.name}</span>
        `;
        
        const description = document.createElement('div');
        description.className = 'link-description';
        description.textContent = service.description;
        
        serviceContainer.appendChild(link);
        serviceContainer.appendChild(description);
        moreLinksContainer.appendChild(serviceContainer);
    });
}

// Setup click handlers for link descriptions
function setupLinkDescriptions() {
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('more-link')) {
            e.preventDefault();
            const description = e.target.nextElementSibling;
            const isVisible = description.style.display === 'block';
            
            // Hide all descriptions first
            document.querySelectorAll('.link-description').forEach(desc => {
                desc.style.display = 'none';
            });
            
            // Show/hide clicked description
            description.style.display = isVisible ? 'none' : 'block';
            
            // Open link if description was already visible
            if (isVisible) {
                window.open(e.target.href, '_blank');
            }
        }
    });
}
