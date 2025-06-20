/**
 * Inserts a fake element into the BODY and processes the provided token.
 *
 * This function is typically used to simulate DOM insertion for testing or parsing purposes.
 * It sets the insertion mode to 'IN_BODY_MODE' and then processes the given token.
 *
 * @param {Object} domHandler - The object responsible for DOM manipulation and token processing. Must implement _insertFakeElement and _processToken methods.
 * @param {Object} token - The token to be processed after the fake element is inserted.
 * @returns {void}
 */
function insertFakeElementAndProcessToken(domHandler, token) {
  // Insert a fake element into the BODY of the DOM
  domHandler._insertFakeElement(i.BODY);
  
  // Set the insertion mode to indicate handleMissingDoctypeError are in the body
  domHandler.insertionMode = "IN_BODY_MODE";
  
  // Process the provided token
  domHandler._processToken(token);
}

module.exports = insertFakeElementAndProcessToken;