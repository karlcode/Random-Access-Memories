const styles = `
<style>
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
 margin: 0;
 padding: 0;
 border: 0;
 font-size: 100%;
 font: inherit;
 vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
 display: block;
}
body {
 line-height: 1;
}
ol, ul {
 list-style: none;
}
blockquote, q {
 quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
 content: '';
 content: none;
}
table {
 border-collapse: collapse;
 border-spacing: 0;
}
:host { 
    all: initial;
    font-family: sans-serif !important;
}
body {
    background-color: white;
    opacity: 0.8;
}
[contenteditable="true"]:empty:before {
    content: attr(placeholder);
    color: #97a0bf;
    display: block;
}

.flex-container {
    display: flex;
    flex-direction: column;
    height: 100%;
}
dialog {
    background: white;
    opacity: 0.95;
    width: 50%;
    max-width: 600px;
    height: 30%;
    padding: 0;
    position: fixed;
    border: 0;
    border-radius: 20px;
    box-shadow: 0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22);
    color: #1c1e29;
    letter-spacing: -0.25px;
    font-weight: 700;
    font-size: 1em;
    line-height: 2em;
}

.time-heading {
    text-align: center;
    margin-top: 1em;
}
.input-wrap {
    flex: 1 1 0;
    font-size: 16px;
    margin: 1.5em;
    height: 100%;
}
.entry-writing-space {
    margin: 0;
    color: #1c1e29;
    letter-spacing: -0.25px;
    font-weight: 700;
    font-size: 1.5em;
    line-height: 2em;
    overflow: auto;
    text-overflow: ellipsis;
    padding: 0;
    width: 100%;
    height: 100%;
    outline: none;
    border: none;
    background: transparent;
    line-height: normal;
    min-width: 250px;
    min-height: 100px;
    outline: none;
    white-space: pre-wrap;
    word-wrap: break-word;
    word-break: break-word;
    cursor: text;

}

.close-button {
    position: absolute;
    top: -20px;
    right: -20px;
    background: ghostwhite;
    font-size: 2em;
    border: none;
    width: 25px;
    height: 25px;
    cursor: pointer;
    border-radius: 50%;
    transition: all 0.2s;
}

.close-button:hover {
    background: tomato;
}
.submit-button {
    width: 100%;
    font-weight: 700;
    padding: 0.5em;
    font-size: 1.25em;
    border: none;
    cursor: pointer;
    transition: all 0.3s;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
    background: ghostwhite;
}

.submit-button:hover {
    background: aquamarine;
}
</style>`