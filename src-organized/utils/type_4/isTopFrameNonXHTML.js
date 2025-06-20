/**
 * Checks if the 'top' property exists on the global context object 'x' and
 * whether its namespace URI is not equal to the standard XHTML namespace.
 *
 * @returns {boolean} True if 'x.top' exists and its namespaceURI is not XHTML, otherwise false.
 */
function isTopFrameNonXHTML() {
  // Ensure 'x.top' exists and its namespaceURI is not the XHTML namespace
  return x.top && x.top.namespaceURI !== "http://www.w3.org/1999/xhtml";
}

module.exports = isTopFrameNonXHTML;