
function toggleLegalWidget() {
    const widget = document.getElementById('legalWidget');
    if (widget) widget.classList.toggle('visible');
}

function acceptLegalTerms() {
    localStorage.setItem('legalTermsAccepted', 'true');
    const widget = document.getElementById('legalWidget');
    if (widget) widget.classList.remove('visible');
    
    if(typeof gtag !== 'undefined') {
        gtag('event', 'legal_terms_accepted');
    }
}


(function() {
    function isMobileDevice() {
        return (typeof window.orientation !== "undefined") || 
               (navigator.userAgent.indexOf('IEMobile') !== -1) ||
               (/Android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone/i.test(navigator.userAgent));
    }

    function showMobileBlock() {
        document.body.innerHTML = `
            <style>
                .mobile-block {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(135deg, #4CAF50, #2196F3);
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    text-align: center;
                    padding: 20px;
                    z-index: 9999;
                    font-family: 'Poppins', sans-serif;
                    color: white;
                }
                .mobile-logo {
                    width: 120px;
                    height: 120px;
                    margin-bottom: 30px;
                    animation: pulse 2s infinite;
                }
                @keyframes pulse {
                    0% { transform: scale(1); }
                    50% { transform: scale(1.1); }
                    100% { transform: scale(1); }
                }
                .mobile-title {
                    font-size: 2rem;
                    font-weight: bold;
                    margin-bottom: 20px;
                    text-shadow: 0 2px 5px rgba(0,0,0,0.3);
                }
                .mobile-message {
                    font-size: 1.2rem;
                    max-width: 500px;
                    margin-bottom: 30px;
                    line-height: 1.6;
                }
                .mobile-button {
                    background: white;
                    color: #2196F3;
                    padding: 15px 30px;
                    border-radius: 50px;
                    text-decoration: none;
                    font-weight: bold;
                    font-size: 1.2rem;
                    box-shadow: 0 5px 15px rgba(0,0,0,0.2);
                    transition: all 0.3s ease;
                }
                .mobile-button:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 8px 20px rgba(0,0,0,0.3);
                }
            </style>
            <div class="mobile-block">
                <img src="assets/images/vgstu.png" alt="VGAMES Logo" class="mobile-logo">
                <h1 class="mobile-title">Mobile Access Restricted</h1>
                <p class="mobile-message">
                    For the best gaming experience, please download our official app from the link below.
                    Mobile browser access is not supported.
                </p>
                <a href="https://vgames.run.place/download" class="mobile-button">Download Our App</a>
            </div>
        `;
    }

    if (isMobileDevice() && !window.location.pathname.includes('our-games.html')) {
        showMobileBlock();
    }
})();
