function loadHeader() {

    const headerContainer = document.querySelector('#site-header');

    if (!headerContainer) return;

    headerContainer.innerHTML = `

        <div class="announcement-bar" role="status" aria-live="polite">
            <span id="announcement-message">
                Livraison offerte dès 150 €
            </span>
        </div>

        <header class="header">

            <a href="index.html" class="logo">
                KASA
            </a>

            <nav class="navigation">

                <a href="tables-basses.html">
                    Mobilier
                </a>

                <a href="decoration.html">
                    Décoration
                </a>

                <a href="inspiration.html">
                    Inspiration
                </a>

                <a href="notre-histoire.html">
                    Notre histoire
                </a>

            </nav>

            <div class="header-actions">

                <button
                    type="button"
                    class="search-button"
                    aria-label="Rechercher"
                >
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                        <circle cx="11" cy="11" r="6"></circle>
                        <path d="M16 16l4 4"></path>
                    </svg>
                </button>

                <a
                    href="panier.html"
                    class="header-cart-link"
                    aria-label="Panier"
                >
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M4 5h2l1.5 11h9L18 8H7"></path>
                        <circle cx="9" cy="20" r="1"></circle>
                        <circle cx="16" cy="20" r="1"></circle>
                    </svg>

                    <span class="cart-count">0</span>
                </a>

            </div>

        </header>
        <div class="search-panel" id="search-panel">

    <div class="search-panel-inner">

        <input
            type="search"
            id="search-input"
            placeholder="Rechercher un produit..."
            autocomplete="off"
        >

        <button
            type="button"
            id="close-search"
            aria-label="Fermer la recherche"
        >
            ×
        </button>

    </div>
        <div id="search-results"></div>
</div>

        </div>
    `;
}


function loadFooter() {

    const footerContainer = document.querySelector('#site-footer');

    if (!footerContainer) return;

    footerContainer.innerHTML = `

        <footer class="footer">

            <div class="footer-main">

                <div class="footer-brand">

                    <div class="footer-logo">
                        KASA
                    </div>

                    <p>
                        La maison, autrement.
                    </p>

                    <p class="footer-description">
                        Mobilier et décoration inspirés par les matières
                        et savoir-faire d'Asie du Sud-Est.
                    </p>

                </div>


                <div class="footer-column">

                    <h3>Découvrir</h3>

                    <a href="tables-basses.html">Mobilier</a>
                    <a href="decoration.html">Décoration</a>
                    <a href="inspiration.html">Inspiration</a>
                    <a href="notre-histoire.html">Notre histoire</a>

                </div>


                <div class="footer-column">

                    <h3>Services</h3>

                    <a href="#">Livraison</a>
                    <a href="#">Retours</a>
                    <a href="#">Contact</a>
                    <a href="#">FAQ</a>

                </div>


                <div class="footer-column">

                    <h3>Suivez-nous</h3>

                    <a href="#">Instagram</a>
                    <a href="#">Pinterest</a>
                    <a href="#">Facebook</a>

                </div>

            </div>


            <div class="footer-bottom">

                <span>
                    © 2026 KASA. Tous droits réservés.
                </span>

                <div class="footer-legal">

                    <a href="#">Mentions légales</a>
                    <a href="#">Politique de confidentialité</a>
                    <a href="#">CGV</a>

                </div>

            </div>
<div class="footer-disclaimer">
    © 2026 KASA · Projet fictif réalisé dans le cadre d'un portfolio.
</div>
        </footer>

    `;
}


function updateCartCount() {

    const cartCount = document.querySelector('.cart-count');

    if (!cartCount) return;

    const cart =
        JSON.parse(localStorage.getItem('kasaCart')) || [];

    const totalQuantity = cart.reduce((total, product) => {
        return total + product.quantity;
    }, 0);

    cartCount.textContent = totalQuantity;
}

loadHeader();
loadFooter();
updateCartCount();
initSearch();

function initSearch() {

    const searchButton =
        document.querySelector('.search-button');

    const searchPanel =
        document.querySelector('#search-panel');

    const searchInput =
        document.querySelector('#search-input');

    const closeSearch =
        document.querySelector('#close-search');

    const searchResults =
        document.querySelector('#search-results');

    if (
        !searchButton ||
        !searchPanel ||
        !searchInput ||
        !closeSearch ||
        !searchResults
    ) {
        return;
    }

    searchButton.addEventListener('click', () => {

        searchPanel.style.display = 'block';

        searchInput.focus();

    });

    closeSearch.addEventListener('click', () => {

        searchPanel.style.display = 'none';

        searchInput.value = '';

        searchResults.innerHTML = '';

    });

    searchInput.addEventListener('input', () => {

        const searchTerm =
            searchInput.value.trim().toLowerCase();

        if (searchTerm === '') {

            searchResults.innerHTML = '';

            return;
        }

        const filteredProducts = products.filter(product => {

            return (
                product.name.toLowerCase().includes(searchTerm) ||
                product.category.toLowerCase().includes(searchTerm)
            );

        });

        if (filteredProducts.length === 0) {

            searchResults.innerHTML = `
                <p class="search-no-result">
                    Aucun produit trouvé.
                </p>
            `;

            return;
        }

        searchResults.innerHTML =
            filteredProducts.map(product => `

                <a
                    href="${product.link}"
                    class="search-result"
                >

                    <img
                        src="${product.image}"
                        alt="${product.name}"
                    >

                    <div>

                        <strong>
                            ${product.name}
                        </strong>

                        <span>
                            ${product.price} €
                        </span>

                    </div>

                </a>

            `).join('');

    });

    document.addEventListener('keydown', (event) => {

        if (event.key === 'Escape') {

            searchPanel.style.display = 'none';

            searchInput.value = '';

            searchResults.innerHTML = '';

        }

    });

    document.addEventListener('click', (event) => {

        if (
            searchPanel.style.display === 'block' &&
            !searchPanel.contains(event.target) &&
            !searchButton.contains(event.target)
        ) {

            searchPanel.style.display = 'none';

            searchInput.value = '';

            searchResults.innerHTML = '';

        }

    });

}
function initAnnouncementBar() {
    const messageElement = document.querySelector(
        '#announcement-message'
    );

    if (!messageElement) return;

    const messages = [
        'Livraison offerte dès 150 €',
        '-10 % sur votre première commande avec BIENVENUE10',
        'Des retours possibles sous 30 jours',
        'Paiement sécurisé à chaque commande'
    ];

    let currentIndex = 0;

    setInterval(() => {
        currentIndex = (currentIndex + 1) % messages.length;
        messageElement.textContent = messages[currentIndex];
    }, 5 * 60 * 1000);
}

initAnnouncementBar();
