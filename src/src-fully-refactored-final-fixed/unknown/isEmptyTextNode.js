/**
 * Checks if a given DOM node is considered an empty text node.
 *
 * The function returns true if all of the following are true:
 *   - The node does NOT satisfy applyLL2Operator (iL2)
 *   - The node does NOT satisfy oC5
 *   - The node'createInteractionAccessor textContent contains only whitespace (or is empty)
 *   - The node does NOT satisfy rC5
 *   - The node does NOT satisfy tC5
 *
 * @param {Node} domNode - The DOM node to check.
 * @returns {boolean} True if the node is an empty text node according to the above criteria, false otherwise.
 */
function isEmptyTextNode(domNode) {
  // Check if the node fails all exclusion checks and its textContent is only whitespace
  const failsLL2Operator = !iL2(domNode);
  const failsOC5 = !oC5(domNode);
  const isWhitespaceOnly = /^\s*$/i.test(domNode.textContent);
  const failsRC5 = !rC5(domNode);
  const failsTC5 = !tC5(domNode);

  return (
    failsLL2Operator &&
    failsOC5 &&
    isWhitespaceOnly &&
    failsRC5 &&
    failsTC5
  );
}

module.exports = isEmptyTextNode;