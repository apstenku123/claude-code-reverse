/**
 * Checks if the global 'top' window object exists and its namespace URI is not XHTML.
 *
 * This function is useful for determining if the current top-level window is in a non-HTML namespace,
 * such as SVG or MathML, which may affect DOM operations or rendering logic.
 *
 * @returns {boolean} Returns true if the 'top' window exists and its namespace URI is not 'http://www.w3.org/1999/xhtml'; otherwise, false.
 */
function isTopWindowNonHtmlNamespace() {
  // Access the global 'top' window object
  // and check if its namespaceURI is different from the standard XHTML namespace
  return typeof window !== 'undefined' &&
    window.top &&
    window.top.namespaceURI !== 'http://www.w3.org/1999/xhtml';
}

module.exports = isTopWindowNonHtmlNamespace;