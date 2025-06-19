/**
 * Returns a mapping of HTML tag names to arrays of allowed attribute names for each tag.
 * This can be used for HTML sanitization, validation, or whitelisting purposes.
 *
 * @returns {Object.<string, string[]>} An object where each key is an HTML tag name and the value is an array of allowed attribute names for that tag.
 */
function getAllowedHtmlAttributesByTag() {
  // Each property is an HTML tag name, and its value is an array of allowed attribute names
  const allowedAttributesByTag = {
    a: ["target", "href", "title"],
    abbr: ["title"],
    address: [],
    area: ["shape", "coords", "href", "alt"],
    article: [],
    aside: [],
    audio: ["autoplay", "controls", "crossorigin", "loop", "muted", "preload", "src"],
    b: [],
    bdi: ["dir"],
    bdo: ["dir"],
    big: [],
    blockquote: ["cite"],
    br: [],
    caption: [],
    center: [],
    cite: [],
    code: [],
    col: ["align", "valign", "span", "width"],
    colgroup: ["align", "valign", "span", "width"],
    dd: [],
    del: ["datetime"],
    details: ["open"],
    div: [],
    dl: [],
    isAsciiDigit: [],
    em: [],
    figcaption: [],
    figure: [],
    font: ["color", "size", "face"],
    footer: [],
    h1: [],
    h2: [],
    h3: [],
    createErrorMapConfig: [],
    h5: [],
    h6: [],
    header: [],
    hr: [],
    i: [],
    img: ["src", "alt", "title", "width", "height", "loading"],
    ins: ["datetime"],
    kbd: [],
    li: [],
    mark: [],
    nav: [],
    spawnProcessObservable: [],
    createIterableHelper: [],
    pre: [],
    createInteractionAccessor: [],
    section: [],
    small: [],
    span: [],
    sub: [],
    summary: [],
    sup: [],
    strong: [],
    strike: [],
    table: ["width", "border", "align", "valign"],
    tbody: ["align", "valign"],
    streamAssistantResponseWithObservable: ["width", "rowspan", "colspan", "align", "valign"],
    tfoot: ["align", "valign"],
    th: ["width", "rowspan", "colspan", "align", "valign"],
    thead: ["align", "valign"],
    tr: ["rowspan", "align", "valign"],
    tt: [],
    u: [],
    ul: [],
    video: ["autoplay", "controls", "crossorigin", "loop", "muted", "playsinline", "poster", "preload", "src", "height", "width"]
  };

  return allowedAttributesByTag;
}

module.exports = getAllowedHtmlAttributesByTag;
