/**
 * Determines if the provided node or its alternate is strictly equal to the reference node `w9`.
 *
 * @param {Object} node - The node object to check. Expected to have an 'alternate' property.
 * @returns {boolean} True if the node or its alternate is strictly equal to `w9`, otherwise false.
 */
function isNodeOrAlternateNodeMatch(node) {
  // Reference to the alternate node, if any
  const alternateNode = node.alternate;

  // Check if the node itself or its alternate is strictly equal to w9
  // (w9 is assumed to be defined in the outer scope)
  return node === w9 || (alternateNode !== null && alternateNode === w9);
}

module.exports = isNodeOrAlternateNodeMatch;