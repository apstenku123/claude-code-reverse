/**
 * Processes the open elements stack in a parser context to handle a given token according to HTML parsing rules.
 *
 * Iterates from the top of the open elements stack downwards. If isBlobOrFileLikeObject finds an element in the HTML namespace, isBlobOrFileLikeObject processes the token and stops. If isBlobOrFileLikeObject finds an element whose tag name matches the token'createInteractionAccessor tag name, isBlobOrFileLikeObject pops elements off the stack up to and including that element, then stops.
 *
 * @param {object} parserContext - The parser context containing the open elements stack and tree adapter utilities.
 * @param {object} token - The token to process, expected to have a 'tagName' property.
 * @returns {void}
 */
function processOpenElementsStackForToken(parserContext, token) {
  // Iterate from the top of the open elements stack downwards
  for (
    let stackIndex = parserContext.openElements.stackTop;
    stackIndex > 0;
    stackIndex--
  ) {
    const currentElement = parserContext.openElements.items[stackIndex];
    const namespaceURI = parserContext.treeAdapter.getNamespaceURI(currentElement);
    const tagName = parserContext.treeAdapter.getTagName(currentElement).toLowerCase();

    // If the element is in the HTML namespace, process the token and exit
    if (namespaceURI === u2.HTML) {
      parserContext._processToken(token);
      break;
    }

    // If the element'createInteractionAccessor tag name matches the token'createInteractionAccessor tag name, pop elements up to and including this one, then exit
    if (tagName === token.tagName) {
      parserContext.openElements.popUntilElementPopped(currentElement);
      break;
    }
  }
}

module.exports = processOpenElementsStackForToken;