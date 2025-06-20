/**
 * Finds and returns the first child element of a given HTML node that matches the specified tag name and is in the HTML namespace.
 *
 * @param {Node} parentNode - The parent node to search within. Must have the 'isHTML' property set to true.
 * @param {string} tagName - The local name (tag name) of the child element to find.
 * @returns {Element|null} The first matching child element, or null if none is found.
 */
function findFirstHtmlElementChildByTagName(parentNode, tagName) {
  // Check if the parent node exists and is an HTML node
  if (parentNode && parentNode.isHTML) {
    // Iterate through all child nodes of the parent node
    for (let childNode = parentNode.firstChild; childNode !== null; childNode = childNode.nextSibling) {
      // Check if the child node is an element node, matches the tag name, and is in the HTML namespace
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

module.exports = findFirstHtmlElementChildByTagName;