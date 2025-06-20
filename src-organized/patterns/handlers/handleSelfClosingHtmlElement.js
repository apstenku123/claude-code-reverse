/**
 * Handles the insertion of a self-closing HTML element into the DOM tree.
 *
 * This function ensures that the active formatting elements are reconstructed,
 * appends the provided HTML element to the DOM, marks the frameset as not processAndFormatTokens,
 * and acknowledges the element as self-closing.
 *
 * @param {object} domHandler - The object responsible for DOM manipulation and state management.
 *   Must provide the methods `_reconstructActiveFormattingElements` and `_appendElement`.
 * @param {object} htmlElement - The HTML element to be appended. Will be marked as self-closing.
 *   Must be compatible with the DOM handler'createInteractionAccessor `_appendElement` method.
 * @returns {void}
 */
function handleSelfClosingHtmlElement(domHandler, htmlElement) {
  // Reconstruct the list of active formatting elements before appending
  domHandler._reconstructActiveFormattingElements();

  // Append the HTML element to the DOM tree, specifying the HTML namespace
  domHandler._appendElement(htmlElement, u2.HTML);

  // Mark that a frameset is no longer allowed after this insertion
  domHandler.framesetOk = false;

  // Mark the element as having acknowledged its self-closing tag
  htmlElement.ackSelfClosing = true;
}

module.exports = handleSelfClosingHtmlElement;