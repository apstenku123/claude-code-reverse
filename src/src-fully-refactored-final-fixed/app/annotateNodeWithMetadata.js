/**
 * Annotates a DOM node with metadata properties such as block status, code status, blank status, and flanking whitespace.
 *
 * @param {Object} node - The DOM node to annotate. Expected to have at least nodeName and parentNode properties.
 * @param {Object} context - Additional context or configuration used by getSurroundingWhitespace to determine flanking whitespace.
 * @returns {Object} The same node object, now annotated with metadata properties.
 */
function annotateNodeWithMetadata(node, context) {
  // Determine if the node is a block element
  node.isBlock = H1A(node);

  // Determine if the node is a code element or its parent is marked as code
  node.isCode = node.nodeName === "CODE" || node.parentNode.isCode;

  // Determine if the node is blank (e.g., contains only whitespace or is empty)
  node.isBlank = WV5(node);

  // Compute flanking whitespace information using external logic
  node.flankingWhitespace = getSurroundingWhitespace(node, context);

  return node;
}

module.exports = annotateNodeWithMetadata;