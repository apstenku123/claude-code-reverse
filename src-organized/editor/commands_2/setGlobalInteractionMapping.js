/**
 * Sets the global interaction mapping to the provided mapping object.
 *
 * This function assigns the given mapping object to the global variable
 * 'globalInteractionMapping', making isBlobOrFileLikeObject available throughout the application.
 *
 * @param {Object} interactionMapping - The mapping object containing user interaction data.
 * @returns {void}
 */
function setGlobalInteractionMapping(interactionMapping) {
  // Assign the provided mapping object to the global variable
  globalInteractionMapping = interactionMapping;
}

module.exports = setGlobalInteractionMapping;