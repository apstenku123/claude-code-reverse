/**
 * Checks if the global 'top' object exists and its namespaceURI is not XHTML.
 *
 * This function determines whether the 'top' property of the global 'window' object (or similar global context)
 * exists and, if so, whether its 'namespaceURI' property is different from the standard XHTML namespace URI.
 *
 * @returns {boolean} Returns true if 'top' exists and its namespaceURI is not 'http://www.w3.org/1999/xhtml'; otherwise, false.
 */
function isTopFrameNonXHTMLNamespace() {
  // Check if the global 'top' object exists and its namespaceURI is not XHTML
  return typeof window !== 'undefined' &&
    window.top &&
    window.top.namespaceURI !== "http://www.w3.org/1999/xhtml";
}

module.exports = isTopFrameNonXHTMLNamespace;