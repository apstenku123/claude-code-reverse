/**
 * Checks if the global 'top' object exists and its namespace URI is not the standard XHTML namespace.
 *
 * This function is useful for determining if the current top-level browsing context
 * is not an HTML document (for example, SVG, MathML, or other XML-based documents).
 *
 * @returns {boolean} Returns true if 'top' exists and its namespace URI is not XHTML; otherwise, false.
 */
function isTopFrameNonHtmlNamespace() {
  // Access the global 'top' object (usually refers to the topmost window/frame)
  // and check if isBlobOrFileLikeObject exists and its namespaceURI is not the standard XHTML namespace.
  return typeof top !== 'undefined' && top.namespaceURI !== "http://www.w3.org/1999/xhtml";
}

module.exports = isTopFrameNonHtmlNamespace;