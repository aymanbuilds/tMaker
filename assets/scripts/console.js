document.addEventListener('DOMContentLoaded', () => {
    const textareas = document.querySelectorAll('.code-editor');
    const suggestionsBox = document.getElementById('suggestions-box');

    textareas.forEach(textArea => {
        const customArea = textArea.parentElement.querySelector(".custom-area");
        const backdrop = textArea.parentElement.querySelector(".backdrop");

        textArea.addEventListener("input", function () {
            customArea.innerHTML = applyColors(textArea.value);
        });

        textArea.addEventListener("scroll", function () {
            customArea.scrollTop = textArea.scrollTop;
            customArea.scrollLeft = textArea.scrollLeft;
        });
    });

    // const inputTypes = [
    //     'text', 'password', 'email', 'number', 'tel', 'url',
    //     'search', 'color', 'date', 'datetime-local', 'month', 'week',
    //     'time', 'checkbox', 'radio', 'file', 'range', 'hidden', 'image',
    //     'submit', 'reset', 'button'
    // ];

    const suggestions = [
        "exec", "center", "column", "row", "grid", "ul", "li", "container",
        "button", "image", "img", "input", "textarea", "a", "style",
        "anchor", "abbr", "address", "area", "article", "aside",
        "audio", "b", "base", "bdi", "bdo", "blockquote",
        "body", "br", "button", "canvas", "caption", "cite",
        "code", "col", "colgroup", "data", "datalist", "dd",
        "del", "details", "dfn", "dialog", "div", "dl",
        "dt", "em", "embed", "fieldset", "figcaption", "figure",
        "footer", "form", "h1", "h2", "h3", "h4",
        "h5", "h6", "head", "header", "hr", "html",
        "i", "iframe", "img", "input", "ins", "kbd",
        "label", "legend", "main", "map", "mark",
        "menu", "menuitem", "meta", "meter", "nav", "noscript",
        "object", "ol", "optgroup", "option", "output", "p",
        "param", "picture", "pre", "progress", "q", "rp",
        "rt", "rtc", "ruby", "s", "samp", "script",
        "section", "select", "slot", "small", "source", "span",
        "strong", "style", "sub", "summary", "sup", "table",
        "tbody", "td", "template", "textarea", "tfoot", "th",
        "thead", "time", "title", "tr", "track", "u", "var", "video", "wbr",
        'add', 'parent', 'of', 'margin', 'padding', 'html', 'text',
        'border', 'border-radius', 'bradius', 'background', 'bg', 'color', 'value',
        'placeholder', 'width', 'height', 'font-size', 'fsize', 'cursor',
        'font-family', 'ffamily', 'font-weight', 'fweight', 'font-style', 'fstyle', 'text-align', 'talign',
        'text-decoration', 'tdecoration', 'align-items', 'aitems', 'justify-content', 'jcontent',
        'display', 'position', 'left', 'top', 'right', 'bottom',
        'clear', 'float', 'text-shadow', 'tshadow', 'line-height', 'lheight',
        'letter-spacing', 'lspacing', 'word-spacing', 'wspacing', 'text-transform', 'ttransform',
        'text-indent', 'tindent', 'white-space', 'wspace', 'vertical-align', 'valign',
        'background-color', 'bcolor', 'background-image', 'bimage',
        'background-position', 'bposition', 'background-size', 'bsize',
        'background-repeat', 'brepeat', 'background-attachment', 'battach',
        'border-width', 'bwidth', 'border-style', 'bstyle', 'border-color', 'bcolor',
        'border-top', 'btop', 'border-right', 'bright', 'border-bottom', 'bbottom',
        'border-left', 'bleft',
        'border-top-width', 'btwidth', 'border-right-width', 'brwidth',
        'border-bottom-width', 'bbwidth', 'border-left-width', 'blwidth',
        'border-top-style', 'btstyle', 'border-right-style', 'brstyle',
        'border-bottom-style', 'bbstyle', 'z-index', 'zindex', 'overflow', 'overflowy', 'overflowx',
        'visibility', 'visibility', 'opacity', 'opacity', 'box-shadow', 'bshadow',
        'border-left-style', 'blstyle', 'border-top-color', 'btcolor',
        'border-right-color', 'brcolor', 'border-bottom-color', 'bbcolor',
        'outline', 'outline', 'outline-width', 'owidth', 'outline-style', 'ostyle',
        'outline-color', 'ocolor', 'outline-offset', 'ooffset', 'list-style', 'lstyle',

        'transition', 'animation', 'clip', 'filter', 'flex', 'order', 'grid', 'gap',

        'box-sizing', 'bsizing', 'flex-grow', 'fgrow', 'flex-shrink', 'fshrink',
        'flex-basis', 'fbasis', 'flex-direction', 'fdirection', 'flex-wrap', 'fwrap',
        'grid-template-columns', 'gtcolumns', 'grid-template-rows', 'gtrows',
        'grid-template-areas', 'gtareas', 'grid-column-gap', 'gcgap',
        'grid-row-gap', 'grgap', 'grid-area', 'garea', 'grid-column', 'gcolumn',
        'grid-row', 'grow', 'grid-auto-flow', 'gautoflow', 'grid-auto-columns', 'gacolumns',
        'grid-auto-rows', 'garows', 'place-items', 'pitems', 'place-content', 'pcontent',
        'place-self', 'pself', 'align-content', 'acontent', 'align-self', 'aself',
        'justify-self', 'jself', 'cols',
        'border-top-left-radius', 'btlradius', 'border-top-right-radius', 'btrradius',
        'border-bottom-left-radius', 'bblradius', 'border-bottom-right-radius', 'bbrradius',
        'src', 'href',

        'sbetween', 'space-between', 'saround', 'space-around',
        'sevenly', 'space-evenly', 'fstart', 'flex-start',
        'fend', 'flex-end', 'rreverse', 'row-reverse', 'creverse', 'column-reverse',
        'wreverse', 'wrap-reverse', 'nrepeat', 'no-repeat', 'rx', 'repeat-x',
        'ry', 'repeat-y', 'ttop', 'text-top', 'tbottom', 'text-bottom',
        'max-width', 'maxwidth', 'minwidth', 'min-width',
        'max-height', 'maxheight', 'minheight', 'min-height', "props",

        'text', 'password', 'email', 'number', 'tel', 'url',
        'search', 'color', 'date', 'datetime-local', 'month', 'week',
        'time', 'checkbox', 'radio', 'file', 'range', 'hidden', 'image',
        'submit', 'reset', 'button'];

    suggestions.sort();

    let activeTextarea = null;

    function organizeTextareaValue(textarea) {
        const lines = textarea.value.split('\n');
        let tabLevel = 0;
        const tab = '\t';
        const organizedLines = lines.map(line => {
            let trimmedLine = line.trim();

            if (trimmedLine.includes('}')) {
                tabLevel--;
            }

            const indentedLine = tab.repeat(tabLevel) + trimmedLine;

            if (trimmedLine.includes('{')) {
                tabLevel++;
            }

            return indentedLine;
        });

        textarea.value = organizedLines.join('\n');
        textarea.parentElement.querySelector(".custom-area").innerHTML = applyColors(organizedLines.join('\n'));
    }


    textareas.forEach(organizeTextareaValue);

    // Attach the organize function to a button or any other event
    document.getElementById('alignCodeBtn').addEventListener('click', () => {
        const textareas = document.querySelectorAll('.code-editor');
        textareas.forEach(organizeTextareaValue);
    });

    textareas.forEach(textarea => {
        textarea.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                e.preventDefault();
                const start = textarea.selectionStart;
                const end = textarea.selectionEnd;

                // Insert tab character
                textarea.value = textarea.value.substring(0, start) + "\t" + textarea.value.substring(end);
                textarea.parentElement.querySelector(".custom-area").innerHTML = applyColors(textarea.value);

                // Place the cursor at the right position
                textarea.selectionStart = textarea.selectionEnd = start + 1;
            }
        });

        textarea.addEventListener('keydown', (event) => {
            if (event.ctrlKey && event.code === 'Space') {
                event.preventDefault();
                showSuggestionsBox(textarea);
                activeTextarea = textarea;
            }
        });

        textarea.addEventListener('click', (event) => {
            suggestionsBox.style.display = 'none';
        });

        suggestionsBox.addEventListener('click', (event) => {
            if (event.target.tagName === 'DIV') {
                const suggestion = event.target.textContent.trim();
                if (suggestion !== '') {
                    const cursorPosition = activeTextarea.selectionStart;
                    const textBeforeCursor = activeTextarea.value.substring(0, cursorPosition);
                    const textAfterCursor = activeTextarea.value.substring(cursorPosition);

                    // Find the start of the current word before the cursor
                    const match = textBeforeCursor.match(/(\S+)$/);
                    const wordStart = match ? textBeforeCursor.lastIndexOf(match[0]) : 0;

                    // Construct the new textarea value with the replaced suggestion
                    const newText = textBeforeCursor.substring(0, wordStart) + suggestion + textAfterCursor;

                    // Update textarea value and cursor position
                    activeTextarea.value = newText;

                    activeTextarea.parentElement.querySelector(".custom-area").innerHTML = applyColors(activeTextarea.value);

                    const newCursorPosition = wordStart + suggestion.length;
                    activeTextarea.selectionStart = activeTextarea.selectionEnd = newCursorPosition;

                    activeTextarea.focus();
                }

                suggestionsBox.style.display = 'none';
            }
        });

        function getCaretCoordinates(textarea) {
            const textareaClone = document.createElement('div');
            const style = getComputedStyle(textarea);
            Array.from(style).forEach(prop => {
                textareaClone.style[prop] = style[prop];
            });

            textareaClone.style.position = 'absolute';
            textareaClone.style.visibility = 'hidden';
            textareaClone.style.whiteSpace = 'pre';
            textareaClone.style.wordWrap = 'break-word';

            const value = textarea.value.substring(0, textarea.selectionStart);
            textareaClone.textContent = value;

            const caretSpan = document.createElement('span');
            caretSpan.textContent = value.length ? value[value.length - 1] : '.';
            textareaClone.appendChild(caretSpan);

            document.body.appendChild(textareaClone);

            const { offsetTop: top, offsetLeft: left, offsetHeight: height } = caretSpan;
            document.body.removeChild(textareaClone);

            return { top, left, height };
        }

        function showSuggestionsBox(textarea) {
            const { top, left, height } = getCaretCoordinates(textarea);
            const cursorPosition = textarea.selectionStart;
            const textBeforeCursor = textarea.value.substring(0, cursorPosition);
            const match = textBeforeCursor.match(/(\S+)$/);
            const query = match ? match[0] : '';
        
            const filteredSuggestions = suggestions.filter(item => item.startsWith(query));
        
            // Adjust for horizontal scroll
            const scrollLeft = textarea.scrollLeft;
        
            suggestionsBox.style.top = `${top + height}px`;
            suggestionsBox.style.left = `${left - scrollLeft}px`;
            suggestionsBox.style.display = 'block';
        
            suggestionsBox.innerHTML = filteredSuggestions.length
                ? filteredSuggestions.map(item => `<div class="suggestion-item">${item}</div>`).join('')
                : '<div class="no-suggestions">No suggestions</div>';
        
            activeTextarea = textarea; // Set active textarea for suggestion handling
        }        
    });

    // Hide suggestions box when clicking outside of it or the textareas
    document.addEventListener('click', (event) => {
        suggestionsBox.style.display = 'none';
    });
});
