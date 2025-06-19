/**
 * Handles the scenario where a missing DOCTYPE is detected during document parsing.
 * 
 * This function logs an error for the missing DOCTYPE, sets the document mode to quirks,
 * updates the parser'createInteractionAccessor insertion mode to BEFORE_HTML_MODE, and processes the current token.
 * 
 * @param {Object} parserContext - The parser context object containing the document, tree adapter, and error handling methods.
 * @param {Object} currentToken - The token currently being processed by the parser.
 * @returns {void}
 */
function handleMissingDoctypeError(parserContext, currentToken) {
  // Log an error indicating the DOCTYPE is missing before the current token
  parserContext._err(xG.missingDoctype, {
    beforeToken: true
  });

  // Set the document mode to quirks mode using the tree adapter
  parserContext.treeAdapter.setDocumentMode(
    parserContext.document,
    yj.DOCUMENT_MODE.QUIRKS
  );

  // Update the parser'createInteractionAccessor insertion mode to BEFORE_HTML_MODE
  parserContext.insertionMode = "BEFORE_HTML_MODE";

  // Continue processing the current token
  parserContext._processToken(currentToken);
}

module.exports = handleMissingDoctypeError;