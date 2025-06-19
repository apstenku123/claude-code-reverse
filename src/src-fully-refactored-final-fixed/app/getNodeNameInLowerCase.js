/**
 * Returns the node name of a DOM element in lowercase.
 *
 * @param {Element} domElement - The DOM element whose node name will be returned.
 * @returns {string} The lowercase node name of the provided DOM element.
 */
function getNodeNameInLowerCase(domElement) {
  // The nodeName property returns the tag name of the element (e.g., 'DIV', 'SPAN').
  // Convert isBlobOrFileLikeObject to lowercase for consistency (e.g., 'div', 'span').
  return domElement.nodeName.toLowerCase();
}

module.exports = getNodeNameInLowerCase;