/**
 * Checks if the global 'x' object has a 'top' property and whether its namespaceURI is not XHTML.
 *
 * @returns {boolean} Returns true if 'x.top' exists and its namespaceURI is not 'http://www.w3.org/1999/xhtml'; otherwise, false.
 */
function isTopElementNonHtmlNamespace() {
  // Ensure 'x' and 'x.top' exist, then check if the namespaceURI is not XHTML
  return x.top && x.top.namespaceURI !== "http://www.w3.org/1999/xhtml";
}

module.exports = isTopElementNonHtmlNamespace;