function showPopup(id) {
    var popupContainer = document.getElementById('popups');
    var popup = document.getElementById(id);

    if (popup && popupContainer) {
        popupContainer.classList.add('show');
        popup.classList.add('show');
    } else {
        console.error('Popup or popup container not found.');
    }
}

function hidePopup(id) {
    var popupContainer = document.getElementById('popups');
    var popup = document.getElementById(id);

    if (popup && popupContainer) {
        popupContainer.classList.remove('show');
        popup.classList.remove('show');
    } else {
        console.error('Popup or popup container not found.');
    }
}

let currentPage = window.location.pathname.split('/').pop();

function changeLanguage(language) {
    var englishElements = document.querySelectorAll('.english');
    var frenchElements = document.querySelectorAll('.french');

    if (language.toLowerCase() === 'english') {
        if (currentPage === 'index.html') {
            document.getElementById('language-icon').src = 'assets/icons/english.png';
        } else {
            document.getElementById('language-icon').src = '../assets/icons/english.png';
        }
        document.getElementById('language-label').innerText = 'English';
        document.getElementById('search-input').placeholder = 'Search for something...';

        englishElements.forEach(function (element) {
            element.classList.add('show');
        });
        frenchElements.forEach(function (element) {
            element.classList.remove('show');
        });
    } else if (language.toLowerCase() === 'french') {
        if (currentPage === 'index.html') {
            document.getElementById('language-icon').src = 'assets/icons/french.png';
        } else {
            document.getElementById('language-icon').src = '../assets/icons/french.png';
        }
        document.getElementById('language-label').innerText = 'Français';
        document.getElementById('search-input').placeholder = 'Rechercher quelque chose...';

        englishElements.forEach(function (element) {
            element.classList.remove('show');
        });
        frenchElements.forEach(function (element) {
            element.classList.add('show');
        });
    }

    localStorage.setItem('language', language.toLowerCase());

    hidePopup('language');
}

function getStoredLanguage() {
    return localStorage.getItem('language');
}

function openSidebar() {
    document.querySelector('.sidebar').style.left = '0';
}

function hideSidebar() {
    document.querySelector('.sidebar').style.left = '-350px';
}

document.addEventListener('DOMContentLoaded', () => {
    let language = getStoredLanguage() || 'english';
    changeLanguage(language);

    const searchInput = document.getElementById('search-input');
    const suggestionsBox = document.querySelector('.suggestions');
    const sidebarLinks = document.querySelectorAll('.sidebar a');

    // Function to create a suggestion item
    const createSuggestionItem = (text, href) => {
        const item = document.createElement('div');
        item.classList.add('item');
        item.textContent = text;
        if (href) {
            item.onclick = () => window.location.href = href;
        } else {
            item.classList.add('unclickable');
        }
        return item;
    };

    // Function to update suggestions based on the input and language
    const updateSuggestions = () => {
        let language = getStoredLanguage() || 'english';

        const query = searchInput.value.trim().toLowerCase();
        suggestionsBox.innerHTML = ''; // Clear previous suggestions

        if (query !== "") {
            let matchedItems = Array.from(sidebarLinks).filter(link => {
                const linkLanguage = link.closest('li').classList.contains(language);
                return link.textContent.toLowerCase().includes(query) && linkLanguage;
            });

            if (matchedItems.length > 0) {
                matchedItems.forEach(link => {
                    const suggestionItem = createSuggestionItem(link.textContent, link.href);
                    suggestionsBox.appendChild(suggestionItem);
                });
                suggestionsBox.classList.add('show');
            } else {
                const noResultsItem = createSuggestionItem('No Results', null);
                suggestionsBox.appendChild(noResultsItem);
                suggestionsBox.classList.add('show');
            }
        } else {
            suggestionsBox.classList.remove('show');
        }
    };

    // Attach input event listener
    searchInput.addEventListener('input', updateSuggestions);
});
