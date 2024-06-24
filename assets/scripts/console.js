// $(document).ready(function () {
//     updateScreen($("#in").val());

//     $("#in").on("input", function () {
//         updateScreen($(this).val());
//     });

//     function updateScreen(text) {
//         $("#out").html(colorize(text.replace(/\n/g, "<br>").replace(/\t/g, "&#9;")));
//         syncScroll();
//     }

//     $("#in").on('scroll', function () {
//         syncScroll();
//     });

//     function syncScroll() {
//         $("#out").scrollTop($("#in").scrollTop());
//         $("#out").scrollLeft($("#in").scrollLeft());
//     }

//     function escapeRegExp(string) {
//         return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
//     }

//     function replaceKeyword(text, keyword) {
//         // Escape keyword to handle special characters in regex
//         const escapedKeyword = escapeRegExp(keyword);

//         // Create a regex pattern with word boundaries and either space or newline
//         const regex = new RegExp(`\\b${escapedKeyword}(?=\\s|<br>|$)`, 'gi');

//         // Replace occurrences matching the regex pattern with the highlighted span
//         return text.replace(regex, `<span class="highlight-element">$&</span>`);
//     }

//     function colorize(text) {
//         // var keywords = ["ADD"];
//         // for (const keyword of keywords) {
//         //     const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
//         //     text = text.replace(regex, `<span class="highlight-keyword">$&</span>`);
//         // }

//         // var elements = [
//         //     "TITLE", "BASE", "LINK", "META", "STYLE", "HEADER", "NAV", "MAIN", "SECTION", "ARTICLE", "ASIDE", "FOOTER",
//         //     "ADDRESS", "P", "H1", "H2", "H3", "H4", "H5", "H6", "BLOCKQUOTE", "HR", "PRE", "A", "EM", "STRONG", "SMALL",
//         //     "S", "CITE", "Q", "DFN", "ABBR", "RUBY", "RB", "RT", "RTC", "RP", "DATA", "TIME", "CODE", "VAR", "SAMP",
//         //     "KBD", "SUB", "SUP", "I", "B", "U", "MARK", "BDI", "BDO", "SPAN", "BR", "WBR", "IMG", "IFRAME", "EMBED",
//         //     "OBJECT", "PARAM", "VIDEO", "AUDIO", "SOURCE", "TRACK", "MAP", "AREA", "CANVAS", "SVG", "MATH", "PICTURE",
//         //     "SOURCE", "SCRIPT", "NOSCRIPT", "TEMPLATE", "CANVAS", "INS", "DEL", "TABLE", "CAPTION", "COLGROUP", "COL",
//         //     "TBODY", "THEAD", "TFOOT", "TR", "TD", "TH", "FORM", "LABEL", "INPUT", "BUTTON", "SELECT", "DATALIST",
//         //     "OPTGROUP", "OPTION", "TEXTAREA", "OUTPUT", "PROGRESS", "METER", "FIELDSET", "LEGEND", "DETAILS", "SUMMARY",
//         //     "DIALOG", "MENU", "MENUITEM", "SLOT", "TEMPLATE"
//         // ];
//         // for (const keyword of elements) {
//         //     text = replaceKeyword(text, keyword);
//         // }

//         // var properties = ["BACKGROUND"];
//         // for (const keyword of properties) {
//         //     const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
//         //     text = text.replace(regex, `<span class="highlight-property">$&</span>`);
//         // }

//         // const rgbRegex = /rgb\(\d{1,3},\s*\d{1,3},\s*\d{1,3}\)/gi;
//         // const hexRegex = /#(?:[0-9a-fA-F]{3}){1,2}\b/g;
//         // const colorNameRegex = /\b(?:aliceblue|antiquewhite|aqua|aquamarine|azure|beige|bisque|black|blanchedalmond|blue|blueviolet|brown|burlywood|cadetblue|chartreuse|chocolate|coral|cornflowerblue|cornsilk|crimson|cyan|darkblue|darkcyan|darkgoldenrod|darkgray|darkgreen|darkgrey|darkkhaki|darkmagenta|darkolivegreen|darkorange|darkorchid|darkred|darksalmon|darkseagreen|darkslateblue|darkslategray|darkslategrey|darkturquoise|darkviolet|deeppink|deepskyblue|dimgray|dimgrey|dodgerblue|firebrick|floralwhite|forestgreen|fuchsia|gainsboro|ghostwhite|gold|goldenrod|gray|green|greenyellow|grey|honeydew|hotpink|indianred|indigo|ivory|khaki|lavender|lavenderblush|lawngreen|lemonchiffon|lightblue|lightcoral|lightcyan|lightgoldenrodyellow|lightgray|lightgreen|lightgrey|lightpink|lightsalmon|lightseagreen|lightskyblue|lightslategray|lightslategrey|lightsteelblue|lightyellow|lime|limegreen|linen|magenta|maroon|mediumaquamarine|mediumblue|mediumorchid|mediumpurple|mediumseagreen|mediumslateblue|mediumspringgreen|mediumturquoise|mediumvioletred|midnightblue|mintcream|mistyrose|moccasin|navajowhite|navy|oldlace|olive|olivedrab|orange|orangered|orchid|palegoldenrod|palegreen|paleturquoise|palevioletred|papayawhip|peachpuff|peru|pink|plum|powderblue|purple|rebeccapurple|red|rosybrown|royalblue|saddlebrown|salmon|sandybrown|seagreen|seashell|sienna|silver|skyblue|slateblue|slategray|slategrey|snow|springgreen|steelblue|tan|teal|thistle|tomato|turquoise|violet|wheat|whitesmoke|yellow|yellowgreen)\b/gi;

//         // text = text.replace(rgbRegex, function (match) {
//         //     const textColor = getContrastYIQ(match);
//         //     return `<span class="color-highlight" style="background-color:${match}; color:${textColor};">${match}</span>`;
//         // });

//         // text = text.replace(hexRegex, function (match) {
//         //     const textColor = getContrastYIQ(match);
//         //     return `<span class="color-highlight" style="background-color:${match}; color:${textColor};">${match}</span>`;
//         // });

//         // text = text.replace(colorNameRegex, function (match) {
//         //     const textColor = getContrastYIQ(match);
//         //     return `<span class="color-highlight" style="background-color:${match}; color:${textColor};">${match}</span>`;
//         // });

//         return text;
//     }

//     function getContrastYIQ(color) {
//         var r, g, b;
//         if (color.match(/^rgb/)) {
//             color = color.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
//             r = color[1];
//             g = color[2];
//             b = color[3];
//         } else if (color.match(/^#/)) {
//             color = +("0x" + color.slice(1).replace(color.length < 5 && /./g, '$&$&'));
//             r = color >> 16;
//             g = color >> 8 & 255;
//             b = color & 255;
//         } else {
//             var ctx = document.createElement('canvas').getContext('2d');
//             ctx.fillStyle = color;
//             var rgb = ctx.fillStyle.match(/\d+/g);
//             r = rgb[0];
//             g = rgb[1];
//             b = rgb[2];
//         }
//         var yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
//         return (yiq >= 128) ? '#333' : '#fff';
//     }
// });