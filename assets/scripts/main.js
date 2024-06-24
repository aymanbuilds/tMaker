document.querySelector('.toggle-menu').addEventListener('click', function () {
    const img = this.querySelector('img');
    const sidebar = document.querySelector('.sidebar');
    const cover = document.querySelector('.cover');

    if (img.classList.contains('flip')) {
        img.classList.remove('flip');
        document.querySelector('.toggle-menu').style.backgroundColor = "#ddd";
        sidebar.style.right = '-7rem';
        cover.style.opacity = "0";
        cover.style.visibility = "hidden";
    } else {
        img.classList.add('flip');
        document.querySelector('.toggle-menu').style.backgroundColor = "white";
        sidebar.style.right = '0';
        cover.style.opacity = "1";
        cover.style.visibility = "visible";
    }
});

function saveToLocalStorageCode() {
    const code = document.getElementById('in').value;
    localStorage.setItem('code', code);
}

function saveToLocalStorageFunctions() {
    const functions = document.getElementById('functionsInput').value;
    localStorage.setItem('functions', functions);
}

function saveToLocalStorageStyles() {
    const functions = document.getElementById('stylesInput').value;
    localStorage.setItem('styles', functions);
}

function loadFromLocalStorage() {
    const savedCode = localStorage.getItem('code');
    if (savedCode !== null) {
        document.getElementById('in').value = savedCode;
        document.getElementById('in').focus();
    }

    const functionsCode = localStorage.getItem('functions');
    if (functionsCode !== null) {
        document.getElementById('functionsInput').value = functionsCode;
    }

    const styles = localStorage.getItem('styles');
    if (functionsCode !== null) {
        document.getElementById('stylesInput').value = styles;
    }
}

document.getElementById('in').addEventListener('input', saveToLocalStorageCode);
document.getElementById('functionsInput').addEventListener('input', saveToLocalStorageFunctions);
document.getElementById('stylesInput').addEventListener('input', saveToLocalStorageStyles);

document.addEventListener('DOMContentLoaded', function () {
    loadFromLocalStorage();

    const tabs = document.querySelectorAll('.tab');
    const textareas = document.querySelectorAll('.line-numbers-wrapper');

    tabs.forEach(tab => {
        tab.addEventListener('click', function () {
            const targetId = this.getAttribute('data-target');

            tabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');

            textareas.forEach(ta => {
                if (ta.id === targetId) {
                    ta.classList.add('active');
                    document.getElementById(targetId).querySelector('textarea').focus();
                } else {
                    ta.classList.remove('active');
                }
            });
        });
    });


    function setupLineNumbers(textareaId) {
        const textarea = document.getElementById(textareaId);
        const lineNumbersWrapper = document.createElement('div');
        lineNumbersWrapper.className = 'line-numbers';

        textarea.addEventListener('input', () => updateLineNumbers(textarea, lineNumbersWrapper));
        textarea.addEventListener('scroll', () => synchronizeScroll(textarea, lineNumbersWrapper));

        textarea.parentNode.insertBefore(lineNumbersWrapper, textarea);

        updateLineNumbers(textarea, lineNumbersWrapper);
    }

    function updateLineNumbers(textarea, lineNumbersWrapper) {
        const lines = textarea.value.split('\n').length;
        lineNumbersWrapper.innerHTML = Array.from(Array(lines)).map((_, i) => i + 1).join('<br>');
    }

    function synchronizeScroll(textarea, lineNumbersWrapper) {
        lineNumbersWrapper.style.top = `-${textarea.scrollTop}px`;
    }

    setupLineNumbers('in');
    setupLineNumbers('functionsInput');
    setupLineNumbers('stylesInput');
});

function showLoader() {
    document.querySelector('.popups').classList.add('visible');
}

function hideLoader() {
    document.querySelector('.popups').classList.remove('visible');
}