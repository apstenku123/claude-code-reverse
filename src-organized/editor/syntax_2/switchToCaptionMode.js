/**
 * Switches the parser to caption mode by clearing elements back to the table context,
 * inserting a formatting marker, inserting the provided element as an HTML element,
 * and updating the insertion mode to 'IN_CAPTION_MODE'.
 *
 * @param {object} parserContext - The parser context containing open elements, formatting elements, and insertion logic.
 * @param {object} elementToken - The token representing the element to insert into the DOM tree.
 * @returns {void}
 */
function switchToCaptionMode(parserContext, elementToken) {
  // Clear the stack of open elements back to the table context
  parserContext.openElements.clearBackToTableContext();

  // Insert a marker into the list of active formatting elements
  parserContext.activeFormattingElements.insertMarker();

  // Insert the element as an HTML element
  parserContext._insertElement(elementToken, u2.HTML);

  // Set the insertion mode to caption mode
  parserContext.insertionMode = "IN_CAPTION_MODE";
}

module.exports = switchToCaptionMode;