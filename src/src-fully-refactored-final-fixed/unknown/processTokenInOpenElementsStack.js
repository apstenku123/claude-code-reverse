/**
 * Processes a token within the open elements stack according to HTML parsing rules.
 *
 * Iterates from the top of the open elements stack downwards, performing actions based on the namespace and tag name of each element:
 *   - If an element in the HTML namespace is found, processes the token and stops.
 *   - If an element with a tag name matching the token'createInteractionAccessor tag name is found, pops elements until that element is removed and stops.
 *
 * @param {Object} parserContext - The parser context containing open elements and tree adapter utilities.
 * @param {Object} token - The token to process, expected to have a tagName property.
 * @returns {void}
 */
function processTokenInOpenElementsStack(parserContext, token) {
  // Iterate from the top of the open elements stack down to the bottom
  for (
    let stackIndex = parserContext.openElements.stackTop;
    stackIndex > 0;
    stackIndex--
  ) {
    const currentElement = parserContext.openElements.items[stackIndex];
    const namespaceURI = parserContext.treeAdapter.getNamespaceURI(currentElement);
    const tagName = parserContext.treeAdapter.getTagName(currentElement).toLowerCase();

    // If the current element is in the HTML namespace, process the token and exit
    if (namespaceURI === u2.HTML) {
      parserContext._processToken(token);
      break;
    }

    // If the current element'createInteractionAccessor tag name matches the token'createInteractionAccessor tag name, pop elements until this one is removed
    if (tagName === token.tagName) {
      parserContext.openElements.popUntilElementPopped(currentElement);
      break;
    }
  }
}

module.exports = processTokenInOpenElementsStack;