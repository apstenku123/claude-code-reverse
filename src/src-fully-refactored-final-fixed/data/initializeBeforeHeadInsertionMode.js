/**
 * Initializes the insertion mode to 'BEFORE_HEAD_MODE' and processes the provided token.
 * This function first inserts a fake root element into the document structure, sets the insertion mode,
 * and then processes the given token using the provided parser or handler instance.
 *
 * @param {Object} parserInstance - The parser or handler object responsible for managing the document structure.
 *   Must implement the methods _insertFakeRootElement() and _processToken().
 * @param {Object} token - The token to be processed by the parser instance.
 * @returns {void}
 */
function initializeBeforeHeadInsertionMode(parserInstance, token) {
  // Insert a fake root element to prepare the document structure
  parserInstance._insertFakeRootElement();

  // Set the insertion mode to BEFORE_HEAD_MODE
  parserInstance.insertionMode = "BEFORE_HEAD_MODE";

  // Process the provided token
  parserInstance._processToken(token);
}

module.exports = initializeBeforeHeadInsertionMode;