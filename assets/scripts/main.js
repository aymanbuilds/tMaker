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

const keywordsColor = "royalblue";
const propertiesColor = "tomato";

let colorMap = {
    'border-bottom-right-radius': propertiesColor,
    'border-bottom-left-radius': propertiesColor,
    'border-top-right-radius': propertiesColor,
    'border-top-left-radius': propertiesColor,
    'background-attachment': propertiesColor,
    'grid-template-columns': propertiesColor,
    'background-position': propertiesColor,
    'border-bottom-width': propertiesColor,
    'border-bottom-style': propertiesColor,
    'border-bottom-color': propertiesColor,
    'grid-template-areas': propertiesColor,
    'border-right-width': propertiesColor,
    'border-right-style': propertiesColor,
    'border-right-color': propertiesColor,
    'grid-template-rows': propertiesColor,
    'background-repeat': propertiesColor,
    'border-left-width': propertiesColor,
    'border-left-style': propertiesColor,
    'grid-auto-columns': propertiesColor,
    'background-color': propertiesColor,
    'background-image': propertiesColor,
    'border-top-width': propertiesColor,
    'border-top-style': propertiesColor,
    'border-top-color': propertiesColor,
    'text-decoration': propertiesColor,
    'justify-content': propertiesColor,
    'background-size': propertiesColor,
    'grid-column-gap': propertiesColor,
    'letter-spacing': propertiesColor,
    'text-transform': propertiesColor,
    'vertical-align': propertiesColor,
    'outline-offset': propertiesColor,
    'flex-direction': propertiesColor,
    'grid-auto-flow': propertiesColor,
    'grid-auto-rows': propertiesColor,
    'border-radius': propertiesColor,
    'border-bottom': propertiesColor,
    'outline-width': propertiesColor,
    'outline-style': propertiesColor,
    'outline-color': propertiesColor,

    // 'datetime-local': propertiesColor,
    
    'place-content': propertiesColor,
    'align-content': propertiesColor,
    'word-spacing': propertiesColor,
    'border-width': propertiesColor,
    'border-style': propertiesColor,
    'border-color': propertiesColor,
    'border-right': propertiesColor,
    'grid-row-gap': propertiesColor,
    'justify-self': propertiesColor,
    'placeholder': propertiesColor,
    'font-family': propertiesColor,
    'font-weight': propertiesColor,
    'tdecoration': propertiesColor,
    'align-items': propertiesColor,
    'text-shadow': propertiesColor,
    'line-height': propertiesColor,
    'text-indent': propertiesColor,
    'white-space': propertiesColor,
    'border-left': propertiesColor,
    'flex-shrink': propertiesColor,
    'grid-column': propertiesColor,
    'place-items': propertiesColor,
    'blockquote': keywordsColor,
    'figcaption': keywordsColor,
    'list-style': propertiesColor,
    'background': propertiesColor,
    'font-style': propertiesColor,
    'text-align': propertiesColor,
    'ttransform': propertiesColor,
    'border-top': propertiesColor,
    'visibility': propertiesColor,
    'box-shadow': propertiesColor,
    'transition': propertiesColor,
    'box-sizing': propertiesColor,
    'flex-basis': propertiesColor,
    'fdirection': propertiesColor,
    'place-self': propertiesColor,
    'align-self': propertiesColor,
    'max-height': propertiesColor,
    'min-height': propertiesColor,
    'container': keywordsColor,
    'font-size': propertiesColor,
    'bposition': propertiesColor,
    'overflowy': propertiesColor,
    'overflowx': propertiesColor,
    'animation': propertiesColor,
    'flex-grow': propertiesColor,
    'flex-wrap': propertiesColor,
    'gtcolumns': propertiesColor,
    'grid-area': propertiesColor,
    'gautoflow': propertiesColor,
    'gacolumns': propertiesColor,
    'btlradius': propertiesColor,
    'btrradius': propertiesColor,
    'bblradius': propertiesColor,
    'bbrradius': propertiesColor,
    'max-width': propertiesColor,
    'min-width': propertiesColor,
    'maxheight': propertiesColor,
    'minheight': propertiesColor,
    'textarea': keywordsColor,
    'colgroup': keywordsColor,
    'datalist': keywordsColor,
    'fieldset': keywordsColor,
    'menuitem': keywordsColor,
    'noscript': keywordsColor,
    'optgroup': keywordsColor,
    'progress': keywordsColor,
    'template': keywordsColor,
    'jcontent': propertiesColor,
    'position': propertiesColor,
    'lspacing': propertiesColor,
    'wspacing': propertiesColor,
    'overflow': propertiesColor,
    'grid-row': propertiesColor,
    'pcontent': propertiesColor,
    'acontent': propertiesColor,
    'maxwidth': propertiesColor,
    'minwidth': propertiesColor,

    // 'password': propertiesColor,
    // 'checkbox': propertiesColor,

    'address': keywordsColor,
    'article': keywordsColor,
    'caption': keywordsColor,
    'details': keywordsColor,
    'picture': keywordsColor,
    'section': keywordsColor,
    'summary': keywordsColor,
    'padding': propertiesColor,
    'bradius': propertiesColor,
    'ffamily': propertiesColor,
    'fweight': propertiesColor,
    'display': propertiesColor,
    'tshadow': propertiesColor,
    'lheight': propertiesColor,
    'tindent': propertiesColor,
    'brepeat': propertiesColor,
    'battach': propertiesColor,
    'bbottom': propertiesColor,
    'btwidth': propertiesColor,
    'brwidth': propertiesColor,
    'bbwidth': propertiesColor,
    'blwidth': propertiesColor,
    'btstyle': propertiesColor,
    'brstyle': propertiesColor,
    'bbstyle': propertiesColor,
    'z-index': propertiesColor,
    'opacity': propertiesColor,
    'bshadow': propertiesColor,
    'blstyle': propertiesColor,
    'btcolor': propertiesColor,
    'brcolor': propertiesColor,
    'bbcolor': propertiesColor,
    'outline': propertiesColor,
    'ooffset': propertiesColor,
    'bsizing': propertiesColor,
    'fshrink': propertiesColor,
    'gtareas': propertiesColor,
    'gcolumn': propertiesColor,

    // 'submit': propertiesColor,
    // 'button': propertiesColor,
    // 'search': propertiesColor,
    // 'hidden': propertiesColor,

    'parent': keywordsColor,
    'remove': keywordsColor,
    'center': keywordsColor,
    'column': keywordsColor,
    'button': keywordsColor,
    'anchor': keywordsColor,
    'canvas': keywordsColor,
    'dialog': keywordsColor,
    'figure': keywordsColor,
    'footer': keywordsColor,
    'header': keywordsColor,
    'iframe': keywordsColor,
    'legend': keywordsColor,
    'object': keywordsColor,
    'option': keywordsColor,
    'output': keywordsColor,
    'script': keywordsColor,
    'select': keywordsColor,
    'source': keywordsColor,
    'strong': keywordsColor,
    'lstyle': propertiesColor,
    'margin': propertiesColor,
    'border': propertiesColor,
    'height': propertiesColor,
    'cursor': propertiesColor,
    'fstyle': propertiesColor,
    'talign': propertiesColor,
    'aitems': propertiesColor,
    'bottom': propertiesColor,
    'props': keywordsColor,
    'wspace': propertiesColor,
    'valign': propertiesColor,
    'bcolor': propertiesColor,
    'bimage': propertiesColor,
    'bwidth': propertiesColor,
    'bstyle': propertiesColor,
    'bright': propertiesColor,
    'zindex': propertiesColor,
    'owidth': propertiesColor,
    'ostyle': propertiesColor,
    'ocolor': propertiesColor,
    'filter': propertiesColor,
    'fbasis': propertiesColor,
    'gtrows': propertiesColor,
    'garows': propertiesColor,
    'pitems': propertiesColor,

    // 'radio': propertiesColor,
    // 'image': propertiesColor,
    // 'reset': propertiesColor,
    // 'color': propertiesColor,
    // 'email': propertiesColor,
    // 'month': propertiesColor,
    // 'range': propertiesColor,

    'image': keywordsColor,
    'input': keywordsColor,
    'style': keywordsColor,
    'aside': keywordsColor,
    'audio': keywordsColor,
    'embed': keywordsColor,
    'label': keywordsColor,
    'meter': keywordsColor,
    'param': keywordsColor,
    'small': keywordsColor,
    'table': keywordsColor,
    'tbody': keywordsColor,
    'tfoot': keywordsColor,
    'thead': keywordsColor,
    'title': keywordsColor,
    'track': keywordsColor,
    'video': keywordsColor,
    'color': propertiesColor,
    'value': propertiesColor,
    'width': propertiesColor,
    'fsize': propertiesColor,
    'right': propertiesColor,
    'clear': propertiesColor,
    'float': propertiesColor,
    'bsize': propertiesColor,
    'bleft': propertiesColor,
    'order': propertiesColor,
    'fgrow': propertiesColor,
    'fwrap': propertiesColor,
    'gcgap': propertiesColor,
    'grgap': propertiesColor,
    'garea': propertiesColor,
    'pself': propertiesColor,
    'aself': propertiesColor,
    'jself': propertiesColor,

    // 'date': propertiesColor,
    // 'week': propertiesColor,
    // 'time': propertiesColor,
    // 'text': propertiesColor,
    // 'file': propertiesColor,
    'type': propertiesColor,

    'attr': keywordsColor,

    'exec': keywordsColor,
    'grid': propertiesColor,
    'abbr': keywordsColor,
    'area': keywordsColor,
    'base': keywordsColor,
    'body': keywordsColor,
    'cite': keywordsColor,
    'code': keywordsColor,
    'data': keywordsColor,
    'form': keywordsColor,
    'head': keywordsColor,
    'html': propertiesColor,
    'main': keywordsColor,
    'mark': keywordsColor,
    'menu': keywordsColor,
    'meta': keywordsColor,
    'ruby': keywordsColor,
    'samp': keywordsColor,
    'slot': keywordsColor,
    'span': keywordsColor,
    'time': keywordsColor,
    'text': propertiesColor,
    'left': propertiesColor,
    'btop': propertiesColor,
    'clip': propertiesColor,
    'flex': propertiesColor,
    'grow': propertiesColor,
    'cols': propertiesColor,
    'href': propertiesColor,

    // 'url': propertiesColor,
    // 'tel': propertiesColor,

    'add': keywordsColor,
    'row': keywordsColor,
    'img': keywordsColor,
    'bdi': keywordsColor,
    'bdo': keywordsColor,
    'col': keywordsColor,
    'del': keywordsColor,
    'dfn': keywordsColor,
    'div': keywordsColor,
    'ins': keywordsColor,
    'kbd': keywordsColor,
    'map': keywordsColor,
    'nav': keywordsColor,
    'pre': keywordsColor,
    'rtc': keywordsColor,
    'sub': keywordsColor,
    'sup': keywordsColor,
    'var': keywordsColor,
    'wbr': keywordsColor,
    'top': propertiesColor,
    'gap': propertiesColor,
    'src': propertiesColor,
    'of': keywordsColor,
    'ul': keywordsColor,
    'li': keywordsColor,
    'br': keywordsColor,
    'dd': keywordsColor,
    'dl': keywordsColor,
    'dt': keywordsColor,
    'em': keywordsColor,
    'h1': keywordsColor,
    'h2': keywordsColor,
    'h3': keywordsColor,
    'h4': keywordsColor,
    'h5': keywordsColor,
    'h6': keywordsColor,
    'hr': keywordsColor,
    'ol': keywordsColor,
    'rp': keywordsColor,
    'rt': keywordsColor,
    'td': keywordsColor,
    'th': keywordsColor,
    'tr': keywordsColor,
    'bg': propertiesColor,
    'a': keywordsColor,
    'b': keywordsColor,
    'i': keywordsColor,
    'p': keywordsColor,
    'q': keywordsColor,
    's': keywordsColor,
    'u': keywordsColor
};

// const keys = Object.keys(colorMap);

// // Sort the keys by length, from longest to shortest
// keys.sort((a, b) => b.length - a.length);

// // Create a new sorted colorMap object
// const sortedColorMap = [];
// keys.forEach(key => {
//     document.getElementById('txt').value += `'${key}': ${colorMap[key]},\n`;
// });


// function applyColors(text) {
//     //let re = new RegExp(Object.keys(colorMap).join("|"), "gi");
//     let re = new RegExp("\\b(" + Object.keys(colorMap).join("|") + ")\\b", "gi");

//     return text.replace(re, function (m) {
//         let c = colorMap[m.toLowerCase()];
//         return `<span style="color:${c}">${m}</span>`;
//     });
// }

// function applyColors(text) {
//     // Regex to match lines starting with //
//     let lineCommentRe = /^#.*$/gm;
//     // Regex to match whole words from the colorMap
//     let wordRe = new RegExp("\\b(" + Object.keys(colorMap).join("|") + ")\\b", "gi");

//     // Apply color to keywords
//     text = text.replace(wordRe, function (m) {
//         let c = colorMap[m.toLowerCase()];
//         return `<span style="color:${c}">${m}</span>`;
//     });


//     // Apply green color to lines starting with //
//     text = text.replace(lineCommentRe, function (line) {
//         return `<span style="color:green">${line}</span>`;
//     });

//     return text;
// }

function applyColors(text) {
    const lineCommentRe = /^\s*#.*$/gm;
    const wordRe = new RegExp("\\b(" + Object.keys(colorMap).join("|") + ")\\b", "gi");

    const lines = text.split('\n');
    const coloredLines = lines.map(line => {
        if (!lineCommentRe.test(line)) {
            line = line.replace(wordRe, function (m) {
                let c = colorMap[m.toLowerCase()];
                return `<span style="color:${c}">${m}</span>`;
            });
        }
        return line.replace(lineCommentRe, function (line) {
            return `<span style="color:green">${line}</span>`;
        });
    });

    return coloredLines.join('\n');
}


// Function to save content to local storage
function saveToLocalStorage(id, textareaID) {
    const textarea = document.getElementById(textareaID);
    localStorage.setItem(id, textarea.value);
}

// Function to auto expand textarea
function autoExpand(id) {
    const textarea = document.getElementById(id);
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
}

// Event listeners for input events on each textarea
document.getElementById('in').addEventListener('input', function () {
    saveToLocalStorage('code', this.id);
    autoExpand('in');
});

document.getElementById('functionsInput').addEventListener('input', function () {
    saveToLocalStorage('functions', this.id);
    autoExpand('functionsInput');
});

document.getElementById('stylesInput').addEventListener('input', function () {
    saveToLocalStorage('styles', this.id);
    autoExpand('stylesInput');
});

document.addEventListener('DOMContentLoaded', function () {
    // Load content from local storage
    const savedCode = localStorage.getItem('code');
    if (savedCode !== null) {
        document.getElementById('in').value = savedCode;
        document.getElementById('in').parentElement.querySelector(".custom-area").innerHTML = applyColors(savedCode);
        autoExpand('in');
    }

    const savedFunctions = localStorage.getItem('functions');
    if (savedFunctions !== null) {
        document.getElementById('functionsInput').value = savedFunctions;
        document.getElementById('functionsInput').parentElement.querySelector(".custom-area").innerHTML = applyColors(savedFunctions);
        autoExpand('functionsInput');
    }

    const savedStyles = localStorage.getItem('styles');
    if (savedStyles !== null) {
        document.getElementById('stylesInput').value = savedStyles;
        document.getElementById('stylesInput').parentElement.querySelector(".custom-area").innerHTML = applyColors(savedStyles);
        autoExpand('stylesInput');
    }

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
                    autoExpand(document.getElementById(targetId).querySelector('textarea').id);
                    //document.getElementById(targetId).querySelector('textarea').focus();
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
        textarea.addEventListener('change', () => synchronizeScroll(textarea, lineNumbersWrapper));

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
    document.querySelector('#loader').style.display = "block";
}

function hideLoader() {
    document.querySelector('.popups').classList.remove('visible');
    document.querySelector('#loader').style.display = "none";
}

function showOutput() {
    const popupInner = document.querySelector('#output .inner');
    popupInner.innerHTML = '';

    outputArray.forEach(item => {
        const messageDiv = document.createElement('div');
        let formattedMessage = item.message.replace(/'(.*?)'/g, '<b>$1</b>');
        messageDiv.innerHTML = formattedMessage;
        messageDiv.classList.add('output-message');
        messageDiv.classList.add(item.success ? 'success' : 'error');
        popupInner.appendChild(messageDiv);
    });

    document.querySelector('.popups').classList.add('visible');
    document.querySelector('#output').style.display = "flex";
}

function hideOutput() {
    document.querySelector('.popups').classList.remove('visible');
    document.querySelector('#output').style.display = "none";
}

document.getElementById('close-output-popup').addEventListener('click', function () {
    hideOutput()
});