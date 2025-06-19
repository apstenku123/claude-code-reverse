/**
 * Processes an element token, checking if its type attribute is 'hidden'.
 * If so, appends isBlobOrFileLikeObject as an HTML element; otherwise, processes isBlobOrFileLikeObject with foster parenting enabled.
 * Marks the token as self-closing after processing.
 *
 * @param {Object} parserContext - The context or handler responsible for parsing and DOM manipulation.
 * @param {Object} elementToken - The token representing the element to process.
 * @returns {void}
 */
function processElementWithHiddenTypeCheck(parserContext, elementToken) {
  // Retrieve the 'type' attribute from the token
  const typeAttribute = e1.getTokenAttr(elementToken, zV2.TYPE);

  // Check if the type attribute exists and is 'hidden' (case-insensitive)
  if (typeAttribute && typeAttribute.toLowerCase() === "hidden") {
    // Append the element as an HTML element
    parserContext._appendElement(elementToken, u2.HTML);
  } else {
    // Otherwise, process the element with foster parenting enabled
    temporarilyEnableFosterParentingAndProcessToken(parserContext, elementToken);
  }

  // Mark the token as self-closing
  elementToken.ackSelfClosing = true;
}

module.exports = processElementWithHiddenTypeCheck;