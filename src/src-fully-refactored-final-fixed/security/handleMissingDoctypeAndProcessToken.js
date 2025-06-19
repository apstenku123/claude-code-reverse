/**
 * Handles the scenario where a missing DOCTYPE is detected during document parsing.
 * Reports the error, sets the document mode to quirks, updates the parser'createInteractionAccessor insertion mode,
 * and processes the current token.
 *
 * @param {Object} parserContext - The parser context object containing state and utility methods.
 * @param {Object} currentToken - The token currently being processed.
 */
function handleMissingDoctypeAndProcessToken(parserContext, currentToken) {
  // Report a missing DOCTYPE error before processing the token
  parserContext._err(xG.missingDoctype, { beforeToken: true });

  // Set the document mode to quirks mode as per the HTML parsing specification
  parserContext.treeAdapter.setDocumentMode(
    parserContext.document,
    yj.DOCUMENT_MODE.QUIRKS
  );

  // Update the parser'createInteractionAccessor insertion mode to BEFORE_HTML_MODE
  parserContext.insertionMode = "BEFORE_HTML_MODE";

  // Continue processing the current token
  parserContext._processToken(currentToken);
}

module.exports = handleMissingDoctypeAndProcessToken;