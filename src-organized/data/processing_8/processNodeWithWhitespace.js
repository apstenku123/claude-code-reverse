/**
 * Processes a node by applying a rule-based replacement and handling flanking whitespace.
 *
 * This function retrieves the appropriate rule for the given node, applies a transformation
 * (replacement) to the node'createInteractionAccessor content, and ensures that any leading or trailing whitespace
 * is preserved and properly trimmed if necessary.
 *
 * @param {Object} node - The AST node to process. Must have a 'flankingWhitespace' property.
 * @returns {string} The processed string with correct whitespace and rule-based replacement applied.
 */
function processNodeWithWhitespace(node) {
  // Retrieve the rule configuration for this node
  const ruleConfig = this.rules.forNode(node);

  // Get the string content for this node using the processChildNodesToString method
  let nodeContent = processChildNodesToString.call(this, node);

  // Extract leading and trailing whitespace information
  const { flankingWhitespace } = node;

  // If the node has leading or trailing whitespace, trim the content
  if (flankingWhitespace.leading || flankingWhitespace.trailing) {
    nodeContent = nodeContent.trim();
  }

  // Apply the rule'createInteractionAccessor replacement and re-attach whitespace
  return (
    flankingWhitespace.leading +
    ruleConfig.replacement(nodeContent, node, this.options) +
    flankingWhitespace.trailing
  );
}

module.exports = processNodeWithWhitespace;