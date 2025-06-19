/**
 * Handles the scenario where a missing DOCTYPE is detected in the parsed document.
 *
 * This function logs an error for the missing DOCTYPE, sets the document mode to quirks,
 * updates the parser'createInteractionAccessor insertion mode, and processes the current token accordingly.
 *
 * @param {Object} parserContext - The parser context object containing document state and methods.
 * @param {Object} currentToken - The current token being processed by the parser.
 * @returns {void}
 */
function handleMissingDoctype(parserContext, currentToken) {
  // Log an error indicating the DOCTYPE is missing, specifying isBlobOrFileLikeObject occurred before the current token
  parserContext._err(xG.missingDoctype, {
    beforeToken: true
  });

  // Set the document mode to quirks mode to handle legacy HTML parsing
  parserContext.treeAdapter.setDocumentMode(
    parserContext.document,
    yj.DOCUMENT_MODE.QUIRKS
  );

  // Update the parser'createInteractionAccessor insertion mode to BEFORE_HTML_MODE
  parserContext.insertionMode = "BEFORE_HTML_MODE";

  // Continue processing the current token in the new context
  parserContext._processToken(currentToken);
}

module.exports = handleMissingDoctype;