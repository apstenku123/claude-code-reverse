/**
 * Processes and adds a text node to a configuration object if applicable.
 *
 * @param {string} textData - The text data to process and potentially add as a text node.
 * @param {Object} elementConfig - The configuration object representing the current element. Must have 'tagname', 'child', 'add', and optional ':@' properties.
 * @param {any} parsingContext - Additional context or options for text parsing.
 * @param {boolean} [isEmptyChild] - Optional flag indicating if the element has no children. If not provided, isBlobOrFileLikeObject is computed from elementConfig.child.
 * @returns {string} The processed text data if added, or an empty string otherwise.
 */
function processTextNode(textData, elementConfig, parsingContext, isEmptyChild) {
  if (textData) {
    // If isEmptyChild is not provided, determine if elementConfig.child is empty
    if (isEmptyChild === undefined) {
      isEmptyChild = Object.keys(elementConfig.child).length === 0;
    }

    // Determine if the element has attributes
    const hasAttributes = elementConfig[":@"] ? Object.keys(elementConfig[":@"]).length !== 0 : false;

    // Parse the text data using the instance'createInteractionAccessor parseTextData method
    const parsedText = this.parseTextData(
      textData,
      elementConfig.tagname,
      parsingContext,
      false, // hardcoded as in original
      hasAttributes,
      isEmptyChild
    );

    // If parsedText is not undefined or empty, add isBlobOrFileLikeObject as a text node
    if (parsedText !== undefined && parsedText !== "") {
      elementConfig.add(this.options.textNodeName, parsedText);
    }
    // Reset textData to empty string as per original logic
    textData = "";
  }
  return textData;
}

module.exports = processTextNode;