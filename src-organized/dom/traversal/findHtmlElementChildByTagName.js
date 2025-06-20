/**
 * Searches for the first child element of a given HTML node that matches the specified tag name in the HTML namespace.
 *
 * @param {Node} parentNode - The parent node to search within. Must have the 'isHTML' property set to true.
 * @param {string} tagName - The local name (tag name) of the element to search for.
 * @returns {Element|null} The first matching child element, or null if none is found.
 */
function findHtmlElementChildByTagName(parentNode, tagName) {
  // Check if the parentNode exists and is an HTML node
  if (parentNode && parentNode.isHTML) {
    // Iterate through all child nodes
    for (
      let currentChild = parentNode.firstChild;
      currentChild !== null;
      currentChild = currentChild.nextSibling
    ) {
      // Check if the node is an element node, matches the tag name, and is in the HTML namespace
      if (
        currentChild.nodeType === hZ.ELEMENT_NODE &&
        currentChild.localName === tagName &&
        currentChild.namespaceURI === Pu.HTML
      ) {
        return currentChild;
      }
    }
  }
  // Return null if no matching element is found
  return null;
}

module.exports = findHtmlElementChildByTagName;