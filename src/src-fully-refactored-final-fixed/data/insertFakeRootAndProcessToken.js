/**
 * Inserts a fake root element into the document and processes a given token.
 *
 * This function is typically used during the parsing process to ensure that the document
 * has a root element before proceeding with token processing. It sets the insertion mode
 * to 'BEFORE_HEAD_MODE' to prepare for further parsing steps.
 *
 * @param {Object} parserContext - The parser context object that manages the parsing state and methods.
 *   Must provide `_insertFakeRootElement()` and `_processToken(token)` methods.
 * @param {Object} token - The token to be processed by the parser context.
 * @returns {void}
 */
function insertFakeRootAndProcessToken(parserContext, token) {
  // Ensure the document has a fake root element before parsing further
  parserContext._insertFakeRootElement();

  // Set the insertion mode to 'BEFORE_HEAD_MODE' as per parsing requirements
  parserContext.insertionMode = "BEFORE_HEAD_MODE";

  // Process the provided token in the current parser context
  parserContext._processToken(token);
}

module.exports = insertFakeRootAndProcessToken;
