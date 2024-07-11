// Global array to store the elements
let elementsArray = [];

// Global array to store functions
let functionsArray = [];

// Global array to store the output
let outputArray = [];

// Function to check if an element with the given ID already exists
function elementExists(id) {
    return elementsArray.some(element => element.id === id);
}

// Function to get an element by ID
function getElementById(id) {
    return elementsArray.find(element => element.id === id);
}

function isProperty(property) {
    return ['list-style', 'lstyle', 'margin', 'padding', 'html', 'text',
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
        'outline-color', 'ocolor', 'outline-offset', 'ooffset',

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
        'src', 'href', 'max-width', 'maxwidth', 'minwidth', 'min-width',
        'max-height', 'maxheight', 'minheight', 'min-height'].includes(property);
}

function parseProps(input) {
    return input.replace(/(\w+)\s+props\s*\[([^\]]*)\]/g, (match, firstWord, properties) => {
        let propsArray = [];
        let tempProp = '';
        let bracketsCount = 0;
        let insideFunction = false;

        for (let i = 0; i < properties.length; i++) {
            if (properties[i] === '(') {
                bracketsCount++;
                insideFunction = true;
            } else if (properties[i] === ')') {
                bracketsCount--;
                if (bracketsCount === 0) {
                    insideFunction = false;
                }
            }

            if (properties[i] === ',' && bracketsCount === 0 && !insideFunction) {
                propsArray.push(tempProp.trim());
                tempProp = '';
            } else {
                tempProp += properties[i];
            }
        }

        if (tempProp.trim()) {
            propsArray.push(tempProp.trim());
        }

        return propsArray.map(prop => `${firstWord} ${prop.trim()}`).join('\n');
    });
}

// Function to parse multiple commands split by lines
function compile(preview) {
    showLoader();

    let functionsArray = [];
    let functionsInputValue = document.getElementById('functionsInput').value;
    functionsInputValue = functionsInputValue.split('\n').filter(line => !line.trim().startsWith('#')).join('\n');



    let functionBlocks = functionsInputValue.trim().split(/}\s*/);

    functionBlocks.forEach(block => {
        if (block.trim()) {
            let functionMatch = block.match(/(\w+)\s+(\w+)\(([^)]*)\)\s*{([^]*)/);
            if (functionMatch) {
                let [_, type, name, params, body] = functionMatch;
                let paramArray = params.split(',').map(param => param.trim());

                let firstParam = params.split(',').map(param => param.trim())[0];

                let bodyCommands = "";

                // body = body.replace(/(\w+)\s+props\s*\(([^)]+)\)/g, (match, firstWord, properties) => {
                //     return properties.split(',').map(prop => `${firstWord} ${prop.trim()}`).join('\n');
                // });
                body = parseProps(body);

                // Split the body into lines, trim each line, and filter out empty lines
                let bodyLines = body.split('\n')
                    .map(line => line.trim())
                    .filter(line => line);

                // Loop through each non-empty line in the body and perform some code
                bodyLines.forEach(line => {
                    let command = line.replace(/\s+/g, ' ').trim();

                    let words = command.split(' ');
                    if (words.length >= 3 && words[0] === 'add') {
                        words[2] = `%obj_placeholder${firstParam}obj_placeholder%_${words[2]}`;
                        command = words.join(' ');
                    }
                    else if (words.length >= 3 &&
                        words[0] !== 'add' && isProperty(words[1])
                        || words[1] === 'style' || words[1] === 'props' || words[1] == 'attr'
                        //&& !paramArray.includes(words[0])
                    ) {
                        if (words[0] !== firstParam) {
                            words[0] = `%obj_placeholder${firstParam}obj_placeholder%_${words[0]}`;
                            command = words.join(' ');
                        }
                    }
                    else if (words.length === 4 && words[1] === 'parent' && words[2] === 'of') {
                        words[3] = `%obj_placeholder${firstParam}obj_placeholder%_${words[3]}`;
                        command = words.join(' ');
                    }

                    bodyCommands += command + "\n";
                });

                body = bodyCommands.trim();

                let functionObject = {
                    type: type.trim(),
                    name: name.trim(),
                    parameters: paramArray,
                    body: body.trim()
                };

                functionsArray.push(functionObject);
            }
        }
    });

    elementsArray = [];
    outputArray = [];

    let styles = document.getElementById('stylesInput').value;
    styles = styles.split('\n').filter(line => !line.trim().startsWith('#')).join('\n');
    // styles = styles.replace(/(\w+)\s+props\s*\(([^)]+)\)/g, (match, firstWord, properties) => {
    //     return properties.split(',').map(prop => `${firstWord} ${prop.trim()}`).join('\n');
    // });
    styles = parseProps(styles);

    const stylesLines = styles.trim().split('\n');
    stylesLines.forEach(line => {
        if (line !== '')
            parseSingleCommand(line, null);
    });

    let commands = document.getElementById('in').value;
    commands = commands.split('\n').filter(line => !line.trim().startsWith('#')).join('\n');
    commands = parseProps(commands);
    const lines = commands.trim().split('\n');
    lines.forEach(line => {
        if (line !== '')
            parseSingleCommand(line, functionsArray);
    });

    setTimeout(() => {
        hideLoader();
        document.getElementById('output-title').innerText = `output (${outputArray.length})`;
        if (preview) {
            previewHTML(false);
        }
    }, 1000);
}

function execFunction(commands,functionsArray) {
    const lines = commands.trim().split('\n');
    lines.forEach(line => {
        if (line !== '')
            parseSingleCommand(line, functionsArray);
    });
}

function formatCssPropertyAndValue(property, value) {
    // Dictionary to handle specific property conversions
    const propertyMap = {
        'cols': 'grid-template-columns',
        'bradius': 'border-radius',
        'bg': 'background',
        'fsize': 'font-size',
        'ffamily': 'font-family',
        'fweight': 'font-weight',
        'fstyle': 'font-style',
        'talign': 'text-align',
        'tdecoration': 'text-decoration',
        'aitems': 'align-items',
        'jcontent': 'justify-content',
        'tshadow': 'text-shadow',
        'lheight': 'line-height',
        'lspacing': 'letter-spacing',
        'wspacing': 'word-spacing',
        'ttransform': 'text-transform',
        'tindent': 'text-indent',
        'wspace': 'white-space',
        'valign': 'vertical-align',
        'bcolor': 'background-color',
        'bimage': 'background-image',
        'bposition': 'background-position',
        'bsize': 'background-size',
        'brepeat': 'background-repeat',
        'battach': 'background-attachment',
        'bwidth': 'border-width',
        'bstyle': 'border-style',
        'btop': 'border-top',
        'bright': 'border-right',
        'bbottom': 'border-bottom',
        'bleft': 'border-left',
        'btwidth': 'border-top-width',
        'brwidth': 'border-right-width',
        'bbwidth': 'border-bottom-width',
        'blwidth': 'border-left-width',
        'btstyle': 'border-top-style',
        'brstyle': 'border-right-style',
        'bbstyle': 'border-bottom-style',
        'zindex': 'z-index',
        'overflow': 'overflow',
        'overflowx': 'overflow-x',
        'overflowy': 'overflow-y',
        'visibility': 'visibility',
        'opacity': 'opacity',
        'bshadow': 'box-shadow',
        'blstyle': 'border-left-style',
        'btcolor': 'border-top-color',
        'brcolor': 'border-right-color',
        'bbcolor': 'border-bottom-color',
        'outline': 'outline',
        'owidth': 'outline-width',
        'ostyle': 'outline-style',
        'ocolor': 'outline-color',
        'ooffset': 'outline-offset',

        'btlradius': 'border-top-left-radius',
        'btrradius': 'border-top-right-radius',
        'bblradius': 'border-bottom-left-radius',
        'bbrradius': 'border-bottom-right-radius',

        'bsizing': 'box-sizing',
        'fgrow': 'flex-grow',
        'fshrink': 'flex-shrink',
        'fbasis': 'flex-basis',
        'fdirection': 'flex-direction',
        'fwrap': 'flex-wrap',
        'gtcolumns': 'grid-template-columns',
        'gtrows': 'grid-template-rows',
        'gtareas': 'grid-template-areas',
        'gcgap': 'grid-column-gap',
        'grgap': 'grid-row-gap',
        'garea': 'grid-area',
        'gcolumn': 'grid-column',
        'grow': 'grid-row',
        'gautoflow': 'grid-auto-flow',
        'gacolumns': 'grid-auto-columns',
        'garows': 'grid-auto-rows',
        'pitems': 'place-items',
        'pcontent': 'place-content',
        'pself': 'place-self',
        'acontent': 'align-content',
        'aself': 'align-self',
        'jself': 'justify-self',
        'lstyle': 'list-style',
        'maxwidth': 'max-width',
        'minwidth': 'min-width',
        'maxheight': 'max-height',
        'minheight': 'min-height',
    };

    // Dictionary to handle specific value conversions
    const valueMap = {
        'sbetween': 'space-between',
        'saround': 'space-around',
        'sevenly': 'space-evenly',
        'fstart': 'flex-start',
        'fend': 'flex-end',
        'rreverse': 'row-reverse',
        'creverse': 'column-reverse',
        'wreverse': 'wrap-reverse',
        'nrepeat': 'no-repeat',
        'rx': 'repeat-x',
        'ry': 'repeat-y',
        'ttop': 'text-top',
        'tbottom': 'text-bottom'
    };

    // Convert property if it exists in the propertyMap
    if (property in propertyMap) {
        property = propertyMap[property];
    }

    // Convert value if it exists in the valueMap
    if (value in valueMap) {
        value = valueMap[value];
    }

    return { property, value };
}

// Function to parse a single command and create the HTML element or manage parent-child relationships
function parseSingleCommand(command, functionsArray) {
    if(command.trim().startsWith('#')){
        return;
    }

    command = command.replace(/\s+/g, ' ').trim();
    const parts = command.trim().split(' ');

    // List of valid parts for the second word and their corresponding HTML elements
    const validElementParts = {
        'center': 'div',
        'column': 'div',
        'row': 'div',
        'grid': 'div',
        'ul': 'ul',
        'li': 'li',
        'container': 'div',
        'button': 'button',
        'image': 'img',
        'img': 'img',
        'input': 'input',
        'textarea': 'textarea',
        'a': 'a',
        'style': 'style',
        'anchor': 'a',
        'abbr': 'abbr',
        'address': 'address',
        'area': 'area',
        'article': 'article',
        'aside': 'aside',
        'audio': 'audio',
        'b': 'b',
        'base': 'base',
        'bdi': 'bdi',
        'bdo': 'bdo',
        'blockquote': 'blockquote',
        'body': 'body',
        'br': 'br',
        'button': 'button',
        'canvas': 'canvas',
        'caption': 'caption',
        'cite': 'cite',
        'code': 'code',
        'col': 'col',
        'colgroup': 'colgroup',
        'data': 'data',
        'datalist': 'datalist',
        'dd': 'dd',
        'del': 'del',
        'details': 'details',
        'dfn': 'dfn',
        'dialog': 'dialog',
        'div': 'div',
        'dl': 'dl',
        'dt': 'dt',
        'em': 'em',
        'embed': 'embed',
        'fieldset': 'fieldset',
        'figcaption': 'figcaption',
        'figure': 'figure',
        'footer': 'footer',
        'form': 'form',
        'h1': 'h1',
        'h2': 'h2',
        'h3': 'h3',
        'h4': 'h4',
        'h5': 'h5',
        'h6': 'h6',
        'head': 'head',
        'header': 'header',
        'hr': 'hr',
        'html': 'html',
        'i': 'i',
        'iframe': 'iframe',
        'img': 'img',
        'input': 'input',
        'ins': 'ins',
        'kbd': 'kbd',
        'label': 'label',
        'legend': 'legend',
        'li': 'li',
        'main': 'main',
        'map': 'map',
        'mark': 'mark',
        'menu': 'menu',
        'menuitem': 'menuitem',
        'meta': 'meta',
        'meter': 'meter',
        'nav': 'nav',
        'noscript': 'noscript',
        'object': 'object',
        'ol': 'ol',
        'optgroup': 'optgroup',
        'option': 'option',
        'output': 'output',
        'p': 'p',
        'param': 'param',
        'picture': 'picture',
        'pre': 'pre',
        'progress': 'progress',
        'q': 'q',
        'rp': 'rp',
        'rt': 'rt',
        'rtc': 'rtc',
        'ruby': 'ruby',
        's': 's',
        'samp': 'samp',
        'script': 'script',
        'section': 'section',
        'select': 'select',
        'slot': 'slot',
        'small': 'small',
        'source': 'source',
        'span': 'span',
        'strong': 'strong',
        'style': 'style',
        'sub': 'sub',
        'summary': 'summary',
        'sup': 'sup',
        'table': 'table',
        'tbody': 'tbody',
        'td': 'td',
        'template': 'template',
        'textarea': 'textarea',
        'tfoot': 'tfoot',
        'th': 'th',
        'thead': 'thead',
        'time': 'time',
        'title': 'title',
        'tr': 'tr',
        'track': 'track',
        'u': 'u',
        'ul': 'ul',
        'var': 'var',
        'video': 'video',
        'wbr': 'wbr'
    };

    if (parts.length >= 3 && parts[0] !== 'add' && isProperty(parts[1])) {
        const id = parts[0];
        let property = parts[1];
        let sideOrValue = parts[2];
        let value = parts.slice(3).join(' ');

        if (elementExists(id)) {
            const element = getElementById(id);

            if (property === 'html') {
                element.innerHTML = parts.slice(2).join(' ');

                console.log(`Set innerHTML of element with ID '${id}' to '${parts.slice(2).join(' ')}'.`);
                outputArray.push({ 'success': true, 'message': `Set innerHTML of element with ID '${id}' to '${parts.slice(2).join(' ')}'.` });
            } else if (property === 'text') {
                if (element.tagName.toLowerCase() === 'input' || element.tagName.toLowerCase() === 'textarea') {
                    // Set value for input or textarea
                    element.value = parts.slice(2).join(' ');
                } else {
                    // Set textContent for other types of elements
                    element.textContent = parts.slice(2).join(' ');
                }

                console.log(`Set textContent of element with ID '${id}' to '${parts.slice(2).join(' ')}'.`);
                outputArray.push({ 'success': true, 'message': `Set textContent of element with ID '${id}' to '${parts.slice(2).join(' ')}'.` });
            } else if (property === 'src') {
                element.src = `${parts.slice(2).join(' ')}`;

                console.log(`Set src of element with ID '${id}' to '${parts.slice(2).join(' ')}'.`);
                outputArray.push({ 'success': true, 'message': `Set src of element with ID '${id}' to '${parts.slice(2).join(' ')}'.` });
            } else if (property === 'href') {
                element.href = parts.slice(2).join(' ');

                console.log(`Set href of element with ID '${id}' to '${parts.slice(2).join(' ')}'.`);
                outputArray.push({ 'success': true, 'message': `Set href of element with ID '${id}' to '${parts.slice(2).join(' ')}'.` });
            } else if (property === 'value' || property === 'placeholder') {
                if (element.tagName.toLowerCase() === 'input' || element.tagName.toLowerCase() === 'textarea') {
                    if (property === 'value') {
                        element.value = parts.slice(2).join(' ');

                        console.log(`Set value of input/textarea element with ID '${id}' to '${sideOrValue}'.`);
                        outputArray.push({ 'success': true, 'message': `Set value of input/textarea element with ID '${id}' to '${sideOrValue}'.` });
                    } else if (property === 'placeholder') {
                        element.placeholder = parts.slice(2).join(' ');

                        console.log(`Set placeholder of input/textarea element with ID '${id}' to '${sideOrValue}'.`);
                        outputArray.push({ 'success': true, 'message': `Set placeholder of input/textarea element with ID '${id}' to '${sideOrValue}'.` });
                    }
                } else {
                    console.log(`Element with ID '${id}' is not an input or textarea.`);
                    outputArray.push({ 'success': false, 'message': `Element with ID '${id}' is not an input or textarea.` });
                }
            }
            else if (['margin', 'padding', 'border'].includes(property)) {
                switch (sideOrValue) {
                    case 'left':
                    case 'top':
                    case 'right':
                    case 'bottom':
                        element.style[`${property}-${sideOrValue}`] = value;

                        console.log(`Set ${sideOrValue} ${property} of element with ID '${id}' to '${value}'.`);
                        outputArray.push({ 'success': true, 'message': `Set ${sideOrValue} ${property} of element with ID '${id}' to '${value}'.` });
                        break;
                    default:
                        value = parts.slice(2).join(' ');
                        element.style[property] = value;

                        console.log(`Set ${property} of element with ID '${id}' to '${value}'.`);
                        outputArray.push({ 'success': true, 'message': `Set ${property} of element with ID '${id}' to '${value}'.` });
                        break;
                }
            } else if (property === 'border-radius') {
                switch (sideOrValue) {
                    case 'topleft':
                        element.style.borderTopLeftRadius = value;

                        console.log(`Set border-top-left-radius of element with ID '${id}' to '${value}'.`);
                        outputArray.push({ 'success': true, 'message': `Set border-top-left-radius of element with ID '${id}' to '${value}'.` });
                        break;
                    case 'topright':
                        element.style.borderTopRightRadius = value;

                        console.log(`Set border-top-right-radius of element with ID '${id}' to '${value}'.`);
                        outputArray.push({ 'success': true, 'message': `Set border-top-right-radius of element with ID '${id}' to '${value}'.` });
                        break;
                    case 'bottomleft':
                        element.style.borderBottomLeftRadius = value;

                        console.log(`Set border-bottom-left-radius of element with ID '${id}' to '${value}'.`);
                        outputArray.push({ 'success': true, 'message': `Set border-bottom-left-radius of element with ID '${id}' to '${value}'.` });
                        break;
                    case 'bottomright':
                        element.style.borderBottomRightRadius = value;

                        console.log(`Set border-bottom-right-radius of element with ID '${id}' to '${value}'.`);
                        outputArray.push({ 'success': true, 'message': `Set border-bottom-right-radius of element with ID '${id}' to '${value}'.` });
                        break;
                    default:
                        value = parts.slice(2).join(' ');
                        element.style.borderRadius = value;

                        console.log(`Set border-radius of element with ID '${id}' to '${value}'.`);
                        outputArray.push({ 'success': true, 'message': `Set border-radius of element with ID '${id}' to '${value}'.` });
                        break;
                }
            }
            else if (property === 'background' || property === 'color') {
                const colorNameRegex = /\b(?:aliceblue|antiquewhite|aqua|white|aquamarine|azure|beige|bisque|black|blanchedalmond|blue|blueviolet|brown|burlywood|cadetblue|chartreuse|chocolate|coral|cornflowerblue|cornsilk|crimson|cyan|darkblue|darkcyan|darkgoldenrod|darkgray|darkgreen|darkgrey|darkkhaki|darkmagenta|darkolivegreen|darkorange|darkorchid|darkred|darksalmon|darkseagreen|darkslateblue|darkslategray|darkslategrey|darkturquoise|darkviolet|deeppink|deepskyblue|dimgray|dimgrey|dodgerblue|firebrick|floralwhite|forestgreen|fuchsia|gainsboro|ghostwhite|gold|goldenrod|gray|green|greenyellow|grey|honeydew|hotpink|indianred|indigo|ivory|khaki|lavender|lavenderblush|lawngreen|lemonchiffon|lightblue|lightcoral|lightcyan|lightgoldenrodyellow|lightgray|lightgreen|lightgrey|lightpink|lightsalmon|lightseagreen|lightskyblue|lightslategray|lightslategrey|lightsteelblue|lightyellow|lime|limegreen|linen|magenta|maroon|mediumaquamarine|mediumblue|mediumorchid|mediumpurple|mediumseagreen|mediumslateblue|mediumspringgreen|mediumturquoise|mediumvioletred|midnightblue|mintcream|mistyrose|moccasin|navajowhite|navy|oldlace|olive|olivedrab|orange|orangered|orchid|palegoldenrod|palegreen|paleturquoise|palevioletred|papayawhip|peachpuff|peru|pink|plum|powderblue|purple|rebeccapurple|red|rosybrown|royalblue|saddlebrown|salmon|sandybrown|seagreen|seashell|sienna|silver|skyblue|slateblue|slategray|slategrey|snow|springgreen|steelblue|tan|teal|thistle|tomato|turquoise|violet|wheat|whitesmoke|yellow|yellowgreen)\b/gi;
                sideOrValue = parts.slice(2).join(' ');
                if (sideOrValue.startsWith('#') || sideOrValue.startsWith('rgb') || sideOrValue.startsWith('hsl') || colorNameRegex.test(sideOrValue)) {
                    if (property === 'background') {
                        element.style.backgroundColor = sideOrValue;

                        console.log(`Set background color of element with ID '${id}' to '${sideOrValue}'.`);
                        outputArray.push({ 'success': true, 'message': `Set background color of element with ID '${id}' to '${sideOrValue}'.` });
                    } else if (property === 'color') {
                        element.style.color = sideOrValue;

                        console.log(`Set color of element with ID '${id}' to '${sideOrValue}'.`);
                        outputArray.push({ 'success': true, 'message': `Set color of element with ID '${id}' to '${sideOrValue}'.` });
                    }
                } else {
                    if (property === 'background') {
                        element.style.backgroundImage = `url(${sideOrValue})`;

                        console.log(`Set background image of element with ID '${id}' to '${sideOrValue}'.`);
                        outputArray.push({ 'success': true, 'message': `Set background image of element with ID '${id}' to '${sideOrValue}'.` });
                    } else if (property === 'color') {
                        console.log(`Invalid color value '${sideOrValue}' for element with ID '${id}'.`);
                        outputArray.push({ 'success': false, 'message': `Invalid color value '${sideOrValue}' for element with ID '${id}'.` });
                    }
                }
            } else {
                sideOrValue = parts.slice(2).join(' ');

                const formatted = formatCssPropertyAndValue(property, sideOrValue);
                property = formatted.property;
                sideOrValue = formatted.value;

                element.style[`${property}`] = sideOrValue;

                console.log(`Set ${property} of element with ID '${id}' to '${sideOrValue}'.`);
                outputArray.push({ 'success': true, 'message': `Set ${property} of element with ID '${id}' to '${sideOrValue}'.` });
            }
        } else {
            console.log(`Element with ID '${id}' does not exist.`);
            outputArray.push({ 'success': false, 'message': `Element with ID '${id}' does not exist.` });
        }
    }
    else if (parts.length === 3 && parts[0] === 'add' && validElementParts.hasOwnProperty(parts[1])) {
        const elementType = validElementParts[parts[1]];
        const id = parts[2];

        if (elementExists(id)) {
            console.log(`Element with ID '${id}' already exists.`);
            outputArray.push({ 'success': false, 'message': `Element with ID '${id}' already exists.` });
        } else {
            const newElement = document.createElement(elementType);
            newElement.id = id;
            newElement.className = parts[1];

            if (elementType === 'img') {
                newElement.alt = id;
            } else if (elementType === 'input') {
                newElement.type = 'text';
            }

            elementsArray.push(newElement);

            console.log(`Element of type '${elementType}' with ID '${id}' added.`);
            outputArray.push({ 'success': true, 'message': `Element of type '${elementType}' with ID '${id}' added.` });
        }
    } else if (parts.length === 4 && parts[1] === 'parent' && parts[2] === 'of') {
        const parentId = parts[0];
        const childId = parts[3];

        if (elementExists(parentId) && elementExists(childId)) {
            const parentElement = getElementById(parentId);
            const childElement = getElementById(childId);

            if (childElement.parentElement) {
                childElement.parentElement.removeChild(childElement);
            }

            parentElement.appendChild(childElement);

            console.log(`Element with ID '${parentId}' is now the parent of element with ID '${childId}'.`);
            outputArray.push({ 'success': true, 'message': `Element with ID '${parentId}' is now the parent of element with ID '${childId}'.` });
        } else {
            console.log(`One or both elements do not exist: '${parentId}', '${childId}'.`);
            outputArray.push({ 'success': false, 'message': `One or both elements do not exist: '${parentId}', '${childId}'.` });
        }
    } else if (parts.length === 4 && parts[1] === 'remove' && parts[2] === 'parent') {
        const childId = parts[0];

        if (elementExists(childId)) {
            const childElement = getElementById(childId);

            if (childElement.parentElement) {
                childElement.parentElement.removeChild(childElement);
                elementsArray.push(childElement);

                console.log(`Parent removed from element with ID '${childId}'.`);
                outputArray.push({ 'success': true, 'message': `Parent removed from element with ID '${childId}'.` });
            } else {
                console.log(`Element with ID '${childId}' has no parent to remove.`);
                outputArray.push({ 'success': true, 'message': `Element with ID '${childId}' has no parent to remove.` });
            }
        } else {
            console.log(`Element with ID '${childId}' does not exist.`);
            outputArray.push({ 'success': false, 'message': `Element with ID '${childId}' does not exist.` });
        }
    } else if (parts.length === 3 && parts[1] === 'style') {
        const id = parts[0];
        const stylename = parts[2];

        if (elementExists(id)) {
            const element = getElementById(id);
            element.classList.add(stylename);

            console.log(`Style '${stylename}' added to element with ID '${id}'.`);
            outputArray.push({ 'success': true, 'message': `Style '${stylename}' added to element with ID '${id}'.` });
        } else {
            console.log(`Element with ID '${id}' does not exist.`);
            outputArray.push({ 'success': false, 'message': `Element with ID '${id}' does not exist.` });
        }
    } else if (parts.length >= 2 && parts[0] === 'exec') {
        const nameRegex = /(?:exec\s+)?(\w+)\s*\(/;
        const nameMatch = command.match(nameRegex);

        const paramsRegex = /\(([^)]+)\)/;
        const paramsMatch = command.match(paramsRegex);

        if (nameMatch && paramsMatch) {
            let functionName = nameMatch[1];
            let params = paramsMatch[1].split(',').map(param => param.trim());

            if (params.length > 0) {
                let firstParam = params[0];

                //console.log("functionsArray");
                //console.log(functionsArray);

                const func = functionsArray.find(func => func.name === functionName);

                if (func) {
                    let bodyLines = func.body.replace(/%obj_placeholder(.*?)obj_placeholder%/g, firstParam);

                    //bodyLines = `add ${func.type} ${firstParam}_${func.parameters[0]}\n${bodyLines}`;
                    bodyLines = `add ${func.type} ${firstParam}\n${bodyLines}`;

                    let lines = bodyLines.split("\n"); // Splitting into lines

                    for (let i = 0; i < lines.length; i++) {
                        let words = lines[i].split(" "); // Splitting each line into words

                        if (words.length >= 3 && words[1] === "parent" && words[2] === "of") {
                            //alert(words[0] + "  " + func.parameters[0]);
                            if (words[0] === func.parameters[0] ||
                                words[0] === firstParam
                            ) {
                                //words[0] = `${firstParam}_${func.parameters[0]}`;
                                words[0] = `${firstParam}`;
                            }
                            else {
                                words[0] = `${firstParam}_${words[0]}`;
                            }
                        }
                        else if (words.length >= 3 &&
                            words[0] !== 'add' && isProperty(words[1])
                            || words[1] === 'style' || words[1] === 'props' || words[1] == 'attr'
                            //&& !paramArray.includes(words[0])
                        ) {
                            if (words[0] === func.parameters[0])
                                words[0] = `${firstParam}`;
                        }
                        else if(words[0] == 'exec'){
                            words[1] = words[1].replace(/\((.*?)\)/, (match, pr) => `(${firstParam}_${pr})`);
                        }

                        lines[i] = words.join(" "); // Joining words back into a line
                    }

                    let modifiedBodyLines = lines.join("\n");

                    execFunction(modifiedBodyLines,functionsArray);
                } else {
                    console.error(`Function ${functionName} not found.`);
                    outputArray.push({ 'success': false, 'message': `Function ${functionName} not found.` });
                }
            } else {
                console.error("No parameters found in the function call.");
                outputArray.push({ 'success': false, 'message': "No parameters found in the function call." });
            }
        } else {
            console.error("Invalid command format.");
            outputArray.push({ 'success': false, 'message': "Invalid command format." });
        }
    } else if (parts.length >= 3 && parts[1] === 'attr') {
        //i attr type email
        const id = parts[0];
        let attr = parts[2];
        let attrValue = parts[3];

        if (elementExists(id)) {
            const element = getElementById(id);
            element.setAttribute(attr, attrValue);

            console.log(`Set attribute '${attr}' of element with ID '${id}' to '${attrValue}'.`);
            outputArray.push({ 'success': true, 'message': `Set attribute '${attr}' of element with ID '${id}' to '${attrValue}'.` });
        }
        else {
            console.log(`Element with ID '${id}' does not exist.`);
            outputArray.push({ 'success': false, 'message': `Element with ID '${id}' does not exist.` });
        }
    }
    else {
        if (!command.trim().startsWith('#')) {
            console.log(`Invalid command syntax: ${command}`);
            outputArray.push({ 'success': false, 'message': `Invalid command syntax: ${command}` });
        }
    }
}

// Function to preview HTML in a new window
function previewHTML(build) {
    if (build) {
        // Compile
        compile(true);
        return;
    }

    // Create a new window
    const screenWidth = screen.width;
    const screenHeight = screen.height;
    const previewWindow = window.open('', 'Preview', `width=${screenWidth},height=${screenHeight}`);

    // Check if the new window was successfully created
    if (!previewWindow) {
        console.error('Failed to open preview window.');
        return;
    }

    // Write a basic HTML structure to the new window
    previewWindow.document.write('<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Preview</title></head><body></body></html>');

    // Collect styles from style elements
    let styleContent = `
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap');

    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: "Montserrat", sans-serif;
    }
    body,html{
        height: 100%;
    }
    .center{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    .column{
        display: flex;
        flex-direction: column;
    }
    .row{
        display: flex;
        flex-direction: row;
    }
    .grid{
        display: grid;
    }
    `;

    elementsArray.forEach(element => {
        if (element.tagName.toLowerCase() === 'style') {
            styleContent += `.${element.id} {
            ${element.style.cssText}
            }
            `;
        }
    });

    // Create a single <style> element to hold all styles
    if (styleContent) {
        const styleElement = previewWindow.document.createElement('style');
        styleElement.type = 'text/css';
        styleElement.textContent = styleContent;
        previewWindow.document.head.appendChild(styleElement);
    }

    // Append each non-style element in elementsArray to the body of the new window's document
    elementsArray.forEach(element => {
        if (element.tagName.toLowerCase() !== 'style') {
            // Check if element has parent, do not append directly to body
            if (!element.parentElement) {
                previewWindow.document.body.appendChild(element);
            }

            // Append children to the element if it contains any
            if (element.children.length > 0) {
                Array.from(element.children).forEach(child => {
                    element.appendChild(child);
                });
            }
        }
    });

    // Close the document to make sure the content is fully loaded
    previewWindow.document.close();
}

function saveToFile() {
    compile(false);

    setTimeout(() => {
        // Create a new window and hide it
        const screenWidth = screen.width;
        const screenHeight = screen.height;
        const previewWindow = window.open('', 'Preview', `width=${screenWidth},height=${screenHeight},visible=false`);
        previewWindow.document.body.style.display = 'none'; // Hide the body to keep the window hidden

        // Check if the new window was successfully created
        if (!previewWindow) {
            console.error('Failed to open preview window.');
            return;
        }

        // Write a basic HTML structure to the new window
        previewWindow.document.write('<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Preview</title></head><body></body></html>');

        // Collect styles from style elements
        let styleContent = `
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap');

        *{
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: "Montserrat", sans-serif;
        }
        body,html{
            height: 100%;
        }
        .center {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        }
        .column {
            display: flex;
            flex-direction: column;
        }
        .row {
            display: flex;
            flex-direction: row;
        }
        .grid {
            display: grid;
        }
        `;

        elementsArray.forEach(element => {
            if (element.tagName.toLowerCase() === 'style') {
                styleContent += `.${element.id} {
            ${element.style.cssText}
            }
            `;
            }
        });

        // Create a single <style> element to hold all styles
        if (styleContent) {
            const styleElement = previewWindow.document.createElement('style');
            styleElement.type = 'text/css';
            styleElement.textContent = styleContent;
            previewWindow.document.head.appendChild(styleElement);
        }

        // Append each non-style element in elementsArray to the body of the new window's document
        elementsArray.forEach(element => {
            if (element.tagName.toLowerCase() !== 'style') {
                // Check if element has parent, do not append directly to body
                if (!element.parentElement) {
                    previewWindow.document.body.appendChild(element);
                }

                // Append children to the element if it contains any
                if (element.children.length > 0) {
                    Array.from(element.children).forEach(child => {
                        element.appendChild(child);
                    });
                }
            }
        });

        // Close the document to make sure the content is fully loaded
        previewWindow.document.close();

        // Generate HTML content as a string
        const htmlContent = previewWindow.document.documentElement.outerHTML;

        // Create a Blob containing the HTML content
        const blob = new Blob([htmlContent], { type: 'text/html' });

        // Prompt user to save the file
        saveAs(blob, 'preview.html');

        // Close the preview window after saving
        previewWindow.close();
    }, 1000);
}
