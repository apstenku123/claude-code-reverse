/**
 * Sets the insertion mode of the provided interaction mapping object to 'IN_BODY_MODE' and processes the given token.
 *
 * @param {Object} interactionMapping - The mapping object that manages user interactions and route metadata.
 * @param {Object} token - The token to be processed by the interaction mapping object.
 * @returns {void}
 */
function setBodyInsertionModeAndProcessToken(interactionMapping, token) {
  // Set the insertion mode to indicate processing within the body context
  interactionMapping.insertionMode = "IN_BODY_MODE";
  // Process the provided token using the mapping object'createInteractionAccessor internal method
  interactionMapping._processToken(token);
}

module.exports = setBodyInsertionModeAndProcessToken;