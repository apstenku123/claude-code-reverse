/**
 * Checks whether a given DOM node has no child nodes.
 *
 * @param {Node} domNode - The DOM node to check for child nodes.
 * @returns {boolean} Returns true if the node has no child nodes, false otherwise.
 */
function hasNoChildNodes(domNode) {
  // If childNodes is undefined or the length is zero, the node has no children
  if (!domNode.childNodes || domNode.childNodes.length === 0) {
    return true;
  } else {
    return false;
  }
}

module.exports = hasNoChildNodes;