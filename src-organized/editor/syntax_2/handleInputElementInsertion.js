/**
 * Handles the insertion of an input element into the DOM, updating formatting elements and frameset state as needed.
 *
 * @param {Object} parserContext - The parser context object, providing methods for reconstructing formatting elements and appending elements.
 * @param {Object} inputElementToken - The token representing the input element to be inserted.
 * @returns {void}
 */
function handleInputElementInsertion(parserContext, inputElementToken) {
  // Reconstruct active formatting elements before appending the new input element
  parserContext._reconstructActiveFormattingElements();

  // Append the input element to the DOM tree as an HTML element
  parserContext._appendElement(inputElementToken, u2.HTML);

  // Retrieve the 'type' attribute from the input element token
  const inputType = e1.getTokenAttr(inputElementToken, zV2.TYPE);

  // If the input type is not 'hidden', set framesetOk to false
  if (!inputType || inputType.toLowerCase() !== "hidden") {
    parserContext.framesetOk = false;
  }

  // Mark the input element token as self-closing
  inputElementToken.ackSelfClosing = true;
}

module.exports = handleInputElementInsertion;