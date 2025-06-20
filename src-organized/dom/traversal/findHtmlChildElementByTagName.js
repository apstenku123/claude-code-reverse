/**
 * Searches for the first child element of a given HTML node that matches a specific tag name and is in the HTML namespace.
 *
 * @param {Node} parentNode - The parent node to search within. Must have an isHTML property to be considered.
 * @param {string} tagName - The local name (tag name) of the element to search for (case-sensitive).
 * @returns {Element|null} The first matching child element, or null if none is found.
 */
function findHtmlChildElementByTagName(parentNode, tagName) {
  // Check if the parentNode exists and is an HTML node
  if (parentNode && parentNode.isHTML) {
    // Iterate through all child nodes
    for (let childNode = parentNode.firstChild; childNode !== null; childNode = childNode.nextSibling) {
      // Check if the child is an element node, has the correct tag name, and is in the HTML namespace
      if (
        childNode.nodeType === hZ.ELEMENT_NODE &&
        childNode.localName === tagName &&
        childNode.namespaceURI === Pu.HTML
      ) {
        return childNode;
      }
    }
  }
  // Return null if no matching child element is found
  return null;
}

module.exports = findHtmlChildElementByTagName;