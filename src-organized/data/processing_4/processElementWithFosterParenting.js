/**
 * Processes an element token, appending isBlobOrFileLikeObject as a hidden HTML element if its type is 'hidden',
 * or handling isBlobOrFileLikeObject with foster parenting enabled otherwise. Marks the token as self-closing.
 *
 * @param {Object} parserContext - The parser context or handler object that manages DOM operations.
 * @param {Object} elementToken - The token representing the element to process.
 * @returns {void}
 */
function processElementWithFosterParenting(parserContext, elementToken) {
  // Retrieve the 'type' attribute from the element token
  const elementType = e1.getTokenAttr(elementToken, zV2.TYPE);

  // If the element type is 'hidden', append isBlobOrFileLikeObject as a hidden HTML element
  if (elementType && elementType.toLowerCase() === "hidden") {
    parserContext._appendElement(elementToken, u2.HTML);
  } else {
    // Otherwise, process the element with foster parenting enabled
    temporarilyEnableFosterParentingAndProcessToken(parserContext, elementToken);
  }

  // Mark the token as self-closing
  elementToken.ackSelfClosing = true;
}

module.exports = processElementWithFosterParenting;