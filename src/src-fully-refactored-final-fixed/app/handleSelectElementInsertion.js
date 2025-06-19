/**
 * Handles the insertion of a <select> element into the DOM tree, updating formatting elements and adjusting the parser'createInteractionAccessor insertion mode as needed.
 *
 * This function reconstructs the active formatting elements, inserts the provided select element,
 * marks the frameset as not allowed, and sets the correct insertion mode depending on the current context.
 *
 * @param {object} parserContext - The parser context object, containing state and helper methods for DOM manipulation.
 * @param {object} selectElement - The select element token or node to be inserted.
 * @returns {void}
 */
function handleSelectElementInsertion(parserContext, selectElement) {
  // Reconstruct active formatting elements before inserting the select element
  parserContext._reconstructActiveFormattingElements();

  // Insert the select element into the DOM tree, specifying the HTML namespace
  parserContext._insertElement(selectElement, u2.HTML);

  // After inserting a <select>, frameset is no longer allowed
  parserContext.framesetOk = false;

  // If the current insertion mode is within a table-related context, switch to the appropriate select-in-table mode
  if (
    parserContext.insertionMode === "IN_TABLE_MODE" ||
    parserContext.insertionMode === "IN_CAPTION_MODE" ||
    parserContext.insertionMode === "IN_TABLE_BODY_MODE" ||
    parserContext.insertionMode === "IN_ROW_MODE" ||
    parserContext.insertionMode === "IN_CELL_MODE"
  ) {
    parserContext.insertionMode = "IN_SELECT_IN_TABLE_MODE";
  } else {
    // Otherwise, use the standard select mode
    parserContext.insertionMode = "IN_SELECT_MODE";
  }
}

module.exports = handleSelectElementInsertion;