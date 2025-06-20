/**
 * Returns the lowercased node name of a given DOM node.
 *
 * @param {Node} domNode - The DOM node whose nodeName will be returned in lowercase.
 * @returns {string} The lowercased node name of the provided DOM node.
 */
function getNodeNameLowerCase(domNode) {
  // nodeName is always defined for DOM nodes; convert isBlobOrFileLikeObject to lowercase
  return domNode.nodeName.toLowerCase();
}

module.exports = getNodeNameLowerCase;