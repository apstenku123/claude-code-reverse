/**
 * Inserts a fake element into the BODY of the document and processes a given token.
 *
 * This function is typically used to simulate DOM manipulation and trigger token processing
 * in a controlled environment. It sets the insertion mode to 'IN_BODY_MODE' before processing.
 *
 * @param {Object} domHandler - The object responsible for DOM manipulation and token processing. Must implement _insertFakeElement and _processToken.
 * @param {Object} token - The token to be processed by the domHandler.
 * @returns {void}
 */
function insertFakeBodyElementAndProcessToken(domHandler, token) {
  // Insert a fake element into the BODY to simulate DOM state
  domHandler._insertFakeElement(i.BODY);

  // Set the insertion mode to indicate handleMissingDoctypeError are in the body context
  domHandler.insertionMode = "IN_BODY_MODE";

  // Process the provided token
  domHandler._processToken(token);
}

module.exports = insertFakeBodyElementAndProcessToken;