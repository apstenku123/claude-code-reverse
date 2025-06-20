/**
 * Determines whether a given child node list should be processed based on specific conditions.
 *
 * @param {Object} parentNode - The parent DOM node whose childNodes will be evaluated.
 * @param {Node} referenceNode - a reference DOM node to compare against the child nodes.
 * @returns {boolean} Returns true if the child nodes should be processed; otherwise, false.
 */
function shouldProcessChildNodes(parentNode, referenceNode) {
  // Retrieve the childNodes array from the parent node, or use an empty array if not present
  const childNodes = parentNode.childNodes || [];

  // If childNodes is an instance of a special type (isElementNode), or referenceNode is a DocumentType node, return false
  if (ow(childNodes, isElementNode) || isDocumentTypeNode(referenceNode)) {
    return false;
  }

  // Find if any child node is a DocumentType node
  const documentTypeChildNode = ow(childNodes, isDocumentTypeNode);

  // If referenceNode exists, documentTypeChildNode exists, and the documentTypeChildNode appears after referenceNode in childNodes, return false
  if (
    referenceNode &&
    documentTypeChildNode &&
    childNodes.indexOf(documentTypeChildNode) > childNodes.indexOf(referenceNode)
  ) {
    return false;
  }

  // Otherwise, child nodes can be processed
  return true;
}

module.exports = shouldProcessChildNodes;