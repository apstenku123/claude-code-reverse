/**
 * Formats a node'createInteractionAccessor content by applying a replacement rule and preserving its flanking whitespace.
 *
 * @param {Object} node - The AST node to format. Must have a 'flankingWhitespace' property.
 * @returns {string} The formatted string with leading and trailing whitespace preserved.
 */
function formatNodeWithWhitespace(node) {
  // Retrieve the rule configuration for the given node
  const ruleConfig = this.rules.forNode(node);

  // Generate the replacement content for the node
  let replacementContent = processChildNodesToString.call(this, node);

  // Extract leading and trailing whitespace information
  const { leading: leadingWhitespace, trailing: trailingWhitespace } = node.flankingWhitespace;

  // If the node has leading or trailing whitespace, trim the replacement content
  if (leadingWhitespace || trailingWhitespace) {
    replacementContent = replacementContent.trim();
  }

  // Apply the replacement rule and concatenate with preserved whitespace
  return (
    leadingWhitespace +
    ruleConfig.replacement(replacementContent, node, this.options) +
    trailingWhitespace
  );
}

module.exports = formatNodeWithWhitespace;