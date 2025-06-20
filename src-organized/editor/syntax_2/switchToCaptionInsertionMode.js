/**
 * Switches the parser to caption insertion mode in an HTML parsing context.
 *
 * This function clears the open elements stack back to the table context,
 * inserts a formatting marker, inserts a new element for the caption,
 * and sets the parser'createInteractionAccessor insertion mode to 'IN_CAPTION_MODE'.
 *
 * @param {object} parserContext - The current parser context, containing stacks and insertion methods.
 * @param {object} captionElementToken - The token representing the <caption> element to insert.
 * @returns {void}
 */
function switchToCaptionInsertionMode(parserContext, captionElementToken) {
  // Clear the open elements stack back to the table context
  parserContext.openElements.clearBackToTableContext();

  // Insert a marker into the active formatting elements stack
  parserContext.activeFormattingElements.insertMarker();

  // Insert the <caption> element into the DOM
  parserContext._insertElement(captionElementToken, 'HTML');

  // Set the parser'createInteractionAccessor insertion mode to 'IN_CAPTION_MODE'
  parserContext.insertionMode = 'IN_CAPTION_MODE';
}

module.exports = switchToCaptionInsertionMode;