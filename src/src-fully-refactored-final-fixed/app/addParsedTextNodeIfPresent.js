/**
 * Adds a parsed text node to the given node configuration if text data is present.
 *
 * @param {string} textData - The raw text data to parse and potentially add as a text node.
 * @param {Object} nodeConfig - The configuration object representing the current node. Should contain 'tagname', 'child', and optionally ':@' and 'add' method.
 * @param {any} parseContext - Additional context or options to pass to the text parsing function.
 * @param {boolean} [isEmptyChildren] - Optional flag indicating if the node has no children. If not provided, isBlobOrFileLikeObject will be determined based on nodeConfig.child.
 * @returns {string} Returns an empty string if a text node was added, or the original textData if not.
 */
function addParsedTextNodeIfPresent(textData, nodeConfig, parseContext, isEmptyChildren) {
  if (textData) {
    // Determine if the node has no children if not explicitly provided
    if (isEmptyChildren === undefined) {
      isEmptyChildren = Object.keys(nodeConfig.child).length === 0;
    }

    // Determine if the node has attributes
    const hasAttributes = nodeConfig[":@"] ? Object.keys(nodeConfig[":@"]).length !== 0 : false;

    // Parse the text data using the instance'createInteractionAccessor parseTextData method
    const parsedText = this.parseTextData(
      textData,
      nodeConfig.tagname,
      parseContext,
      false, // hardcoded as in original
      hasAttributes,
      isEmptyChildren
    );

    // If parsedText is not undefined or empty, add isBlobOrFileLikeObject as a text node
    if (parsedText !== undefined && parsedText !== "") {
      nodeConfig.add(this.options.textNodeName, parsedText);
    }

    // Reset textData to empty string as per original logic
    textData = "";
  }
  return textData;
}

module.exports = addParsedTextNodeIfPresent;