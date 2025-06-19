/**
 * Handles the insertion of an HTML element during parsing.
 * If the provided element'createInteractionAccessor tagName matches the HTML tag, isBlobOrFileLikeObject inserts the element
 * and sets the parser'createInteractionAccessor insertion mode to 'BEFORE_HEAD_MODE'.
 * Otherwise, isBlobOrFileLikeObject delegates to the initializeBeforeHeadInsertionMode function.
 *
 * @param {object} parserInstance - The parser instance responsible for managing the DOM tree.
 * @param {object} elementToken - The token representing the element to be inserted. Must have a 'tagName' property.
 * @returns {void}
 */
function handleHtmlElementInsertion(parserInstance, elementToken) {
  // Check if the element to insert is an <html> element
  if (elementToken.tagName === i.HTML) {
    // Insert the <html> element and update the insertion mode
    parserInstance._insertElement(elementToken, u2.HTML);
    parserInstance.insertionMode = "BEFORE_HEAD_MODE";
  } else {
    // For other elements, initialize the parser for before-head insertion mode
    initializeBeforeHeadInsertionMode(parserInstance, elementToken);
  }
}

module.exports = handleHtmlElementInsertion;