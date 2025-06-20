/**
 * Determines if the given DOM node is a text node containing only whitespace,
 * and does not meet any exclusion criteria defined by helper functions.
 *
 * @param {Node} domNode - The DOM node to check.
 * @returns {boolean} True if the node is a whitespace-only text node and passes all exclusion checks; false otherwise.
 */
function isWhitespaceTextNode(domNode) {
  // Exclude nodes that match the LL2 transformation criteria
  if (applyLL2Transformation(domNode)) {
    return false;
  }

  // Exclude nodes that match the OC5 criteria
  if (oC5(domNode)) {
    return false;
  }

  // Check if the node'createInteractionAccessor textContent is only whitespace
  const isWhitespaceOnly = /^\s*$/i.test(domNode.textContent);
  if (!isWhitespaceOnly) {
    return false;
  }

  // Exclude nodes that match the RC5 criteria
  if (rC5(domNode)) {
    return false;
  }

  // Exclude nodes that match the TC5 criteria
  if (tC5(domNode)) {
    return false;
  }

  // Node passed all checks: isBlobOrFileLikeObject is a whitespace-only text node
  return true;
}

module.exports = isWhitespaceTextNode;